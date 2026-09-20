from fastapi import APIRouter, Request, BackgroundTasks
from app.core.config import settings

router = APIRouter(prefix="/webhooks", tags=["Webhooks"])

@router.post("/n8n")
async def n8n_webhook(request: Request, background_tasks: BackgroundTasks):
    """
    Webhook endpoint designed for n8n to trigger workflows like data collection, 
    publishing, etc., or receive updates from n8n nodes.
    """
    payload = await request.json()
    action = payload.get("action")
    
    if action == "publish_post":
        post_id = payload.get("post_id")
        # Logic to trigger publisher manually if needed
        return {"status": "ok", "message": f"Triggered publishing for post {post_id}"}
    
    return {"status": "ok", "message": "Webhook received but no known action specified."}
