create extension if not exists pgcrypto;

create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  address text,
  owner_name text,
  general_contractor text,
  retainage_amount numeric(12,2),
  status text default 'walkthrough',
  created_at timestamptz default now()
);

create table punch_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects not null,
  item_number integer not null,
  description text not null,
  location text,
  trade text,
  assigned_to text,
  assigned_email text,
  priority text default 'normal',
  fix_token text unique default encode(gen_random_bytes(16), 'hex'),
  status text default 'open',
  acknowledged_at timestamptz,
  resolved_at timestamptz,
  resolved_by text,
  resolution_notes text,
  created_at timestamptz default now()
);

-- RLS policies
alter table projects enable row level security;
alter table punch_items enable row level security;

create policy "Users can manage their own projects"
  on projects for all using (auth.uid() = user_id);

create policy "Punch items accessible via project ownership"
  on punch_items for all using (
    project_id in (select id from projects where user_id = auth.uid())
  );

create policy "Public fix token access for punch items"
  on punch_items for select using (true);

create policy "Public fix token update for punch items"
  on punch_items for update using (true);
