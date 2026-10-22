-- ========================================================
-- Supabase Schema for Engagement & Wedding Invitation RSVPs
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ========================================================

-- 1. Create the 'rsvps' table
create table if not exists public.rsvps (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    full_name text not null,
    email text not null,
    phone text,
    is_attending boolean not null default true,
    attending_events text not null default 'both', -- 'ceremony', 'reception', 'both'
    guest_count integer not null default 1,
    dietary_preferences text,
    message_to_couple text
);

-- 2. Enable Row-Level Security (RLS)
alter table public.rsvps enable row level security;

-- 3. Policy: Allow anyone (guests) to insert their RSVP
create policy "Allow public insert to rsvps"
    on public.rsvps
    for insert
    to anon, authenticated
    with check (true);

-- 4. Policy: Allow reading RSVP responses (for responses dashboard)
create policy "Allow public read of rsvps"
    on public.rsvps
    for select
    to anon, authenticated
    using (true);

-- 5. Helpful index for sorting by submission date
create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
