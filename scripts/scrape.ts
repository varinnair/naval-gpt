import { NavalEssay } from "@/types";
import axios from "axios";
import * as cheerio from "cheerio";
import { encode } from "gpt-3-encoder";
import fs from "fs";

export {};

const BASE_URL = "https://www.navalmanack.com";

const getLinks = async () => {
    const html = await axios.get(
        `${BASE_URL}/almanack-of-naval-ravikant/table-of-contents`
    );
    const $ = cheerio.load(html.data);

    const h3s = $("h3");

    const linksArray: { title: string; url: string }[] = [];
    h3s.each((i, h3) => {
        if (
            (i === 1 || i === 2) &&
            $(h3).attr("style") === "white-space:pre-wrap;"
        ) {
            const links = $(h3).find("a");
            links.each((j, link) => {
                const url = $(link).attr("href");
                const title = $(link).text();
                if (typeof url === "string" && typeof title === "string") {
                    linksArray.push({ title, url });
                }
            });
        }
    });
    return linksArray;
};

const getEssay = async (essay_title: string, essay_url: string) => {
    const html = await axios.get(`${BASE_URL}${essay_url}`);
    const $ = cheerio.load(html.data);

    const contentDiv = $("div.sqs-block-content");

    const pAndh2 = $(contentDiv[2]).find("p, h2");

    let essayText = "";

    pAndh2.each((i, element) => {
        if (
            $(element).attr("data-rte-preserve-empty") === undefined &&
            $(element).attr("style") === "white-space:pre-wrap;"
        ) {
            const text = $(element).text();

            // Replaces one or more consecutive whitespace characters (spaces, tabs, or newlines) with a single space.
            // Also replaces a period followed by a letter (lowercase or uppercase) with a period, a space, and the same letter.
            // So "went to the market.Then..." becomes "went to the market. Then..." notice the space between "." and "Then"
            // Also removes reference numbers (eg. "[79]")
            let cleanedText = text
                .replace(/\s+/g, " ")
                .replace(/\.([a-zA-Z])/g, ". $1")
                .replace(/\[\d+\]/g, "");

            // replace newlines with space, then remove leading and trailing spaces from text
            cleanedText = cleanedText.replace(/\n/g, " ").trim();

            if (cleanedText.length === 0) {
                return;
            }

            if (cleanedText[cleanedText.length - 1].match(/[a-z0-9]/i)) {
                essayText += cleanedText + ". ";
            } else {
                essayText += cleanedText + " ";
            }
        }
    });

    return {
        title: essay_title,
        url: `${BASE_URL}${essay_url}`,
        content: essayText,
        tokens: encode(essayText).length,
        chunks: [],
    };
};

(async () => {
    const linksArray = await getLinks();

    const essays: NavalEssay[] = [];
    for (let i = 0; i < linksArray.length; i++) {
        const { title, url } = linksArray[i];
        const essay = await getEssay(title, url);
        console.log(essay);
    }
})();
