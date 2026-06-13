import { MensajeChat } from "@/domain/types";
import { chatCompletion, LLMMessage } from "@/providers/deepseek.provider";
import {
  crearMensaje,
  obtenerMensajes,
  obtenerGastos,
} from "@/providers/supabase.provider";
import { construirSystemPrompt } from "./coach.prompt";

// Cuántos mensajes de historial enviar como contexto a la IA.
const MAX_HISTORIAL = 20;

// Envía un mensaje del usuario: lo guarda, arma el contexto financiero,
// llama a la IA y guarda la respuesta del coach.
export async function enviarMensaje(contenido: string): Promise<MensajeChat> {
  const texto = contenido?.trim();
  if (!texto) throw new Error("El mensaje no puede estar vacío");

  // 1. Guardar el mensaje del usuario.
  await crearMensaje({ rol: "user", contenido: texto });

  // 2. Construir contexto: gastos + historial reciente.
  const [gastos, historial] = await Promise.all([
    obtenerGastos(),
    obtenerMensajes(),
  ]);

  const messages: LLMMessage[] = [
    { role: "system", content: construirSystemPrompt(gastos) },
    ...historial
      .slice(-MAX_HISTORIAL)
      .map((m) => ({ role: m.rol, content: m.contenido })),
  ];

  // 3. Llamar a la IA.
  const respuesta = await chatCompletion(messages);

  // 4. Guardar la respuesta del coach.
  return crearMensaje({ rol: "assistant", contenido: respuesta });
}

// Devuelve el historial de mensajes ordenado (asc por fecha).
export async function obtenerHistorial(): Promise<MensajeChat[]> {
  return obtenerMensajes();
}
