from pydantic import BaseModel
from app.core.llm import llm_service

class ImagePromptResult(BaseModel):
    prompt: str

class ImagePromptAgent:
    def generate_prompt(self, summary: str, headline: str) -> str:
        prompt = f"""
        You are an Image Prompt Agent.
        Create a professional editorial image prompt for this tech story:
        Headline: {headline}
        Summary: {summary}
        
        Style: futuristic editorial technology illustration, cinematic lighting, professional technology journalism aesthetic, no text.
        """
        
        result = llm_service.generate_structured(prompt, ImagePromptResult)
        if result:
            return result.prompt
            
        return "Futuristic editorial technology illustration representing the story, cinematic lighting, no text."

image_agent = ImagePromptAgent()
