# Naval-Almanack-GPT

This app enables AI-powered search for [Naval's Almanack](https://www.navalmanack.com/almanack-of-naval-ravikant/table-of-contents).

## Dataset

Scraped the essays from the [Almanack Index Page](https://www.navalmanack.com/almanack-of-naval-ravikant/table-of-contents).

Broke them up into chunks of 200 tokens and stored them in a PostgreSQL table in Supabase.

## Running Locally

Requirements

1. OpenAI API key to generate text embeddings
2. Supabase account for the Postgres Database

See the `schema.sql` file for the script to set up the database. Run that in the SQL editor in Supabase.

3. Clone repo

```bash
git clone https://github.com/varinnair/naval-gpt.git
```

4. Install dependencies

```bash
npm i
```

5. Create a `.env.local` file in the root of the repo with the following variables:

```bash
OPENAI_API_KEY=

SUPABASE_URL=
SUPABASE_KEY=
```

Make sure to replace apiKey with `process.env.OPENAI_API_KEY` in `api/search.ts` and `api/answer.ts`

6. Run scraping script

```bash
npm run scrape
```

This scrapes Naval's essays from his website and saves them to a JSON file.

7. Run embedding script

```bash
npm run embed
```

This reads the JSON file, generates embeddings for each chunk of text, and saves the results to the database.

Make sure the name of the table is correct in this script.

There is a 200ms delay between each request to avoid rate limiting.

8. Run app

```bash
npm run dev
```

## Credits

Thanks to [Almanack of Naval Ravikant](https://www.navalmanack.com/almanack-of-naval-ravikant/table-of-contents) for the content.

Thanks to [Mckay Wrigley](https://twitter.com/mckaywrigley) for open-sourcing his UI.
