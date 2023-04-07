import { supabase } from "@/utils";

export const config = {
    runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
    try {
        const { query, apiKey, matches } = (await req.json()) as {
            query: string;
            apiKey: string;
            matches: number;
        };

        const response = await fetch("https://api.openai.com/v1/embeddings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "text-embedding-ada-002",
                input: query.replace(/\n/g, " "),
            }),
        });

        if (response.status !== 200) {
            throw new Error("Error");
        }

        const json = await response.json();
        const embedding = json.data[0].embedding;

        const { data, error } = await supabase.rpc("naval_search", {
            query_embedding: embedding,
            similarity_threshold: 0.5,
            match_count: matches,
        });

        if (error) {
            console.log(error);
            return new Response("Error", { status: 500 });
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (e) {
        return new Response("Error", { status: 500 });
    }
};

export default handler;
