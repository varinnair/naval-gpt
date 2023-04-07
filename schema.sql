-- 1st
create extension vector;

-- 2nd
create table naval (
  id bigserial primary key,
  essay_title text,
  essay_url text,
  content text,
  tokens bigint,
  embedding vector (1536)
);

-- 3rd
create or replace function naval_search (
  query_embedding vector (1536),
  similarity_threshold float,
  match_count int
)
returns table(
  id bigint,
  essay_title text,
  essay_url text,
  content text,
  tokens bigint,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    naval.id,
    naval.essay_title,
    naval.essay_url,
    naval.content,
    naval.tokens,
    1 - (naval.embedding <=> query_embedding) as 
similarity
from naval 
where 1 - (naval.embedding <=> query_embedding) > similarity_threshold
order by (naval.embedding <=> query_embedding)
limit match_count;
end;
$$;

-- 4th (run after populating the DB with scraped chunks)
create index on naval
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);