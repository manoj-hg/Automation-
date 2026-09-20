from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title="TechDose AI Backend API",
    description="Backend for the TechDose AI news automation platform.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api import news, drafts, schedule, analytics, webhooks

api_router = APIRouter(prefix="/api")

@api_router.get("/health")
async def health_check():
    return {
        "status": "ok",
        "app": settings.app_name,
        "demo_mode": settings.demo_mode,
        "environment": settings.environment
    }

api_router.include_router(news.router)
api_router.include_router(drafts.router)
api_router.include_router(schedule.router)
api_router.include_router(analytics.router)
api_router.include_router(webhooks.router)
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
