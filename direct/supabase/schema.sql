-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- PROFILES (Public User Data)
-- Linked to auth.users via triggers (to be added)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  stripe_account_id text,
  full_name text,
  avatar_url text,
  reputation_score int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PROJECTS (The Core "Proof of Work")
create type project_status as enum ('draft', 'submitted', 'verified', 'rejected');

create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  title text not null,
  description text not null,
  repository_url text, -- Link to GitHub/GitLab
  live_url text,       -- Link to deployed app
  status project_status default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- VERIFICATIONS (The AI Layer)
-- This table stores the output of the "Verification Agent"
create table public.verifications (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  ai_model_version text not null, -- e.g., "gpt-4-turbo-2024-01"
  compliance_score int check (compliance_score between 0 and 100),
  security_score int check (security_score between 0 and 100),
  complexity_score int check (complexity_score between 0 and 100),
  feedback_summary text,
  raw_analysis jsonb, -- Full AI output for deep dive
  verified_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Security)
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.verifications enable row level security;

-- Policies (Simplified for Initial Setup)
-- 1. Profiles are viewable by everyone, editable by owner.
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- 2. Projects are viewable by everyone (if public), editable by owner.
create policy "Projects are viewable by everyone." on public.projects for select using (true);
create policy "Users can insert their own projects." on public.projects for insert with check (auth.uid() = user_id);
create policy "Users can update own projects." on public.projects for update using (auth.uid() = user_id);

-- 3. Verifications are viewable by everyone, but ONLY inserted by Service Role (AI Agent).
create policy "Verifications are viewable by everyone." on public.verifications for select using (true);
-- Note: Insert policy for verifications will be handled by Service Role key in the backend.
