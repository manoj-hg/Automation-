from pydantic import BaseModel
from app.core.llm import llm_service
from typing import Dict, Any

class ScoutResult(BaseModel):
    importance: int
    relevance: int
    novelty: int
    category: str
    recommended: bool
    reason: str

class ScoutAgent:
    def evaluate_article(self, article: Dict[str, Any]) -> ScoutResult:
        prompt = f"""
        You are the Scout Agent for TechDose AI, a premium technology news channel.
        Evaluate the following news article for our audience (software engineers, AI researchers, tech enthusiasts).
        
        Title: {article.get('title')}
        Source: {article.get('source')}
        Content Summary: {article.get('content')}
        
        Provide scores from 0-100 for importance, relevance, and novelty.
        Determine the best category (e.g., Artificial Intelligence, Software, Cybersecurity, Hardware, etc.).
        Recommend whether we should cover this (true/false) and provide a short reason.
        """
        
        result = llm_service.generate_structured(prompt, ScoutResult)
        
        if result:
            return result
        
        # Fallback / Demo mode mock
        return ScoutResult(
            importance=85,
            relevance=90,
            novelty=80,
            category="Technology",
            recommended=True,
            reason="Mocked reason for Demo Mode. High relevance to audience."
        )

scout_agent = ScoutAgent()
