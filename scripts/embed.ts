import { NavalChunk, NavalEssay, NavalJSON } from "@/types";
import { loadEnvConfig, processEnv } from "@next/env";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import { SupabaseClient } from "@supabase/supabase-js";

loadEnvConfig("");

const generateEmbeddings = async (essays: NavalEssay[]) => {
    const openai_config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(openai_config);

    const supabase = new SupabaseClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!
    );

    for (let i = 0; i < essays.length; i++) {
        const essay = essays[i];
        for (let j = 0; j < essay.chunks.length; j++) {
            const chunk: NavalChunk = essay.chunks[j];

            // OpenAI documentation: https://platform.openai.com/docs/api-reference/embeddings?lang=node.js
            const embeddingResponse = await openai.createEmbedding({
                model: "text-embedding-ada-002",
                input: chunk.content,
            });
            const [{ embedding }] = embeddingResponse.data.data;

            // Supabase documentation: https://supabase.com/docs/reference/javascript/insert
            const { data, error } = await supabase.from("naval").insert({
                essay_title: chunk.essay_title,
                essay_url: chunk.essay_url,
                content: chunk.content,
                tokens: chunk.tokens,
                embedding,
            });

            if (error) {
                console.log("error");
            } else {
                console.log("saved", i, j);
            }

            // add 300ms delay between API calls to avoid rate-limiting
            await new Promise((resolve) => setTimeout(resolve, 300));
        }
    }
};

(async () => {
    const json: NavalJSON = JSON.parse(
        fs.readFileSync("scripts/naval_essays.json", "utf-8")
    );

    await generateEmbeddings(json.essays);
})();
