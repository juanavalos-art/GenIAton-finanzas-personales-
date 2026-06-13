# Etapa 4 — Chat con IA ✅ (verificado end-to-end con DeepSeek real)

## Qué se hizo
Chat funcional con el coach financiero: provider de DeepSeek (real + mock), service que
arma el contexto financiero, API route, y la interfaz de chat completa.

## Archivos creados
- **`src/providers/deepseek.provider.ts`** — SOLO conexión a la IA:
  - `chatCompletion(messages: LLMMessage[])`: si hay `DEEPSEEK_API_KEY` → POST real a `https://api.deepseek.com/chat/completions` (modelo `deepseek-chat`); si no → `mockCompletion`.
  - Mock con respuestas por keywords (café/starbucks, uber/transporte, ahorro/meta, gasto/presupuesto, default).
  - Tipo `LLMMessage` (`system | user | assistant`).
- **`src/services/coach.prompt.ts`** — `construirSystemPrompt(gastos)`: persona del coach (según CLAUDE.md) + bloque de contexto con total, gasto por categoría y los 15 gastos más recientes.
- **`src/services/chat.service.ts`**:
  - `enviarMensaje(contenido)`: valida → guarda mensaje user → arma `[system, ...historial(<=20)]` con gastos como contexto → llama a la IA → guarda y devuelve la respuesta del coach.
  - `obtenerHistorial()`: delega en el provider.
- **`src/app/api/chat/route.ts`** — `GET` (historial) y `POST` (`{mensaje}` → respuesta). `force-dynamic`.
- **`src/components/ChatBubble.tsx`** — burbuja por rol (user emerald a la derecha / assistant muted a la izquierda), avatar con icono (User/Bot) y hora.

## Archivos modificados
- **`src/app/chat/page.tsx`** (client) — ScrollArea con historial, input sticky abajo, botón enviar, loading ("Escribiendo…"), estado vacío, carga de historial al montar, auto-scroll, y UI optimista (agrega el mensaje del usuario al instante).
- **`src/lib/format.ts`** — añadido `formatHora` (HH:mm).
- **`tsconfig.json`** — añadido `"target": "ES2017"`.
  - *Por qué:* sin `target`, tsc usaba un target antiguo que no permite hacer spread de un iterador de `Map` (`[...map.entries()]`) sin `downlevelIteration`. ES2017 es lo que `create-next-app` configura por defecto.

## Decisiones tomadas
- **System prompt separado en `coach.prompt.ts`** para mantener `chat.service.ts` corto y enfocado en orquestación.
- **Historial limitado a 20 mensajes** como contexto, para no inflar el payload/tokens.
- **`GET` en la misma ruta `/api/chat`** para cargar el historial (el plan solo pedía POST, pero la página necesita el historial al montar).
- **UI optimista** con id temporal (`temp-...`) para feedback inmediato; la respuesta del coach se agrega al recibir el POST.

## Validación (end-to-end con API real)
- ✅ `npm run build` → compila. `/api/chat` = `ƒ (Dynamic)`, `/chat` = página de 7.4 kB.
- ✅ `POST /api/chat` "Siento que gasto mucho en café, ¿cómo puedo ahorrar?" → **200**. La IA **citó el gasto real** ($85.50 en Starbucks de la BD), lo identificó como gasto hormiga, propuso un reto concreto y simuló una meta (1 mes ≈ $342, 3 meses ≈ $1,026). Tono casual y motivador, en español.
- ✅ `GET /api/chat` → 2 mensajes persistidos (user + assistant).
- (Cualquier garabato de acentos visto en consola es solo codificación de PowerShell; el contenido se guarda/renderiza en UTF-8.)

## Estado actual
Chat con IA funcional, con contexto financiero real y persistencia. Listo para **Etapa 5 — Dashboard y resumen**.

> Nota: la tabla `mensajes_chat` ya tiene 2 mensajes de prueba. Si quieres empezar limpio, bórralos desde el Table Editor de Supabase.

⏸️ **Esperando confirmación del usuario para continuar.**
