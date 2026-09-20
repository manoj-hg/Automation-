from fastapi import APIRouter
from typing import List, Dict, Any
from app.core.database import supabase_db
from app.core.config import settings

router = APIRouter(prefix="/schedule", tags=["Schedule"])

@router.get("/")
async def get_schedule():
    if settings.demo_mode or not supabase_db:
        return {"status": "ok", "data": [{"id": 1, "headline": "Mock Scheduled Post", "scheduled_time": "2026-10-01T10:00:00Z"}]}
    
    response = supabase_db.table("draft_posts").select("*").in_("status", ["APPROVED", "SCHEDULED"]).execute()
    return {"status": "ok", "data": response.data}
