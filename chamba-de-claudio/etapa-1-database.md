# Etapa 1 — Base de datos y tipos ✅

## Qué se hizo
Se definió la fuente de verdad de los datos (tipos del dominio), el provider de Supabase
(capa de conexión externa) y el script SQL para crear las tablas.

## Archivos creados
1. **`src/domain/types.ts`** — tipos e interfaces del negocio:
   - `CategoriaGasto` (union: `comida | transporte | entretenimiento | servicios | compras | salud | educacion | otros`)
   - `CATEGORIAS` — array con todas las categorías (para selects y validaciones)
   - `Gasto` — `{ id, descripcion, monto, categoria, fecha, created_at }`
   - `GastoInput` — payload para crear (con `fecha?` opcional → default hoy en la BD)
   - `RolMensaje` (`user | assistant`), `MensajeChat`, `MensajeInput`
   - `GastoPorCategoria`, `ResumenFinanciero` (para la Etapa 5)

2. **`src/providers/supabase.provider.ts`** — SOLO conexión a Supabase, sin lógica de negocio:
   - `export const supabase` — cliente configurado desde env vars (lanza error claro en español si faltan)
   - `crearGasto(gasto: GastoInput): Promise<Gasto>`
   - `obtenerGastos(): Promise<Gasto[]>` — ordenado por `fecha desc, created_at desc`
   - `crearMensaje(mensaje: MensajeInput): Promise<MensajeChat>`
   - `obtenerMensajes(): Promise<MensajeChat[]>` — ordenado por `created_at asc`
   - Cada función propaga el error de Supabase con un mensaje claro.

3. **`supabase-schema.sql`** (en la raíz) — `CREATE TABLE` para `gastos` y `mensajes_chat`:
   - `gastos`: id uuid PK (`gen_random_uuid()`), descripcion, monto `numeric(12,2)`, categoria text default `'otros'`, fecha date default `current_date`, created_at timestamptz default `now()`
   - `mensajes_chat`: id uuid PK, rol text con `check (rol in ('user','assistant'))`, contenido, created_at
   - Índices para ordenar por fecha / created_at
   - **RLS deshabilitado** en ambas tablas (demo sin auth)
   - Incluye instrucciones de uso paso a paso en comentarios

## Decisiones tomadas
- **`categoria` como text libre con default `'otros'`** (sin `CHECK` rígido): así la clasificación por IA de la Etapa 6 nunca falla por una categoría inesperada; el service la normalizará.
- **Ordenamiento en la query del provider** (no en JS): es acceso a datos, no lógica de negocio; más eficiente.
- **El cliente lanza error claro si faltan las env vars** en lugar de fallar con un mensaje críptico de Supabase.
- Se añadieron tipos `GastoInput` / `MensajeInput` para tipar los inserts sin exponer `id`/`created_at`.

## Validación
- ✅ `npx tsc --noEmit` → sin errores de tipos.
- ✅ `npm run build` → compila correctamente (el provider aún no se importa en ninguna ruta, así que el throw por env vacías no afecta el build).

## ⚠️ ACCIÓN MANUAL REQUERIDA antes de la Etapa 3
1. Ejecutar **`supabase-schema.sql`** en el SQL Editor de tu proyecto Supabase.
2. Rellenar en **`.env.local`**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (Settings → API en el dashboard de Supabase.)

> Sin esto, las páginas de gastos/chat fallarán al llamar a la BD (mostrarán el error claro del provider).

## Estado actual
Tipos y provider listos y compilando. Listo para **Etapa 2 — Layout y shell de la app**.

⏸️ **Esperando confirmación del usuario para continuar.** (Necesitas ejecutar el SQL en Supabase manualmente.)
