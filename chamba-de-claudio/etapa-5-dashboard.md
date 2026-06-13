# Etapa 5 — Dashboard y resumen ✅ (verificado con datos reales)

## Qué se hizo
Dashboard con métricas del mes, gráfica de barras por categoría y accesos rápidos.

## Archivos creados
- **`src/services/resumen.service.ts`** — `obtenerResumen()`:
  - Filtra los gastos del **mes en curso** (`fecha` empieza con `YYYY-MM` actual).
  - `totalMes`, `promedioDiario` (= total ÷ día del mes), `gastosPorCategoria` (con %), `categoriaTop`, `sugerenciaAhorro` (20% del gasto en categorías discrecionales: comida, entretenimiento, compras).
- **`src/app/api/resumen/route.ts`** — `GET` → resumen. `force-dynamic`.
- **`src/components/ResumenCards.tsx`** — 4 cards (Total este mes, Gasto diario promedio, Mayor gasto, Podrías ahorrar) con iconos de lucide y colores; grid `grid-cols-2 lg:grid-cols-4`. Montos en `font-mono`.
- **`src/components/CategoriaBarChart.tsx`** — barras con `width` porcentual (divs, sin librería), color sólido por categoría, monto y % por barra.

## Archivos modificados
- **`src/app/page.tsx`** (client) — Dashboard: saludo "¡Hola! Aquí está tu resumen 💰", `ResumenCards`, card con gráfica de barras, y 2 accesos rápidos (Registrar gasto / Hablar con tu coach) con `QuickLink`. Carga `/api/resumen` al montar con loading/error.
- **`src/lib/categorias.ts`** — añadido `categoriaBarColor` (colores sólidos `bg-X-500` para las barras).

## Decisiones tomadas
- **Promedio diario = total del mes ÷ día actual** (gasto promedio por día transcurrido del mes).
- **Categorías discrecionales** = comida, entretenimiento, compras (las esenciales como servicios/salud/educación/transporte no cuentan para la sugerencia de ahorro).
- **Gráfica sin librería** (divs con `width: %`) como pide el plan: más liviano y suficiente para el MVP.
- **Colores de categoría reutilizados** desde `lib/categorias.ts` (badges con `/10`, barras sólidas).

## Validación (datos reales)
- ✅ `npm run build` → compila. `/api/resumen` = `ƒ (Dynamic)`, `/` = 3 kB.
- ✅ `GET /api/resumen` con los 2 gastos de prueba (Café $85.50 comida, Uber $120 otros):
  - `totalMes`: **205.5** (85.5 + 120)
  - `promedioDiario`: **15.81** (205.5 ÷ 13)
  - `categoriaTop`: **otros**
  - `sugerenciaAhorro`: **17.1** (20% de $85.5 de comida; el Uber es "otros", no discrecional)
  - `gastosPorCategoria`: otros 58.4%, comida 41.6%

## Estado actual
Dashboard funcional con datos reales. Listo para **Etapa 6 — Polish y features IA** (clasificación automática, retos de ahorro, simulador de metas, ajustes visuales).

⏸️ **Esperando confirmación del usuario para continuar.**
