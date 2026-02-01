-- Add Stripe Account ID to profiles (for Workers)
alter table public.profiles 
add column if not exists stripe_account_id text;

-- Create HIRES table (Marketplace Transactions)
create type hire_status as enum ('pending', 'paid', 'completed', 'disputed');

create table if not exists public.hires (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references public.profiles(id) not null,
  worker_id uuid references public.profiles(id) not null,
  project_id uuid references public.projects(id), -- Optional: Link to specific project
  amount integer not null, -- Amount in cents
  platform_fee integer not null, -- Fee in cents
  status hire_status default 'pending',
  stripe_session_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for Hires
alter table public.hires enable row level security;

create policy "Users can view their own hires (as client or worker)." 
on public.hires for select 
using (auth.uid() = client_id or auth.uid() = worker_id);

-- Only creating hires via API (Service Role) is safer for now, 
-- but we can allow authenticated creation if we validate server-side.
