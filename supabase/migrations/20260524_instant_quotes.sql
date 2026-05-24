-- Instant quote submissions.
-- Table holds PII; it is locked with RLS in the companion migration
-- 20260524_secure_instant_quotes.sql, and all writes go through
-- SECURITY DEFINER functions so the anon key can never read rows back.
create table if not exists public.instant_quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- contact
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  street_address text not null,
  address_line_2 text,
  city text not null,
  state text not null default 'MI',
  zip text not null,
  install_address text,
  referral_source text,

  -- household
  bedrooms int not null,
  occupants int not null,
  mobility_needs text not null,

  -- site
  location text not null,
  has_concrete_slab text not null,
  slab_thickness text,
  flood_zone text not null,

  -- rebate
  rebate_intent text not null,
  veteran boolean not null default false,

  -- computed quote snapshot (server-authoritative at submission time)
  recommended_size text not null,
  recommended_sqft numeric not null,
  line_items jsonb not null,
  subtotal numeric not null,
  veteran_discount numeric not null default 0,
  total numeric not null,
  estimated_rebate numeric not null default 0,
  net_out_of_pocket numeric not null,
  requires_bca boolean not null default false,
  rebate_flags jsonb not null default '[]'::jsonb,

  -- ops
  quote_number text not null unique, -- MSR-YYYYMMDD-####
  email_sent_at timestamptz,
  email_send_error text,
  status text not null default 'new' -- new, contacted, scheduled, won, lost
);

create index if not exists instant_quotes_email_idx on public.instant_quotes (email);
create index if not exists instant_quotes_created_at_idx on public.instant_quotes (created_at desc);
create index if not exists instant_quotes_status_idx on public.instant_quotes (status);
