create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  preferred_language text default 'pt-BR',
  preferred_theme text default 'dark',
  preferred_timezone text default 'UTC',
  preferred_currency text default 'BRL',
  preferred_date_format text default 'dd/MM/yyyy',
  preferred_number_format text default '1.234,56',
  onboarding_completed boolean default false,
  created_at timestamptz default now()
);

create table if not exists import_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null,
  detected_platform text,
  filename text,
  hands_imported int default 0,
  created_at timestamptz default now()
);

create table if not exists hands (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid references import_sessions(id) on delete set null,
  external_hand_id text,
  game_type text,
  tournament_name text,
  table_name text,
  max_players int,
  blinds_small numeric,
  blinds_big numeric,
  ante numeric,
  started_at_utc timestamptz,
  hero_name text,
  hero_cards text[],
  board text[],
  pot_total numeric,
  result_label text,
  raw_text text not null,
  parsed_json jsonb not null,
  created_at timestamptz default now()
);
