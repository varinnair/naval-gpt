import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
    return (
        <div className="flex h-[50px] border-t border-gray-300 py-2 px-8 items-center sm:justify-between justify-center">
            <div className="hidden sm:flex"></div>

            <div className="hidden sm:flex italic text-sm">
                Created by
                <a
                    className="hover:opacity-50 mx-1"
                    href="https://twitter.com/varin_nair"
                    target="_blank"
                    rel="noreferrer"
                >
                    Varin Nair
                </a>
                based on the
                <a
                    className="hover:opacity-50 ml-1"
                    href="https://www.navalmanack.com/almanack-of-naval-ravikant/table-of-contents"
                    target="_blank"
                    rel="noreferrer"
                >
                    Almanack of Naval Ravikant
                </a>
                .
            </div>

            <div className="flex space-x-4">
                <a
                    className="flex items-center hover:opacity-50"
                    href="https://twitter.com/varin_nair"
                    target="_blank"
                    rel="noreferrer"
                >
                    <IconBrandTwitter size={24} />
                </a>

                <a
                    className="flex items-center hover:opacity-50"
                    href="https://github.com/varinnair/naval-gpt"
                    target="_blank"
                    rel="noreferrer"
                >
                    <IconBrandGithub size={24} />
                </a>
            </div>
        </div>
    );
};
