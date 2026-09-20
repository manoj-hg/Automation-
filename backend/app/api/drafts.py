from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.core.database import supabase_db
from app.core.config import settings

router = APIRouter(prefix="/drafts", tags=["Drafts"])

@router.get("/")
async def get_drafts():
    if settings.demo_mode or not supabase_db:
        return {"status": "ok", "data": [{"id": 1, "headline": "Mock Draft", "status": "PENDING_APPROVAL"}]}
    
    response = supabase_db.table("draft_posts").select("*").eq("status", "PENDING_APPROVAL").execute()
    return {"status": "ok", "data": response.data}

from app.services.publisher import publisher_service

@router.post("/{draft_id}/approve")
async def approve_draft(draft_id: str):
    if settings.demo_mode or not supabase_db:
        # In demo mode, simulate success
        publisher_service.publish({"headline": "Mock Draft", "content": "This is a mock draft content."})
        return {"status": "ok", "message": f"Draft {draft_id} approved and mock published."}
        
    # Real mode: Fetch the draft
    response = supabase_db.table("draft_posts").select("*").eq("id", draft_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Draft not found")
        
    draft = response.data[0]
    
    # Mark as approved
    supabase_db.table("draft_posts").update({"status": "APPROVED"}).eq("id", draft_id).execute()
    
    # Trigger Publisher
    success = publisher_service.publish(draft)
    
    if success:
        supabase_db.table("draft_posts").update({"status": "PUBLISHED"}).eq("id", draft_id).execute()
        return {"status": "ok", "message": "Draft approved and successfully published!"}
    else:
        return {"status": "warning", "message": "Draft approved but failed to publish."}

@router.post("/{draft_id}/reject")
async def reject_draft(draft_id: str):
    if settings.demo_mode or not supabase_db:
        return {"status": "ok", "message": f"Draft {draft_id} rejected."}
        
    supabase_db.table("draft_posts").update({"status": "REJECTED"}).eq("id", draft_id).execute()
    return {"status": "ok", "message": "Draft rejected"}
