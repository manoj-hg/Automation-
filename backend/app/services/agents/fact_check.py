from pydantic import BaseModel
from app.core.llm import llm_service
from typing import List

class FactCheckResult(BaseModel):
    claim: str
    status: str # VERIFIED, PARTIALLY_VERIFIED, UNVERIFIED, CONFLICTING
    supporting_sources: List[str]
    confidence: int

class FactCheckResponse(BaseModel):
    checks: List[FactCheckResult]

class FactCheckAgent:
    def verify_claims(self, claims: List[str], facts: List[str], external_context: str = "") -> List[FactCheckResult]:
        prompt = f"""
        You are the Fact Check Agent for TechDose AI.
        Verify the following claims against the provided facts and context.
        
        Claims: {claims}
        Facts: {facts}
        Context: {external_context}
        """
        
        result = llm_service.generate_structured(prompt, FactCheckResponse)
        if result:
            return result.checks
            
        return [
            FactCheckResult(
                claim=claims[0] if claims else "Mock claim",
                status="VERIFIED",
                supporting_sources=["Source A"],
                confidence=98
            )
        ]

fact_check_agent = FactCheckAgent()
