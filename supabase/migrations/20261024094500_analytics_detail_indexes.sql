create index if not exists analytics_events_session_occurred_at_idx on public.analytics_events (session_id, occurred_at asc);
create index if not exists inquiries_session_id_idx on public.inquiries (session_id);
create index if not exists inquiries_visitor_id_idx on public.inquiries (visitor_id);
create index if not exists visitor_sessions_visitor_started_at_idx on public.visitor_sessions (visitor_id, started_at desc);
