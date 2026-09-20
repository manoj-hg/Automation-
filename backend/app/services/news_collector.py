from abc import ABC, abstractmethod
from typing import List, Dict, Any
import feedparser
from datetime import datetime

class NewsSource(ABC):
    @abstractmethod
    def fetch_news(self) -> List[Dict[str, Any]]:
        pass

class RSSNewsSource(NewsSource):
    def __init__(self, url: str, source_name: str, category: str):
        self.url = url
        self.source_name = source_name
        self.category = category

    def fetch_news(self) -> List[Dict[str, Any]]:
        articles = []
        try:
            feed = feedparser.parse(self.url)
            for entry in feed.entries[:10]: # Fetch latest 10
                # Handle dates safely
                published_at = datetime.now()
                if hasattr(entry, 'published_parsed') and entry.published_parsed:
                    from time import mktime
                    published_at = datetime.fromtimestamp(mktime(entry.published_parsed))

                content = ""
                if hasattr(entry, 'content'):
                    content = entry.content[0].value
                elif hasattr(entry, 'summary'):
                    content = entry.summary

                articles.append({
                    "title": entry.get("title", ""),
                    "url": entry.get("link", ""),
                    "source": self.source_name,
                    "author": entry.get("author", ""),
                    "published_at": published_at,
                    "category": self.category,
                    "content": content,
                    "image_url": "" # Might need scraping for this
                })
        except Exception as e:
            print(f"Error fetching from {self.url}: {e}")
            
        return articles

class NewsCollectorService:
    def __init__(self):
        self.sources: List[NewsSource] = []

    def register_source(self, source: NewsSource):
        self.sources.append(source)

    def collect_all(self) -> List[Dict[str, Any]]:
        all_articles = []
        for source in self.sources:
            articles = source.fetch_news()
            all_articles.extend(articles)
        return all_articles
