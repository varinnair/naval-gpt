import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
    return (
        <div className="flex py-2 px-8 border-t border-gray-300 items-center justify-center">
            <div className="hidden sm:flex"></div>

            <div className="flex space-x-4">
                <a
                    className="flex items-center hover:opacity-50"
                    href="https://twitter.com/varin_nair"
                    target="_blank"
                    rel="noreferrer"
                >
                    <IconBrandTwitter size={32} />
                </a>

                <a
                    className="flex items-center hover:opacity-50"
                    href="https://github.com/varinnair/naval-gpt"
                    target="_blank"
                    rel="noreferrer"
                >
                    <IconBrandGithub size={32} />
                </a>
            </div>
        </div>
    );
};
