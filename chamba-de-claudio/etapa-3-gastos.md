# Etapa 3 — CRUD de gastos ✅ (verificado end-to-end contra Supabase)

## Qué se hizo
Flujo completo de registro y listado de gastos siguiendo el patrón de 3 capas
(route → service → provider) y el skill de UI.

## Archivos creados
- **`src/lib/format.ts`** — `formatMonto` (Intl es-MX/MXN) y `formatFecha` (corto en español).
- **`src/lib/categorias.ts`** — `categoriaBadgeColor` (colores del skill de UI) y `categoriaLabel` (etiqueta legible con acentos).
- **`src/services/gastos.service.ts`**:
  - `registrarGasto(descripcion, monto, categoria?)` — valida (descripción no vacía, monto > 0) y delega en el provider. Sin categoría → `"otros"` (la Etapa 6 lo clasificará con IA).
  - `obtenerTodosLosGastos()` — delega en el provider (ya ordena por fecha desc).
- **`src/app/api/gastos/route.ts`** — `GET` (lista) y `POST` (crea); solo parsea → service → response, con try/catch y mensaje claro. `export const dynamic = "force-dynamic"`.
- **`src/components/GastoForm.tsx`** (client) — descripción, monto con prefijo `$` (input numérico, `font-mono`), select de categoría con opción "Automática 🤖", validación en cliente, estados de loading/error. Llama `POST /api/gastos` y dispara `onCreated`.
- **`src/components/GastoList.tsx`** — Card por gasto (descripción, fecha, badge de categoría con color, monto `font-mono font-bold`). Estado vacío "Sin gastos aún".

## Archivos modificados
- **`src/app/gastos/page.tsx`** (client) — `useState`/`useEffect`/`useCallback`: carga `GET /api/gastos` al montar, muestra `GastoForm` + `GastoList`, y refresca la lista al registrar.
- **`src/providers/supabase.provider.ts`** — **refactor a init perezosa**: el cliente se crea en `getClient()` la primera vez que se usa, no en el nivel del módulo.
  - *Por qué:* con `export const supabase = createClient(...)` en el top-level, `next build` fallaba al **importar** la ruta `/api/gastos` si faltaban las env vars. Con init perezosa, importar es seguro y el error claro solo aparece en runtime al tocar la BD.

## Decisiones tomadas
- **`force-dynamic` en la ruta de gastos**: es un endpoint de datos; no debe cachearse ni ejecutarse en build.
- **Helpers de formato/categoría en `lib/`** para reutilizarlos en el dashboard (Etapa 5).
- **Validación en cliente y en service** (defensa en profundidad).

## Validación
- ✅ `npm run build` → compila. `/api/gastos` = `ƒ (Dynamic)`, `/gastos` = página con form+list. Build OK **incluso con env vacías** (gracias a la init perezosa).
- ✅ **Flujo real verificado contra Supabase** (con la Project URL ya configurada):
  - `POST` "Café en Starbucks" ($85.50, comida) → `201`, `fecha: 2026-06-13`.
  - `POST` "Uber al trabajo" ($120, sin categoría) → `201`, default a `"otros"`.
  - `GET` → devuelve ambos ordenados por fecha/creación desc.
  - (El texto se guarda en UTF-8 correctamente; cualquier "Cafï¿½" visto era solo codificación de la consola.)

## ⚠️ Configuración de `.env.local` (corregida)
Los valores originales estaban cruzados:
- El campo URL tenía una **publishable key** → se movió a `NEXT_PUBLIC_SUPABASE_ANON_KEY` (es la correcta).
- El campo anon key tenía una **secret key** (`sb_secret_...`) → **se eliminó** por seguridad: una llave secreta NUNCA debe ir en una variable `NEXT_PUBLIC_*` (se expondría al navegador y bypassa RLS).
- El usuario aportó la **Project URL** (`https://utqjzujryolirtwmmjql.supabase.co`) → configurada.
- `supabase-schema.sql` ya ejecutado (las inserciones funcionaron).

## Estado actual
CRUD completo, compilando y **verificado end-to-end**. Listo para **Etapa 4 — Chat con IA**.

⏸️ **Esperando confirmación del usuario para continuar.**
