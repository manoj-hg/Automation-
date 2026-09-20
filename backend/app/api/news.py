from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
from app.services.news_collector import NewsCollectorService, RSSNewsSource
from app.core.database import supabase_db
from app.core.config import settings

router = APIRouter(prefix="/news", tags=["News"])

collector = NewsCollectorService()
# Default Sources
collector.register_source(RSSNewsSource("https://techcrunch.com/feed/", "TechCrunch", "Startups & Funding"))
collector.register_source(RSSNewsSource("https://www.theverge.com/rss/index.xml", "The Verge", "Technology"))
collector.register_source(RSSNewsSource("https://feeds.arstechnica.com/arstechnica/index", "Ars Technica", "Hardware & IT"))

class NewsArticleSchema(BaseModel):
    title: str
    url: str
    source: str
    author: Optional[str]
    category: Optional[str]
    content: str
    
@router.get("/")
async def get_news():
    if settings.demo_mode or not supabase_db:
        return {"status": "ok", "message": "Demo mode active. Returning mock news.", "data": []}
    
    try:
        response = supabase_db.table("news_articles").select("*").order("published_at", desc=True).limit(50).execute()
        return {"status": "ok", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/collect")
async def collect_news(background_tasks: BackgroundTasks):
    def fetch_and_store():
        articles = collector.collect_all()
        if settings.demo_mode or not supabase_db:
            print(f"[Demo] Collected {len(articles)} articles. Not storing to Supabase.")
            return
        
        # In a real scenario, we store to DB handling duplicates
        for art in articles:
            try:
                # Basic normalization
                data = {
                    "title": art["title"],
                    "url": art["url"],
                    "content": art["content"],
                    "category": art["category"],
                    "published_at": art["published_at"].isoformat()
                }
                # Check for existing URL
                existing = supabase_db.table("news_articles").select("id").eq("url", art["url"]).execute()
                if not existing.data:
                    supabase_db.table("news_articles").insert(data).execute()
            except Exception as e:
                print(f"Error storing article {art['url']}: {e}")

    background_tasks.add_task(fetch_and_store)
    return {"status": "ok", "message": "News collection started in the background."}

from app.services.agents.writer import writer_agent

@router.post("/{article_id}/generate-draft")
async def generate_draft(article_id: str):
    # Fetch article
    response = supabase_db.table("news_articles").select("*").eq("id", article_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Article not found")
        
    article = response.data[0]
    
    # Run Writer Agent
    draft_result = writer_agent.create_draft(
        facts=[article.get("title")], 
        summary=article.get("content")[:500], 
        url=article.get("url")
    )
    
    # Save to Drafts
    draft_data = {
        "headline": draft_result.headline,
        "content": draft_result.content,
        "status": "PENDING_APPROVAL",
        "story_group_id": article.get("story_group_id")
    }
    
    supabase_db.table("draft_posts").insert(draft_data).execute()
    
    return {"status": "ok", "message": "Draft generated successfully!"}

