# CLAUDE.md — CashCoach MVP

## ¿Qué es este proyecto?
CashCoach es un coach financiero con IA para jóvenes. MVP para hackathon.
Los usuarios registran gastos, la IA los clasifica, analiza hábitos, detecta fugas de dinero, genera retos de ahorro y simula metas.

## Stack
- **Framework:** Next.js 14 (App Router, TypeScript)
- **UI:** shadcn/ui + Tailwind CSS + Lucide icons
- **Base de datos:** Supabase (PostgreSQL)
- **IA:** DeepSeek API (modelo: deepseek-chat)
- **Idioma UI:** Español
- **Auth:** Sin autenticación — usuario demo

## Arquitectura de capas
```
API Route (app/api/) → Service (services/) → Provider (providers/)
                              ↕
                        Domain (domain/types.ts)
```
- **API Routes:** Solo reciben request, llaman al service, devuelven response. Sin lógica.
- **Services:** Toda la lógica de negocio. Transformaciones, validaciones, orquestación.
- **Providers:** Solo conexión a servicios externos (Supabase, DeepSeek). Sin lógica de negocio.
- **Domain:** Tipos e interfaces TypeScript. Fuente de verdad de la estructura de datos.

## Convenciones de código
- KISS: código simple, sin sobreingeniería.
- Español en la UI y comentarios. Inglés en nombres de variables/funciones.
- Archivos cortos (~100 líneas max).
- Un archivo = una responsabilidad.
- Sin try/catch genéricos — mensajes de error claros.
- Componentes funcionales con hooks.

## Variables de entorno (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
DEEPSEEK_API_KEY=tu_key  # Si no existe, se usa mock
```

## Estructura de carpetas
```
src/
├── app/              # Páginas y API routes
├── domain/           # Tipos e interfaces
├── services/         # Lógica de negocio
├── providers/        # Conexiones externas
├── components/       # Componentes React
│   └── ui/           # shadcn components
└── lib/              # Utilidades
```

## Base de datos (Supabase)
- `gastos`: id, descripcion, monto, categoria, fecha, created_at
- `mensajes_chat`: id, rol, contenido, created_at

## Carpeta de progreso
`chamba-de-claudio/` contiene un MD por etapa con resumen de lo hecho.
Si hay errores o necesitas contexto, consulta estos archivos primero.

## Etapas del plan
0. Setup del proyecto
1. Base de datos y tipos
2. Layout y shell de la app
3. CRUD de gastos
4. Chat con IA
5. Dashboard y resumen
6. Polish y features IA

**IMPORTANTE:** Al terminar cada etapa, generar resumen en `chamba-de-claudio/` y ESPERAR confirmación del usuario antes de continuar.

## System prompt del coach financiero
La IA actúa como un coach financiero amigable para jóvenes. Debe:
- Hablar en español, tono casual pero informativo
- Analizar los gastos del usuario cuando tenga contexto
- Detectar patrones de gasto y "fugas de dinero"
- Sugerir retos de ahorro concretos y alcanzables
- Simular metas ("si ahorras $X al mes, en Y meses...")
- Nunca dar consejos de inversión específicos
- Ser motivador, no regañón
