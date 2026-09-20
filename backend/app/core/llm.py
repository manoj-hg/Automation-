from pydantic import BaseModel
from typing import Type, TypeVar, Any
from app.core.config import settings
import os

T = TypeVar('T', bound=BaseModel)

class LLMService:
    def __init__(self):
        self.provider = os.environ.get("AI_PROVIDER", "gemini").lower()
        self.gemini_key = os.environ.get("GEMINI_API_KEY")
        self.openai_key = os.environ.get("OPENAI_API_KEY")
        
        if self.provider == "gemini" and self.gemini_key:
            from google import genai
            self.gemini_client = genai.Client(api_key=self.gemini_key)
        elif self.provider == "openai" and self.openai_key:
            from openai import OpenAI
            self.openai_client = OpenAI(api_key=self.openai_key)

    def generate_structured(self, prompt: str, schema: Type[T]) -> T | None:
        if settings.demo_mode:
            print(f"[Demo] Mocking AI structured response for: {schema.__name__}")
            return None # Should be handled by the caller in demo mode

        try:
            if self.provider == "gemini" and self.gemini_key:
                response = self.gemini_client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=prompt,
                    config={
                        'response_mime_type': 'application/json',
                        'response_schema': schema,
                        'temperature': 0.1
                    },
                )
                if response.text:
                    return schema.model_validate_json(response.text)
            elif self.provider == "openai" and self.openai_key:
                completion = self.openai_client.beta.chat.completions.parse(
                    model="gpt-4o-mini",
                    messages=[{"role": "user", "content": prompt}],
                    response_format=schema,
                    temperature=0.1
                )
                return completion.choices[0].message.parsed
        except Exception as e:
            print(f"LLM Error ({self.provider}): {e}")
        
        return None

llm_service = LLMService()
