import { obtenerGastos } from "@/providers/supabase.provider";
import { chatCompletion, LLMMessage } from "@/providers/deepseek.provider";
import { construirSystemPrompt } from "./coach.prompt";

// Genera UN reto de ahorro semanal con IA, basado en los gastos del usuario.
export async function obtenerRetoSemanal(): Promise<string> {
  const gastos = await obtenerGastos();

  const messages: LLMMessage[] = [
    { role: "system", content: construirSystemPrompt(gastos) },
    {
      role: "user",
      content:
        "Dame UN solo reto de ahorro para esta semana, concreto y alcanzable, basado en mis gastos. Máximo 2 frases. No saludes, ve directo al reto.",
    },
  ];

  return chatCompletion(messages);
}
