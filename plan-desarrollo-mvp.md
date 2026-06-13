# Plan de Desarrollo MVP — Coach Financiero IA

## Resumen del Proyecto

**Nombre:** CashCoach — Coach financiero para jóvenes
**Stack:** Next.js 14 (App Router) + Supabase + shadcn/ui + DeepSeek API
**Tiempo total estimado:** ~90 minutos (buffer de 30 min)
**Idioma UI:** Español
**Auth:** Sin autenticación — usuario demo hardcodeado

---

## Arquitectura General

```
src/
├── app/                    # Next.js App Router (páginas y API routes)
│   ├── page.tsx            # Landing / Dashboard
│   ├── chat/page.tsx       # Chat con IA
│   ├── gastos/page.tsx     # Registro y lista de gastos
│   ├── layout.tsx          # Layout global
│   └── api/
│       ├── chat/route.ts        # POST — envía mensaje a DeepSeek
│       ├── gastos/route.ts      # GET/POST — CRUD gastos
│       └── resumen/route.ts     # GET — resumen financiero
├── domain/                 # Tipos e interfaces del negocio
│   └── types.ts
├── services/               # Lógica de negocio
│   ├── gastos.service.ts
│   ├── chat.service.ts
│   └── resumen.service.ts
├── providers/              # Conexiones externas
│   ├── supabase.provider.ts
│   └── deepseek.provider.ts
├── components/             # Componentes UI reutilizables
│   ├── ui/                 # shadcn components
│   ├── ChatBubble.tsx
│   ├── GastoForm.tsx
│   ├── GastoList.tsx
│   └── ResumenCards.tsx
└── lib/                    # Utilidades
    └── utils.ts
```

**Patrón de capas:**
```
API Route → Service → Provider (Supabase / DeepSeek)
                ↕
             Domain (types)
```

---

## Esquema de Base de Datos (Supabase)

### Tabla: `gastos`
| Columna     | Tipo        | Notas                              |
|-------------|-------------|-------------------------------------|
| id          | uuid (PK)   | gen_random_uuid()                  |
| descripcion | text         | "Starbucks", "Uber", etc.          |
| monto       | numeric      | En pesos                           |
| categoria   | text         | Clasificada por IA o manual        |
| fecha       | date         | Default: today                     |
| created_at  | timestamptz  | Default: now()                     |

### Tabla: `mensajes_chat`
| Columna    | Tipo        | Notas                              |
|------------|-------------|-------------------------------------|
| id         | uuid (PK)   | gen_random_uuid()                  |
| rol        | text         | 'user' o 'assistant'              |
| contenido  | text         | Mensaje                            |
| created_at | timestamptz  | Default: now()                     |

> No se necesita tabla de usuarios — es un MVP con usuario demo.

---

## Etapas de Desarrollo

### ETAPA 0 — Setup del proyecto (~8 min)
**Qué hace:**
- Crear proyecto Next.js con TypeScript
- Instalar dependencias: shadcn/ui, supabase-js, lucide-react
- Configurar shadcn/ui (tema oscuro, español)
- Crear archivo `.env.local` con variables de Supabase y DeepSeek
- Crear `CLAUDE.md` en la raíz del proyecto
- Crear carpeta `chamba-de-claudio/`
- Crear archivo de resumen de etapa 0

**Validación:** `npm run dev` compila sin errores, shadcn funciona.

**⏸️ ESPERAR confirmación para continuar.**

---

### ETAPA 1 — Base de datos y tipos (~7 min)
**Qué hace:**
- Generar SQL para crear tablas en Supabase (el usuario lo ejecuta manualmente)
- Crear `domain/types.ts` con interfaces TypeScript
- Crear `providers/supabase.provider.ts` con el cliente configurado
- Crear archivo de resumen de etapa 1

**Validación:** Tipos compilan, provider se importa sin errores.

**⏸️ ESPERAR confirmación para continuar.**

---

### ETAPA 2 — Layout y shell de la app (~10 min)
**Qué hace:**
- Layout global con sidebar/nav (shadcn)
- 3 rutas: Dashboard `/`, Gastos `/gastos`, Chat `/chat`
- Tema visual coherente (paleta para finanzas jóvenes)
- Componentes base de shadcn instalados (Button, Card, Input, etc.)
- Crear archivo de resumen de etapa 2

**Validación:** Las 3 páginas navegan correctamente, el layout se ve bien.

**⏸️ ESPERAR confirmación para continuar.**

---

### ETAPA 3 — CRUD de gastos (~15 min)
**Qué hace:**
- `providers/supabase.provider.ts` — funciones de gastos (create, getAll)
- `services/gastos.service.ts` — lógica de negocio
- `app/api/gastos/route.ts` — API GET y POST
- `components/GastoForm.tsx` — formulario para registrar gasto
- `components/GastoList.tsx` — lista de gastos con categoría y monto
- `app/gastos/page.tsx` — página completa
- Crear archivo de resumen de etapa 3

**Validación:** Se puede crear un gasto y verlo en la lista.

**⏸️ ESPERAR confirmación para continuar.**

---

### ETAPA 4 — Chat con IA (~20 min)
**Qué hace:**
- `providers/deepseek.provider.ts` — llamada a DeepSeek API (o mock)
- `services/chat.service.ts` — arma el prompt con contexto financiero
- `app/api/chat/route.ts` — API POST para chat
- `components/ChatBubble.tsx` — burbuja de mensaje
- `app/chat/page.tsx` — interfaz de chat completa
- System prompt del coach financiero (analiza hábitos, detecta fugas, propone retos)
- Crear archivo de resumen de etapa 4

**Validación:** Se puede chatear, la IA responde con contexto financiero.

**⏸️ ESPERAR confirmación para continuar.**

---

### ETAPA 5 — Dashboard y resumen (~15 min)
**Qué hace:**
- `services/resumen.service.ts` — calcula totales, por categoría, sugerencias
- `app/api/resumen/route.ts` — API GET
- `components/ResumenCards.tsx` — cards con total gastado, por categoría, meta de ahorro
- `app/page.tsx` — dashboard con las cards y un mini chart
- Crear archivo de resumen de etapa 5

**Validación:** Dashboard muestra datos reales de los gastos registrados.

**⏸️ ESPERAR confirmación para continuar.**

---

### ETAPA 6 — Polish y features IA (~15 min)
**Qué hace:**
- Clasificación automática de gastos por IA al registrar
- Reto de ahorro semanal generado por IA
- Simulador de metas (¿cuánto necesitas ahorrar para X?)
- Ajustes visuales finales
- Crear archivo de resumen FINAL de etapa 6

**Validación:** Flujo completo funciona de inicio a fin.

**⏸️ FIN DEL MVP.**

---

## Nota sobre DeepSeek

Si no se tiene API key de DeepSeek al iniciar, se usa un **mock provider** que devuelve respuestas predefinidas inteligentes. El mock se puede reemplazar con solo cambiar la importación en el service.

Para obtener la API key: https://platform.deepseek.com → registrarse → API Keys → crear una.
Variable de entorno: `DEEPSEEK_API_KEY`

---

## Convenciones de Código

- **KISS:** Código simple, sin abstracciones innecesarias.
- **Español en UI**, inglés en código (nombres de variables, funciones).
- **Archivos cortos:** Máximo ~100 líneas por archivo.
- **Un archivo = una responsabilidad.**
- **Sin try/catch genéricos** — errores con mensaje claro.
- **Comentarios solo cuando el "por qué" no es obvio.**

---

## Carpeta "chamba-de-claudio"

Después de cada etapa, se genera un archivo:
```
chamba-de-claudio/
├── etapa-0-setup.md
├── etapa-1-database.md
├── etapa-2-layout.md
├── etapa-3-gastos.md
├── etapa-4-chat.md
├── etapa-5-dashboard.md
└── etapa-6-polish.md
```

Cada archivo contiene:
- Qué se hizo
- Archivos creados/modificados
- Decisiones tomadas
- Estado actual del proyecto
- Posibles problemas encontrados

Si Claude encuentra un error, consulta estos archivos para retomar contexto.
