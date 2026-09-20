# TechDose AI

**TechDose AI** is an autonomous AI-powered technology news discovery, verification, content generation, approval, scheduling, publishing, and analytics platform.

It is designed to automate a technology-news channel while keeping a human approval step before anything is published.

## Architecture

The system consists of a **React/Vite Frontend** and a **FastAPI Backend**, utilizing **Supabase** for database storage and authentication, and **AI Models** (Gemini/OpenAI) for autonomous agent tasks.

### Core Workflow
1. **News Collector**: Fetches RSS feeds and APIs.
2. **Scout Agent**: Scores importance and relevance.
3. **Duplicate Detection**: Groups similar stories.
4. **Research Agent**: Extracts facts and context.
5. **Fact Check Agent**: Verifies claims.
6. **Writer Agent**: Drafts the final post.
7. **Image Prompt Agent**: Generates editorial image prompts.
8. **Human Approval**: Dashboard UI to review, edit, approve/reject.
9. **Scheduler & Publisher**: Handles publishing to external platforms (e.g., WhatsApp, LinkedIn).

## Folder Structure

```
TechDose-AI/
├── frontend/             # React, Vite, Tailwind CSS v4 application
│   ├── src/
│   │   ├── components/   # Shared UI components
│   │   ├── pages/        # Dashboard, NewsFeed, ApprovalQueue, Agents
│   │   └── lib/          # Utilities
│   └── package.json
├── backend/              # FastAPI Python application
│   ├── app/
│   │   ├── api/          # REST endpoints
│   │   ├── core/         # Config, Database, LLM integrations
│   │   ├── services/     # Autonomous Agents, News Collector, Publisher
│   │   └── models/       # Pydantic schemas
│   ├── supabase_schema.sql # Database schema definitions
│   └── requirements.txt
└── .env.example          # Environment variables template
```

## Local Setup

### 1. Environment Variables
Copy `.env.example` to `.env` in the project root and fill in your Supabase and AI provider credentials. To run without API keys, keep `DEMO_MODE=true` in `.env`.

### 2. Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Activate venv:
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```
API runs on `http://localhost:8000`. Health check: `http://localhost:8000/api/health`.

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
Dashboard runs on `http://localhost:5173`.

### 4. Database Setup (Supabase)
Run the SQL commands provided in `backend/supabase_schema.sql` inside your Supabase project's SQL Editor to set up the tables and indexes.

## n8n Integration
TechDose AI provides webhook endpoints (`/api/webhooks/n8n`) that can be integrated directly with n8n workflows for cron-based news fetching or external platform publishing.

## AI Setup
The `LLMService` in `backend/app/core/llm.py` supports multiple AI providers. Currently implemented:
- **Gemini**: Requires `GEMINI_API_KEY`, uses `gemini-2.5-flash` with structured JSON schema outputs.
- **OpenAI**: Requires `OPENAI_API_KEY`, uses `gpt-4o-mini` with structured JSON schema outputs.

You can switch by changing `AI_PROVIDER` in your `.env`.

## Demo Mode
If `DEMO_MODE=true` in `.env`, the application will use mock data for endpoints and AI agents to ensure you can explore the dashboard UI without requiring API keys or a Supabase instance.
