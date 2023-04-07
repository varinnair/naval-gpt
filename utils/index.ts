import { SupabaseClient } from "@supabase/supabase-js";

export const supabase = new SupabaseClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);
