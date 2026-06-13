# Comandos para Claude Code — Etapa por Etapa

> Este archivo contiene los prompts exactos que puedes copiar y pegar en Claude Code.
> Cada etapa termina con "ESPERA MI CONFIRMACIÓN". Claude no debe avanzar solo.

---

## Antes de empezar

Asegúrate de tener:
- [x] Node.js 18+ instalado
- [x] Supabase URL y anon key listos
- [ ] DeepSeek API key (opcional — el plan incluye mock)

---

## ETAPA 0 — Setup

```
Lee el archivo CLAUDE.md en la raíz del proyecto. Ese es tu fuente de verdad.

Haz lo siguiente:
1. Crea un proyecto Next.js 14 con App Router y TypeScript en la carpeta "cashcoach"
2. Instala las dependencias: @supabase/supabase-js, lucide-react
3. Inicializa shadcn/ui con el estilo "new-york" y tema oscuro
4. Instala estos componentes de shadcn: button, card, input, badge, scroll-area, avatar, separator, sheet
5. Crea el archivo .env.local con las variables de entorno vacías (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, DEEPSEEK_API_KEY)
6. Crea la estructura de carpetas según CLAUDE.md: domain/, services/, providers/, components/
7. Crea la carpeta "chamba-de-claudio/" en la raíz
8. Verifica que npm run dev compile sin errores

Al terminar, genera un archivo "chamba-de-claudio/etapa-0-setup.md" con el resumen de lo que hiciste.

ESPERA MI CONFIRMACIÓN antes de continuar a la siguiente etapa.
```

---

## ETAPA 1 — Base de datos y tipos

```
Lee CLAUDE.md y chamba-de-claudio/etapa-0-setup.md para tener contexto.

Haz lo siguiente:
1. Crea el archivo domain/types.ts con las interfaces: Gasto, MensajeChat, ResumenFinanciero, CategoriaGasto (type union con las categorías: 'comida', 'transporte', 'entretenimiento', 'servicios', 'compras', 'salud', 'educacion', 'otros')
2. Crea providers/supabase.provider.ts que exporte el cliente de Supabase y funciones tipadas para: crearGasto, obtenerGastos, crearMensaje, obtenerMensajes
3. Genera un archivo SQL (supabase-schema.sql en la raíz) con los CREATE TABLE para gastos y mensajes_chat. Incluye RLS deshabilitado (es un demo)
4. Verifica que todo compile sin errores

Al terminar, genera "chamba-de-claudio/etapa-1-database.md" con el resumen.

ESPERA MI CONFIRMACIÓN antes de continuar. Necesito ejecutar el SQL en Supabase manualmente.
```

---

## ETAPA 2 — Layout y shell

```
Lee CLAUDE.md y los archivos en chamba-de-claudio/ para tener contexto.

Haz lo siguiente:
1. Crea el layout global (app/layout.tsx) con:
   - Sidebar izquierdo con navegación: Dashboard, Gastos, Chat
   - Usa lucide-react para los iconos (LayoutDashboard, Receipt, MessageSquare)
   - Responsive: en mobile usa un Sheet de shadcn como menú hamburguesa
   - Paleta de colores: tonos de verde/esmeralda (financiero pero joven, no corporativo)
   - Título "CashCoach" con emoji 💰 en el sidebar

2. Crea las 3 páginas placeholder:
   - app/page.tsx (Dashboard) — solo un h1 "Dashboard" por ahora
   - app/gastos/page.tsx — solo un h1 "Mis Gastos" por ahora  
   - app/chat/page.tsx — solo un h1 "Chat con tu Coach" por ahora

3. Verifica que la navegación funciona entre las 3 páginas

Al terminar, genera "chamba-de-claudio/etapa-2-layout.md" con el resumen.

ESPERA MI CONFIRMACIÓN antes de continuar.
```

---

## ETAPA 3 — CRUD de gastos

```
Lee CLAUDE.md y los archivos en chamba-de-claudio/ para tener contexto.

Haz lo siguiente:
1. Crea services/gastos.service.ts con funciones:
   - registrarGasto(descripcion, monto, categoria?) — llama al provider
   - obtenerTodosLosGastos() — llama al provider, ordena por fecha desc
   
2. Crea app/api/gastos/route.ts:
   - GET: devuelve todos los gastos
   - POST: recibe {descripcion, monto, categoria?}, llama al service, devuelve el gasto creado

3. Crea components/GastoForm.tsx:
   - Input para descripción
   - Input numérico para monto (con $ prefix)
   - Select opcional para categoría (usa las del type CategoriaGasto)
   - Botón "Registrar Gasto"
   - Usa componentes de shadcn

4. Crea components/GastoList.tsx:
   - Lista de gastos con: descripción, monto formateado, categoría como badge, fecha
   - Usa Card de shadcn para cada gasto
   - Muestra "Sin gastos aún" si la lista está vacía

5. Actualiza app/gastos/page.tsx para usar GastoForm y GastoList
   - Usa useState y useEffect para manejar el estado
   - Después de registrar un gasto, actualiza la lista

6. Verifica que puedes crear un gasto y verlo en la lista

Al terminar, genera "chamba-de-claudio/etapa-3-gastos.md" con el resumen.

ESPERA MI CONFIRMACIÓN antes de continuar.
```

---

## ETAPA 4 — Chat con IA

```
Lee CLAUDE.md y los archivos en chamba-de-claudio/ para tener contexto.

Haz lo siguiente:

1. Crea providers/deepseek.provider.ts:
   - Si DEEPSEEK_API_KEY existe en env, usa la API real de DeepSeek (POST a https://api.deepseek.com/chat/completions, modelo "deepseek-chat")
   - Si NO existe, usa un mock que devuelva respuestas predefinidas inteligentes basadas en keywords del mensaje (si menciona "starbucks" o "café", responde sobre gasto en café, etc.)
   - La función recibe: messages[] (array de {role, content}) y devuelve el string de respuesta

2. Crea services/chat.service.ts:
   - enviarMensaje(contenido: string) — obtiene los gastos recientes del usuario, arma el system prompt con contexto financiero, llama al provider, guarda ambos mensajes en Supabase
   - obtenerHistorial() — devuelve mensajes ordenados
   - El system prompt debe incluir: los gastos del usuario como contexto, las instrucciones del coach financiero (ver CLAUDE.md)

3. Crea app/api/chat/route.ts:
   - POST: recibe {mensaje}, llama al service, devuelve la respuesta

4. Crea components/ChatBubble.tsx:
   - Burbuja de mensaje diferenciada por rol (user vs assistant)
   - Avatar distinto para cada rol
   - Timestamp

5. Actualiza app/chat/page.tsx:
   - Input de mensaje abajo (sticky)
   - ScrollArea con historial de mensajes
   - Loading state mientras la IA responde
   - Carga historial al montar

6. Verifica que el chat funciona (con mock o API real)

Al terminar, genera "chamba-de-claudio/etapa-4-chat.md" con el resumen.

ESPERA MI CONFIRMACIÓN antes de continuar.
```

---

## ETAPA 5 — Dashboard

```
Lee CLAUDE.md y los archivos en chamba-de-claudio/ para tener contexto.

Haz lo siguiente:

1. Crea services/resumen.service.ts:
   - obtenerResumen() — calcula: total gastado este mes, gasto por categoría, promedio diario, categoría con más gasto, sugerencia de ahorro (20% del gasto en categorías discrecionales)

2. Crea app/api/resumen/route.ts:
   - GET: llama al service, devuelve el resumen

3. Crea components/ResumenCards.tsx:
   - Card "Total este mes" con el monto grande
   - Card "Gasto diario promedio"  
   - Card "Mayor gasto" con la categoría top
   - Card "Podrías ahorrar" con la sugerencia
   - Usa iconos de lucide-react apropiados
   - Grid responsive (2 cols en mobile, 4 en desktop)

4. Crea un componente simple de barras por categoría (puede ser divs con width porcentual, no necesitas librería de charts)

5. Actualiza app/page.tsx (Dashboard):
   - Saludo "¡Hola! Aquí está tu resumen 💰"
   - ResumenCards
   - Gráfica de barras por categoría
   - Link rápido a "Registrar gasto" y "Hablar con tu coach"

6. Verifica que el dashboard muestra datos reales

Al terminar, genera "chamba-de-claudio/etapa-5-dashboard.md" con el resumen.

ESPERA MI CONFIRMACIÓN antes de continuar.
```

---

## ETAPA 6 — Polish y features IA

```
Lee CLAUDE.md y los archivos en chamba-de-claudio/ para tener contexto.

Haz lo siguiente:

1. Clasificación automática:
   - En gastos.service.ts, antes de guardar un gasto sin categoría, llama al provider de DeepSeek con un prompt corto: "Clasifica este gasto en una categoría: [descripción]. Responde solo con la categoría."
   - Las categorías válidas son las del type CategoriaGasto

2. Mejora el system prompt del chat:
   - Agrega capacidad de generar "retos de ahorro" ("Esta semana intenta no gastar más de $X en [categoría]")
   - Agrega simulación de metas ("Si ahorras $X al mes, en Y meses tendrás $Z")

3. Agrega en el Dashboard una sección "Reto de la semana" que se genera con IA basado en los gastos actuales

4. Ajustes visuales finales:
   - Revisa spacing, colores, que todo se vea coherente
   - Agrega estados vacíos bonitos (cuando no hay gastos, cuando no hay chat)
   - Revisa responsive en mobile

5. Genera "chamba-de-claudio/etapa-6-polish.md" con el resumen FINAL del proyecto completo.

El MVP está terminado. 🎉
```

---

## En caso de errores

Si Claude Code encuentra un error en cualquier etapa:

```
Hubo un error. Antes de intentar arreglarlo:
1. Lee CLAUDE.md para recordar las convenciones del proyecto
2. Lee TODOS los archivos en chamba-de-claudio/ para entender qué se ha hecho hasta ahora
3. Identifica en qué etapa estamos y qué falta
4. Arregla el error manteniendo las convenciones
5. Continúa con la etapa actual
```
