create table if not exists grant_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  county text,
  rebate_interest text,
  created_at timestamptz default now()
);
