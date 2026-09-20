from pydantic import BaseModel
from app.core.llm import llm_service
from typing import List

class WriterResult(BaseModel):
    headline: str
    content: str

class WriterAgent:
    def create_draft(self, facts: List[str], summary: str, url: str) -> WriterResult:
        prompt = f"""
        You are the TechDose Writer Agent.
        Create a concise WhatsApp/news-channel post based on the following verified research.
        
        Summary: {summary}
        Facts: {facts}
        Source URL: {url}
        
        Format:
        🚨 TECH UPDATE

        [HEADLINE]

        [2-4 sentence explanation]

        💡 Why it matters:
        [short explanation]

        🔗 Source:
        [URL]

        #TechDose #Technology #AI
        
        Avoid clickbait and emojis beyond the template. Keep it concise and preserve technical details.
        """
        
        result = llm_service.generate_structured(prompt, WriterResult)
        if result:
            return result
            
        mock_content = f"🚨 TECH UPDATE\n\nMock Headline\n\nThis is a mock 2-sentence explanation of the tech news based on {summary}.\n\n💡 Why it matters:\nIt changes everything.\n\n🔗 Source:\n{url}\n\n#TechDose #Technology"
        return WriterResult(headline="Mock Headline", content=mock_content)

writer_agent = WriterAgent()
