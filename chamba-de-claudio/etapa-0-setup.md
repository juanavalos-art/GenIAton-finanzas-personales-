# Etapa 0 — Setup del proyecto ✅

## Qué se hizo
Se inicializó el proyecto Next.js 14 (App Router + TypeScript) **en la raíz de esta carpeta**
(no en una subcarpeta `cashcoach/` como decía el comando original — la raíz del repo ES el proyecto).

## Pasos ejecutados
1. **Scaffold Next.js 14** con `create-next-app@14`: TypeScript, Tailwind CSS, ESLint, App Router, carpeta `src/`, alias `@/*`.
   - Como el nombre de la carpeta tiene mayúsculas (npm no las permite), se generó en un directorio temporal y se movió el contenido a la raíz.
2. **Dependencias instaladas:** `@supabase/supabase-js`, `lucide-react`.
3. **shadcn/ui inicializado** con la CLI fijada a `shadcn@2.3.0` (compatible con Tailwind v3 + Radix).
   - Nota: `shadcn@latest` (v4) instala un setup de **Tailwind v4 + Base UI** incompatible con Next 14 / Tailwind 3.4. Se descartó y se usó la versión clásica.
4. **Componentes shadcn agregados:** `button`, `card`, `input`, `badge`, `scroll-area`, `avatar`, `separator`, `sheet`, `select`, `label`.
5. **Tema oscuro + paleta emerald:**
   - `globals.css` reescrito con variables HSL (formato `H S% L%`) que coinciden con `tailwind.config.ts` (`hsl(var(--x))`).
   - `--primary` y `--ring` ajustados a emerald-500 (`160 84% 39%`).
   - `layout.tsx` con `<html lang="es" className="dark">`.
6. **`.env.local`** creado con variables vacías (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DEEPSEEK_API_KEY`). También `.env.example`.
7. **Estructura de carpetas** creada: `src/domain/`, `src/services/`, `src/providers/` (con `.gitkeep`). `src/components/ui/` y `src/lib/` ya existen.
8. **`chamba-de-claudio/`** creada (esta carpeta).

## Archivos creados/modificados clave
- `package.json` — name `cashcoach`, deps añadidas.
- `tailwind.config.ts` — tema shadcn (darkMode class, colores HSL, `tailwindcss-animate`).
- `src/app/globals.css` — tema HSL oscuro + emerald.
- `src/app/layout.tsx` — locale `es`, dark mode, metadata CashCoach.
- `src/app/page.tsx` — placeholder simple con `<Button>` (se reemplaza en Etapa 5).
- `components.json`, `src/lib/utils.ts` — config shadcn.

## Validación
- ✅ `npm run build` → "Compiled successfully", 5 rutas estáticas, sin errores de tipos.
- ✅ `npm run dev` → "Ready in 4.3s" en http://localhost:3000.

## Decisiones tomadas
- **Raíz = proyecto** (instrucción explícita del usuario).
- **shadcn fijado a v2.3.0** por compatibilidad con el stack Next 14 / Tailwind 3.4 / React 18.
- **Paleta:** base zinc oscuro + primary emerald, según el skill de UI.

## Posibles problemas / pendientes
- Las carpetas `domain/`, `services/`, `providers/` están vacías (solo `.gitkeep`) — se llenan en Etapa 1+.
- `.env.local` tiene valores vacíos: hay que rellenar Supabase antes de la Etapa 3, y DeepSeek (opcional) antes de la Etapa 4.

## Estado actual
Setup funcional y compilando. Listo para **Etapa 1 — Base de datos y tipos**.

⏸️ **Esperando confirmación del usuario para continuar.**
