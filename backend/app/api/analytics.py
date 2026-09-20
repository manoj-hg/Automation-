from fastapi import APIRouter
from app.core.database import supabase_db
from app.core.config import settings

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/")
async def get_analytics():
    if settings.demo_mode or not supabase_db:
        return {
            "status": "ok", 
            "data": {
                "articles_discovered": 124,
                "articles_processed": 98,
                "drafts_created": 15,
                "approval_rate": "85%",
                "published_posts": 24,
                "average_confidence": "94%"
            }
        }
    
    # Normally we would run a series of count queries or a stored RPC
    return {"status": "ok", "data": {}}
