import { NavalChunk } from "@/types";
import { IconExternalLink } from "@tabler/icons-react";
import { FC } from "react";

interface Props {
    index: number;
    chunk: NavalChunk;
}
export const Passage: FC<Props> = ({ index, chunk }) => {
    return (
        <div key={index}>
            <div className="mt-4 border border-zinc-600 rounded-lg p-4">
                <div className="flex justify-between">
                    <div>
                        <div className="font-bold text-xl">
                            {chunk.essay_title}
                        </div>
                    </div>
                    <a
                        className="hover:opacity-50 ml-2"
                        href={chunk.essay_url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <IconExternalLink />
                    </a>
                </div>
                <div className="mt-2">{chunk.content}</div>
            </div>
        </div>
    );
};
