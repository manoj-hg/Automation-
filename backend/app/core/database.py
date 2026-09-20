import os
from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client | None:
    # In demo mode, we might not have real keys yet.
    # The application should gracefully handle a None client or mock it.
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_SERVICE_KEY") or os.environ.get("SUPABASE_KEY")

    if not supabase_url or not supabase_key or supabase_url == "your_supabase_project_url":
        if not settings.demo_mode:
            print("WARNING: Supabase credentials not found. Set SUPABASE_URL and SUPABASE_KEY.")
        return None

    try:
        return create_client(supabase_url, supabase_key)
    except Exception as e:
        print(f"Failed to initialize Supabase client: {e}")
        return None

supabase_db = get_supabase_client()
