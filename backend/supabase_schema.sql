-- TechDose AI Supabase Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- news_sources
CREATE TABLE public.news_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL, -- e.g., 'RSS', 'API'
    category TEXT,
    is_active BOOLEAN DEFAULT true,
    last_fetched TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- story_groups (for duplicate detection)
CREATE TABLE public.story_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- news_articles
CREATE TABLE public.news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID REFERENCES public.news_sources(id),
    story_group_id UUID REFERENCES public.story_groups(id) NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    author TEXT,
    content TEXT,
    image_url TEXT,
    category TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    ai_importance_score INTEGER,
    ai_relevance_score INTEGER,
    status TEXT DEFAULT 'PENDING', -- PENDING, PROCESSED, IGNORED
    is_duplicate BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- research_reports
CREATE TABLE public.research_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_group_id UUID REFERENCES public.story_groups(id) UNIQUE,
    summary TEXT,
    key_facts JSONB,
    claims JSONB,
    sources JSONB,
    conflicts JSONB,
    confidence INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- fact_checks
CREATE TABLE public.fact_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    research_report_id UUID REFERENCES public.research_reports(id),
    claim TEXT,
    status TEXT, -- VERIFIED, PARTIALLY_VERIFIED, UNVERIFIED, CONFLICTING
    supporting_sources JSONB,
    confidence INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- draft_posts
CREATE TABLE public.draft_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_group_id UUID REFERENCES public.story_groups(id),
    headline TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    image_url TEXT,
    image_prompt TEXT,
    status TEXT DEFAULT 'PENDING_APPROVAL', -- DRAFT, PENDING_APPROVAL, APPROVED, REJECTED, SCHEDULED, PUBLISHED, FAILED
    scheduled_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- agent_runs
CREATE TABLE public.agent_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_name TEXT NOT NULL, -- Scout, Research, FactCheck, Writer
    status TEXT NOT NULL, -- SUCCESS, FAILED, RUNNING
    articles_processed INTEGER DEFAULT 0,
    logs TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_news_articles_published_at ON public.news_articles(published_at);
CREATE INDEX idx_news_articles_status ON public.news_articles(status);
CREATE INDEX idx_news_articles_category ON public.news_articles(category);
CREATE INDEX idx_news_articles_source_id ON public.news_articles(source_id);
CREATE INDEX idx_news_articles_story_group_id ON public.news_articles(story_group_id);
