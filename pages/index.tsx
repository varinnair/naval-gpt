import Head from "next/head";
import { useState } from "react";
import { NavalChunk } from "@/types";
import endent from "endent";

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
            </div>
        </>
    );
}
