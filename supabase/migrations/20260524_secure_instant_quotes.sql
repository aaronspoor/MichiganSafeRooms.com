-- Lock instant_quotes: anon can only reach it through the SECURITY DEFINER
-- functions below, which generate the daily quote number server-side.
-- This keeps PII unreadable with the anon key while still allowing inserts.

create or replace function public.create_instant_quote(p jsonb)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  d text := to_char(now() at time zone 'America/Detroit', 'YYYYMMDD');
  n int;
  qnum text;
begin
  select count(*) + 1 into n
    from public.instant_quotes
    where quote_number like 'MSR-' || d || '-%';
  qnum := 'MSR-' || d || '-' || lpad(n::text, 4, '0');

  insert into public.instant_quotes (
    first_name, last_name, email, phone, street_address, address_line_2, city, state, zip,
    install_address, referral_source, bedrooms, occupants, mobility_needs, location,
    has_concrete_slab, slab_thickness, flood_zone, rebate_intent, veteran,
    recommended_size, recommended_sqft, line_items, subtotal, veteran_discount, total,
    estimated_rebate, net_out_of_pocket, requires_bca, rebate_flags, quote_number
  ) values (
    p->>'first_name', p->>'last_name', p->>'email', p->>'phone', p->>'street_address',
    nullif(p->>'address_line_2',''), p->>'city', coalesce(nullif(p->>'state',''),'MI'), p->>'zip',
    nullif(p->>'install_address',''), nullif(p->>'referral_source',''),
    (p->>'bedrooms')::int, (p->>'occupants')::int, p->>'mobility_needs', p->>'location',
    p->>'has_concrete_slab', nullif(p->>'slab_thickness',''), p->>'flood_zone', p->>'rebate_intent',
    coalesce((p->>'veteran')::boolean, false),
    p->>'recommended_size', (p->>'recommended_sqft')::numeric,
    coalesce(p->'line_items', '[]'::jsonb), (p->>'subtotal')::numeric,
    coalesce((p->>'veteran_discount')::numeric, 0), (p->>'total')::numeric,
    coalesce((p->>'estimated_rebate')::numeric, 0), (p->>'net_out_of_pocket')::numeric,
    coalesce((p->>'requires_bca')::boolean, false),
    coalesce(p->'rebate_flags', '[]'::jsonb), qnum
  );
  return qnum;
end;
$$;

create or replace function public.mark_instant_quote_email(
  p_quote_number text, p_sent_at timestamptz, p_error text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.instant_quotes
    set email_sent_at = p_sent_at,
        email_send_error = p_error
    where quote_number = p_quote_number;
end;
$$;

revoke all on function public.create_instant_quote(jsonb) from public;
revoke all on function public.mark_instant_quote_email(text, timestamptz, text) from public;
grant execute on function public.create_instant_quote(jsonb) to anon, authenticated;
grant execute on function public.mark_instant_quote_email(text, timestamptz, text) to anon, authenticated;

-- Enable RLS with no anon table policies: direct table access is blocked,
-- but the SECURITY DEFINER functions (owned by postgres) bypass it.
alter table public.instant_quotes enable row level security;
