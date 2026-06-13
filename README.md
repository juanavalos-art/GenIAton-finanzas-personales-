# 💰 CashCoach

Coach financiero con IA para jóvenes. Registra tus gastos, deja que la IA los clasifique,
analiza tus hábitos, detecta fugas de dinero, genera retos de ahorro y simula metas.

MVP construido para hackathon.

## Stack
- **Next.js 14** (App Router, TypeScript)
- **shadcn/ui** + Tailwind CSS + lucide-react
- **Supabase** (PostgreSQL)
- **DeepSeek** API (`deepseek-chat`) — con fallback a mock si no hay API key
- UI en español · sin autenticación (usuario demo)

## Arquitectura (3 capas)
```
app/api/ (route)  →  services/ (lógica)  →  providers/ (Supabase / DeepSeek)
                            ↕
                     domain/types.ts
```

## Puesta en marcha

1. **Instala dependencias**
   ```bash
   npm install
   ```

2. **Configura la base de datos**
   - En tu proyecto de Supabase → SQL Editor, ejecuta [`supabase-schema.sql`](./supabase-schema.sql).

3. **Variables de entorno** — crea `.env.local` (puedes partir de `.env.example`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...      # publishable key (pública)
   DEEPSEEK_API_KEY=sk-...                                # opcional; sin ella se usa un mock
   ```
   > ⚠️ Nunca pongas la *secret key* (`sb_secret_...`) en una variable `NEXT_PUBLIC_*`.

4. **Levanta la app**
   ```bash
   npm run dev
   ```
   Abre http://localhost:3000

## Funcionalidades
- **Dashboard** (`/`) — resumen del mes, gráfica por categoría, reto de la semana (IA) y accesos rápidos.
- **Gastos** (`/gastos`) — registrar y listar gastos; categoría manual o automática (IA).
- **Chat** (`/chat`) — coach financiero con contexto de tus gastos.

## Estructura
```
src/
├── app/          # páginas y API routes
├── domain/       # tipos e interfaces
├── services/     # lógica de negocio
├── providers/    # Supabase y DeepSeek
├── components/   # componentes React (+ ui/ de shadcn)
└── lib/          # utilidades (formato, categorías, nav)
```

El progreso de cada etapa de desarrollo está documentado en [`chamba-de-claudio/`](./chamba-de-claudio).
