export type NavalEssay = {
    title: string;
    url: string;
    content: string;
    tokens: number;
    chunks: NavalChunk[];
};

export type NavalChunk = {
    essay_title: string;
    essay_url: string;
    content: string;
    tokens: number;
    embedding: number[];
};

export type NavalJSON = {
    essays: NavalEssay[];
};
