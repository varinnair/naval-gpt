import { Dispatch, FC, SetStateAction } from "react";

interface Props {
    mode: "search" | "chat";
    setMode: Dispatch<SetStateAction<"search" | "chat">>;
    matchCount: number;
    setMatchCount: Dispatch<SetStateAction<number>>;
    apiKey: string;
    setApiKey: Dispatch<SetStateAction<string>>;
    setShowSettings: Dispatch<SetStateAction<boolean>>;
    handleSave: () => void;
    handleClear: () => void;
}

export const Settings: FC<Props> = ({
    mode,
    setMode,
    matchCount,
    setMatchCount,
    apiKey,
    setApiKey,
    setShowSettings,
    handleSave,
    handleClear,
}) => {
    return (
        <div className="w-[340px] sm:w-[400px]">
            <div>
                <div>Mode</div>
                <select
                    className="max-w-[400px] block w-full cursor-pointer rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    value={mode}
                    onChange={(e) =>
                        setMode(e.target.value as "search" | "chat")
                    }
                >
                    <option value="search">Search</option>
                    <option value="chat">Chat</option>
                </select>
            </div>

            <div className="mt-2">
                <div>Passage Count</div>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={matchCount}
                    onChange={(e) => setMatchCount(Number(e.target.value))}
                    className="max-w-[400px] block w-full rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
            </div>

            <div className="mt-2">
                <div>OpenAI API Key</div>
                <input
                    type="password"
                    placeholder="OpenAI API Key"
                    className="max-w-[400px] block w-full rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    value={apiKey}
                    onChange={(e) => {
                        setApiKey(e.target.value);

                        if (e.target.value.length !== 51) {
                            setShowSettings(true);
                        }
                    }}
                />
            </div>

            <div className="mt-4 flex space-x-2 justify-center">
                <div
                    className="flex cursor-pointer items-center space-x-2 rounded-full bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                    onClick={handleSave}
                >
                    Save
                </div>

                <div
                    className="flex cursor-pointer items-center space-x-2 rounded-full bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    onClick={handleClear}
                >
                    Clear
                </div>
            </div>
        </div>
    );
};
