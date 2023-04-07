import Head from "next/head";
import { useState } from "react";
import { NavalChunk } from "@/types";

export default function Home() {
    const [query, setQuery] = useState("");
    const [answer, setAnswer] = useState("");

    const handleQuery = async () => {
        setAnswer("");
        // get chunks
        const searchResponse = await fetch("/api/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        });

        if (!searchResponse.ok) {
            return;
        }

        const chunks: NavalChunk[] = await searchResponse.json();

        let prompt = `Use the following passages to answer the query: ${query}`;
        for (let i = 0; i < chunks.length; i++) {
            const chunk: NavalChunk = chunks[i];
            prompt += "\n\n" + chunk.content;
        }

        const answerResponse = await fetch("/api/answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        if (!answerResponse.ok) {
            return;
        }

        const data = answerResponse.body;

        if (!data) {
            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setAnswer((prev) => prev + chunkValue);
        }
    };
    return (
        <>
            <Head>
                <title>Naval GPT</title>
                <meta
                    name="description"
                    content="AI Q&A on Naval's Almanack Essays"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <input
                    type="text"
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleQuery}>Search</button>
                <br />
                <div>{answer}</div>
            </div>
        </>
    );
}
