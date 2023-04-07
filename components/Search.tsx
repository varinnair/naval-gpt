import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { FC, RefObject, SetStateAction } from "react";

interface Props {
    inputRef: RefObject<HTMLInputElement>;
    query: string;
    setQuery: (value: SetStateAction<string>) => void;
    handleKeyDown: (e: any) => void;
    handleAnswer: () => Promise<void>;
}
export const Search: FC<Props> = ({
    inputRef,
    query,
    setQuery,
    handleKeyDown,
    handleAnswer,
}) => {
    return (
        <div className="relative w-full mt-4">
            <IconSearch className="absolute top-3 w-10 left-1 h-6 rounded-full opacity-50 sm:left-3 sm:top-4 sm:h-8" />

            <input
                ref={inputRef}
                className="h-12 w-full rounded-full border border-zinc-600 pr-12 pl-11 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:h-16 sm:py-2 sm:pr-16 sm:pl-16 sm:text-lg"
                type="text"
                placeholder="How do I build wealth?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button>
                <IconArrowRight
                    onClick={handleAnswer}
                    className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-blue-500 p-1 hover:cursor-pointer hover:bg-blue-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10 text-white"
                />
            </button>
        </div>
    );
};
