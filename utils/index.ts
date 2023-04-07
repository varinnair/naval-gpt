import { SupabaseClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";

export const supabase = new SupabaseClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);

export const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);
