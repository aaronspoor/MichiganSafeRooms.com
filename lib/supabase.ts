import { createClient } from "@supabase/supabase-js";

// Factory — called inside handlers to avoid module-level init crash when env vars are absent at build time
// Uses anon key with RLS INSERT policy — no service role key needed
export function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
}
