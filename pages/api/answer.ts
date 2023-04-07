import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from "eventsource-parser";

export const config = {
    runtime: "edge",
};

const getChatCompletion = async (prompt: string, apiKey: string) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful assistant that accurately answers queries using the almanack of Naval Ravikant, his essays and teachings. Use the text provided to form your answer, but avoid copying word-for-word from the essays. Try to use your own words when possible. Keep your answer under 5 sentences. Be accurate, helpful, concise, and clear.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_tokens: 150,
            temperature: 0.0,
            stream: true,
        }),
    });

    if (response.status !== 200) {
        throw new Error("Error");
    }

    return response;
};

const getStream = async (response: Response) => {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
        async start(controller) {
            const onParse = (event: ParsedEvent | ReconnectInterval) => {
                if (event.type === "event") {
                    const data = event.data;

                    if (data === "[DONE]") {
                        controller.close();
                        return;
                    }

                    try {
                        const json = JSON.parse(data);
                        const text = json.choices[0].delta.content;
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                    } catch (e) {
                        controller.error(e);
                    }
                }
            };

            const parser = createParser(onParse);

            for await (const chunk of response.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });
    return stream;
};

const handler = async (req: Request): Promise<Response> => {
    try {
        const { prompt, apiKey } = (await req.json()) as {
            prompt: string;
            apiKey: string;
        };

        const response = await getChatCompletion(prompt, apiKey);

        const stream = await getStream(response);

        return new Response(stream, { status: 200 });
    } catch (e) {
        return new Response("Error", { status: 500 });
    }
};

export default handler;
