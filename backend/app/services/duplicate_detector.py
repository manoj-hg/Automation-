from typing import List, Dict, Any, Optional
import difflib
from app.core.database import supabase_db

class DuplicateDetector:
    def __init__(self, similarity_threshold: float = 0.75):
        self.threshold = similarity_threshold

    def is_similar(self, text1: str, text2: str) -> bool:
        if not text1 or not text2:
            return False
        # Normalize
        t1 = text1.lower().strip()
        t2 = text2.lower().strip()
        ratio = difflib.SequenceMatcher(None, t1, t2).ratio()
        return ratio > self.threshold

    def check_duplicate(self, article: Dict[str, Any], recent_articles: List[Dict[str, Any]]) -> Optional[str]:
        """
        Checks if the article is a duplicate of any in recent_articles.
        Returns the story_group_id if it is a duplicate, else None.
        """
        for existing in recent_articles:
            if self.is_similar(article.get('title', ''), existing.get('title', '')):
                return existing.get('story_group_id')
                
            # If URLs match exactly (different sources shouldn't have same URL but just in case)
            if article.get('url') == existing.get('url'):
                return existing.get('story_group_id')
                
        return None

duplicate_detector = DuplicateDetector()
