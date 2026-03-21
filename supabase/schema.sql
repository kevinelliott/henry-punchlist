-- PunchList Database Schema

create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  address text,
  owner_name text,
  contract_value numeric(15,2),
  created_at timestamptz default now()
);

create table punch_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  area text not null,
  trade text not null check (trade in ('electrical','plumbing','painting','drywall','flooring','hvac','glazing','landscaping','other')),
  description text not null,
  priority text default 'medium' check (priority in ('critical','high','medium','low')),
  assigned_to_name text,
  assigned_to_email text,
  completion_token uuid default gen_random_uuid(),
  status text default 'open' check (status in ('open','in_progress','submitted','verified','rejected')),
  completion_notes text,
  photo_filenames text,
  rejection_reason text,
  submitted_at timestamptz,
  verified_at timestamptz,
  created_at timestamptz default now()
);

alter table projects enable row level security;
alter table punch_items enable row level security;

create policy "Users own their projects" on projects for all using (auth.uid() = user_id);
create policy "Users own their items" on punch_items for all using (auth.uid() = user_id);
create policy "Public can read by token" on punch_items for select using (true);
create policy "Public can update completion fields" on punch_items for update using (true) with check (true);
