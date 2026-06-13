---
name: cashcoach-ui-pattern
description: Identidad visual y patrones de componentes para CashCoach. Usa este skill SIEMPRE que crees o modifiques un componente de UI, una página, o cualquier elemento visual. Aplica para formularios, listas, cards, páginas completas, estados vacíos, y cualquier interfaz de usuario. Garantiza consistencia visual y de UX en todo el proyecto.
---

# Identidad Visual — CashCoach

## Concepto
Coach financiero para jóvenes. El tono es: **amigable, motivador, moderno, no corporativo.**
Como un amigo que sabe de dinero y te ayuda sin juzgarte.

## Paleta de colores (Tailwind)

Usa las clases de Tailwind directamente. La paleta principal es **emerald** (verde esmeralda):

- **Primario:** `emerald-500` (botones, acentos, links activos)
- **Primario hover:** `emerald-600`
- **Fondo principal:** `background` (CSS var de shadcn, respeta dark mode)
- **Cards:** `card` (CSS var de shadcn)
- **Texto principal:** `foreground`
- **Texto secundario:** `muted-foreground`
- **Éxito/positivo:** `green-500` (para ahorros, metas cumplidas)
- **Alerta/negativo:** `red-400` (para gastos altos, alertas suaves)
- **Categorías:** cada categoría tiene un color de badge distinto:
  - comida → `orange-500`
  - transporte → `blue-500`
  - entretenimiento → `purple-500`
  - servicios → `slate-500`
  - compras → `pink-500`
  - salud → `emerald-500`
  - educacion → `cyan-500`
  - otros → `gray-500`

## Tipografía
- Usa la fuente por defecto de shadcn (Inter/system)
- Títulos de página: `text-2xl font-bold`
- Subtítulos: `text-lg font-semibold`
- Body: `text-sm` o `text-base`
- Montos de dinero: `font-mono font-bold` (para que los números se alineen)

## Componentes comunes

### Cards de resumen
```tsx
<Card className="p-4">
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-emerald-500/10">
      <Icon className="h-5 w-5 text-emerald-500" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">Etiqueta</p>
      <p className="text-xl font-bold font-mono">$1,250.00</p>
    </div>
  </div>
</Card>
```

### Badge de categoría
```tsx
// Usa un helper para el color según la categoría
function categoriaBadgeColor(cat: CategoriaGasto): string {
  const colores: Record<CategoriaGasto, string> = {
    comida: 'bg-orange-500/10 text-orange-500',
    transporte: 'bg-blue-500/10 text-blue-500',
    entretenimiento: 'bg-purple-500/10 text-purple-500',
    servicios: 'bg-slate-500/10 text-slate-500',
    compras: 'bg-pink-500/10 text-pink-500',
    salud: 'bg-emerald-500/10 text-emerald-500',
    educacion: 'bg-cyan-500/10 text-cyan-500',
    otros: 'bg-gray-500/10 text-gray-500',
  };
  return colores[cat];
}

<Badge className={categoriaBadgeColor(gasto.categoria)}>
  {gasto.categoria}
</Badge>
```

### Estado vacío
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <Icon className="h-12 w-12 text-muted-foreground/50 mb-4" />
  <p className="text-muted-foreground">Mensaje descriptivo</p>
  <Button variant="outline" className="mt-4">Acción sugerida</Button>
</div>
```

### Formato de montos
```tsx
function formatMonto(monto: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(monto);
}
```

## Layout
- Sidebar fijo a la izquierda (240px) con nav items
- Contenido principal con `max-w-4xl mx-auto p-6`
- Mobile: sidebar se convierte en Sheet (hamburguesa)
- Grid de cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`

## Emojis permitidos (úsalos con moderación)
- 💰 Dashboard / dinero general
- 📊 Resumen / estadísticas
- 🎯 Metas
- 🔥 Retos de ahorro
- ⚡ Tips rápidos
- 💬 Chat

## Reglas de UX
- Botones de acción principal siempre `variant="default"` (fondo emerald)
- Botones secundarios `variant="outline"`
- Inputs siempre con placeholder descriptivo
- Loading states: usa el skeleton de shadcn o un spinner simple
- Nunca bloquear la UI — siempre feedback visual de que algo está pasando
- Los montos SIEMPRE con formato de moneda mexicana
