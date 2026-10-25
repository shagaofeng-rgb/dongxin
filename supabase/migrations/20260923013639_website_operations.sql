create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'admin' check (role in ('admin','manager')),
  created_at timestamptz not null default now()
);

create table if not exists public.visitor_profiles (
  visitor_id uuid primary key,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  country text,
  device_type text check (device_type in ('desktop','mobile','tablet'))
);

create table if not exists public.visitor_sessions (
  id uuid primary key,
  visitor_id uuid not null references public.visitor_profiles(visitor_id) on delete cascade,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  ended_at timestamptz,
  landing_path text not null,
  referrer text,
  country text,
  device_type text check (device_type in ('desktop','mobile','tablet'))
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null references public.visitor_profiles(visitor_id) on delete cascade,
  session_id uuid not null references public.visitor_sessions(id) on delete cascade,
  event_type text not null check (event_type in ('page_view','page_exit','whatsapp_click','form_started','form_submit','cta_click')),
  pathname text not null,
  page_title text,
  referrer text,
  duration_ms integer check (duration_ms is null or duration_ms >= 0),
  country text,
  device_type text check (device_type in ('desktop','mobile','tablet')),
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid references public.visitor_profiles(visitor_id) on delete set null,
  session_id uuid references public.visitor_sessions(id) on delete set null,
  form_type text not null default 'contact',
  name text,
  email text not null,
  company text,
  country text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'new' check (status in ('new','reviewing','qualified','closed')),
  internal_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists analytics_events_occurred_at_idx on public.analytics_events (occurred_at desc);
create index if not exists analytics_events_visitor_id_idx on public.analytics_events (visitor_id, occurred_at desc);
create index if not exists visitor_sessions_started_at_idx on public.visitor_sessions (started_at desc);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_created_at_idx on public.inquiries (status, created_at desc);

alter table public.admin_profiles enable row level security;
alter table public.visitor_profiles enable row level security;
alter table public.visitor_sessions enable row level security;
alter table public.analytics_events enable row level security;
alter table public.inquiries enable row level security;

-- New Supabase projects require explicit Data API grants. Only the server-side
-- service role can read or write visitor, event, and inquiry records.
revoke all on public.admin_profiles from anon, authenticated;
revoke all on public.visitor_profiles from anon, authenticated;
revoke all on public.visitor_sessions from anon, authenticated;
revoke all on public.analytics_events from anon, authenticated;
revoke all on public.inquiries from anon, authenticated;

grant select, insert, update, delete on public.admin_profiles to service_role;
grant select, insert, update, delete on public.visitor_profiles to service_role;
grant select, insert, update, delete on public.visitor_sessions to service_role;
grant select, insert, update, delete on public.analytics_events to service_role;
grant select, insert, update, delete on public.inquiries to service_role;

-- The signed-in administrator reads only their own access record. No browser
-- role can enumerate other administrators or inspect analytics data directly.
grant select on public.admin_profiles to authenticated;
drop policy if exists "Administrators can read their own profile" on public.admin_profiles;
create policy "Administrators can read their own profile"
  on public.admin_profiles for select to authenticated
  using ((select auth.uid()) = id);
