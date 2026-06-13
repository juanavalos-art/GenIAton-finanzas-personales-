// Provider de DeepSeek — SOLO conexión a la IA. Sin lógica de negocio.
// Si hay DEEPSEEK_API_KEY usa la API real; si no, un mock con respuestas por keywords.

export type LLMMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const API_URL = "https://api.deepseek.com/chat/completions";

export async function chatCompletion(messages: LLMMessage[]): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return mockCompletion(messages);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const detalle = await res.text();
    throw new Error(`Error de DeepSeek (${res.status}): ${detalle}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("DeepSeek no devolvió una respuesta.");
  return content as string;
}

// Mock: respuestas predefinidas según palabras clave del último mensaje del usuario.
function mockCompletion(messages: LLMMessage[]): string {
  const ultimo = [...messages].reverse().find((m) => m.role === "user");
  const texto = (ultimo?.content ?? "").toLowerCase();

  if (/(café|cafe|starbucks)/.test(texto)) {
    return "¡Ojo con el café! ☕ Es uno de esos gastos pequeños que suman un montón al mes. Si gastas $85 en café 5 días a la semana, son ~$1,700 al mes. Reto: prepáralo en casa 2 días por semana y ahorra ~$680. 💪";
  }
  if (/(uber|taxi|transporte|gasolina)/.test(texto)) {
    return "El transporte se come una buena parte del presupuesto. 🚗 Revisa si puedes combinar viajes o usar transporte público algunos días. Aunque sea 2 viajes menos por semana, el ahorro se nota a fin de mes.";
  }
  if (/(ahorr|guardar|meta)/.test(texto)) {
    return "¡Me encanta que pienses en ahorrar! 🎯 Una regla simple: aparta el 10% de lo que gastas en cosas no esenciales apenas recibas dinero. Cuéntame tu meta (¿cuánto y para cuándo?) y te armo un plan mes a mes.";
  }
  if (/(gast|dinero|presupuesto)/.test(texto)) {
    return "Vamos a revisar tus gastos juntos. 📊 Registra todo durante una semana y detectamos dónde se te va el dinero sin que lo notes (las famosas 'fugas hormiga'). ¿En qué categoría sientes que gastas de más?";
  }
  return "¡Hola! Soy tu CashCoach. 💰 Cuéntame sobre tus gastos o pregúntame cómo ahorrar para una meta, y te ayudo con un plan concreto y sin sermones.";
}

// Clasifica la descripción de un gasto en una categoría (texto crudo del modelo).
// El service se encarga de normalizar el resultado a una CategoriaGasto válida.
export async function clasificarTexto(descripcion: string): Promise<string> {
  if (!process.env.DEEPSEEK_API_KEY) return mockClasificar(descripcion);

  const messages: LLMMessage[] = [
    {
      role: "system",
      content:
        "Eres un clasificador de gastos. Categorías válidas: comida, transporte, entretenimiento, servicios, compras, salud, educacion, otros. Responde SOLO con una palabra (la categoría exacta, en minúsculas, sin acentos, sin explicación).",
    },
    { role: "user", content: `Clasifica este gasto: "${descripcion}"` },
  ];
  return chatCompletion(messages);
}

// Mock de clasificación por palabras clave (cuando no hay API key).
function mockClasificar(descripcion: string): string {
  const t = descripcion.toLowerCase();
  if (/(café|cafe|starbucks|restaurante|comida|taco|pizza|super|mercado|desayuno|cena)/.test(t)) return "comida";
  if (/(uber|taxi|gasolina|metro|camión|camion|transporte|pasaje|didi)/.test(t)) return "transporte";
  if (/(cine|netflix|spotify|juego|bar|fiesta|concierto|disney)/.test(t)) return "entretenimiento";
  if (/(luz|agua|internet|renta|teléfono|telefono|gas|servicio|cfe)/.test(t)) return "servicios";
  if (/(ropa|zapato|amazon|tienda|compra|mercadolibre)/.test(t)) return "compras";
  if (/(doctor|medicina|farmacia|gym|gimnasio|salud|dentista)/.test(t)) return "salud";
  if (/(curso|libro|escuela|universidad|colegiatura|educa|udemy)/.test(t)) return "educacion";
  return "otros";
}
