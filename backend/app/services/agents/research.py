from pydantic import BaseModel, Field
from app.core.llm import llm_service
from typing import List, Dict, Any

class ResearchResult(BaseModel):
    summary: str
    key_facts: List[str]
    claims: List[str]
    sources: List[str]
    conflicts: List[str]
    confidence: int

class ResearchAgent:
    def analyze(self, article_content: str, related_sources_content: str = "") -> ResearchResult:
        prompt = f"""
        You are the Research Agent for TechDose AI.
        Analyze the following article content and related sources.
        Extract important facts, claims that need verification, and any conflicting information.
        
        Article: {article_content}
        Related info: {related_sources_content}
        """
        
        result = llm_service.generate_structured(prompt, ResearchResult)
        if result:
            return result
            
        return ResearchResult(
            summary="Mocked research summary showing the key points of the event.",
            key_facts=["Fact 1: X happened", "Fact 2: Y is the result"],
            claims=["Company X claims a 50% performance increase"],
            sources=["Source A", "Source B"],
            conflicts=["Source B reported 40% instead of 50%"],
            confidence=95
        )

research_agent = ResearchAgent()
