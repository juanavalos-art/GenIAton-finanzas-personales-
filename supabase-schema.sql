-- ============================================================
-- CashCoach — Esquema de base de datos (Supabase / PostgreSQL)
-- ============================================================
-- Cómo usar:
--   1. Entra a tu proyecto en https://supabase.com
--   2. Abre "SQL Editor" → "New query"
--   3. Pega TODO este archivo y dale "Run"
--   4. Copia tu Project URL y anon key (Settings → API) a .env.local
--
-- Es un MVP demo SIN autenticación: RLS deshabilitado.
-- ============================================================

-- Tabla: gastos
create table if not exists public.gastos (
  id          uuid primary key default gen_random_uuid(),
  descripcion text not null,
  monto       numeric(12, 2) not null,
  -- categoria válida: comida | transporte | entretenimiento | servicios
  --                   | compras | salud | educacion | otros
  categoria   text not null default 'otros',
  fecha       date not null default current_date,
  created_at  timestamptz not null default now()
);

-- Tabla: mensajes_chat
create table if not exists public.mensajes_chat (
  id         uuid primary key default gen_random_uuid(),
  rol        text not null check (rol in ('user', 'assistant')),
  contenido  text not null,
  created_at timestamptz not null default now()
);

-- Índices para ordenar eficientemente
create index if not exists idx_gastos_fecha
  on public.gastos (fecha desc, created_at desc);

create index if not exists idx_mensajes_created_at
  on public.mensajes_chat (created_at asc);

-- RLS deshabilitado (demo sin auth — la anon key puede leer/escribir)
alter table public.gastos        disable row level security;
alter table public.mensajes_chat disable row level security;
