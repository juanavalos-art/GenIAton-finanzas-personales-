# Etapa 2 — Layout y shell de la app ✅

## Qué se hizo
Se construyó el layout global con sidebar de navegación (responsive) y las 3 páginas placeholder.

## Archivos creados
- **`src/lib/nav.ts`** — config compartida de navegación: `NAV_ITEMS` con Dashboard (`/`, LayoutDashboard), Gastos (`/gastos`, Receipt), Chat (`/chat`, MessageSquare). Tipo `NavItem`.
- **`src/components/Brand.tsx`** — logo "💰 CashCoach" reutilizable.
- **`src/components/SidebarNav.tsx`** (client) — lista de enlaces con resaltado del activo vía `usePathname()`. El activo usa `bg-emerald-500/10 text-emerald-500`. Acepta `onNavigate` para cerrar el menú mobile al hacer clic.
- **`src/components/Sidebar.tsx`** — sidebar fijo de escritorio (`w-60`, `border-r`, `hidden md:flex`).
- **`src/components/MobileHeader.tsx`** (client) — barra superior con menú hamburguesa (`Sheet` de shadcn, `side="left"`); visible solo en mobile (`md:hidden`).

## Archivos modificados
- **`src/app/layout.tsx`** — estructura `flex`: Sidebar (desktop) + columna con MobileHeader (mobile) y `<main>` con contenido centrado (`max-w-4xl mx-auto p-6`). `<html lang="es" className="dark">`.
- **`src/app/page.tsx`** — Dashboard placeholder (`<h1>Dashboard</h1>`).
- **`src/app/gastos/page.tsx`** — `<h1>Mis Gastos</h1>`.
- **`src/app/chat/page.tsx`** — `<h1>Chat con tu Coach</h1>`.

## Decisiones tomadas
- **Sidebar dividido en componentes pequeños** (Brand / SidebarNav / Sidebar / MobileHeader) para respetar "archivos cortos, una responsabilidad". `SidebarNav` se reutiliza en escritorio y dentro del Sheet mobile (sin duplicar la lógica de enlaces).
- **`SidebarNav` y `MobileHeader` son client components** (necesitan `usePathname` y estado del Sheet); el resto queda como server components.
- **Paleta emerald** para el estado activo, coherente con el skill de UI.
- Se incluyó un `SheetTitle` con `sr-only` para cumplir accesibilidad de Radix Dialog (evita el warning de título faltante).

## Validación
- ✅ `npm run build` → 7 páginas, rutas `/`, `/gastos`, `/chat` generadas, sin errores.
- ✅ Dev server: las 3 rutas responden **200**, cada una con su `<h1>` correcto y el sidebar "CashCoach" presente:
  - `/` → "Dashboard"
  - `/gastos` → "Mis Gastos"
  - `/chat` → "Chat con tu Coach"

## Estado actual
Shell de la app funcional y navegable. Listo para **Etapa 3 — CRUD de gastos**.

> ⚠️ Recordatorio: la Etapa 3 ya usa la BD. Antes de probarla necesitas haber ejecutado `supabase-schema.sql` y rellenado las credenciales de Supabase en `.env.local` (ver `etapa-1-database.md`).

⏸️ **Esperando confirmación del usuario para continuar.**
