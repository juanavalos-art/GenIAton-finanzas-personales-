import { Gasto, CategoriaGasto } from "@/domain/types";
import { formatMonto } from "@/lib/format";
import { categoriaLabel } from "@/lib/categorias";

// Arma el system prompt del coach financiero, inyectando el contexto de gastos.
export function construirSystemPrompt(gastos: Gasto[]): string {
  return `Eres CashCoach, un coach financiero para jóvenes. Tu personalidad:
- Hablas en español, con tono casual y cercano pero informativo (como un amigo que sabe de dinero).
- Eres motivador, NUNCA regañón ni culpabilizador.
- Analizas los gastos del usuario y detectas patrones y "fugas de dinero" (gastos hormiga).
- NUNCA das consejos de inversión específicos (acciones, cripto, etc.).
- Respondes corto y al grano. Usa algún emoji con moderación.

Cuando propongas un RETO DE AHORRO, hazlo concreto y alcanzable, con cifra y plazo:
  "🔥 Reto: esta semana no gastes más de $X en [categoría]. Ahorrarías ~$Y."

Cuando el usuario hable de una META o de ahorrar, SIMULA el cálculo con números reales:
  "🎯 Si ahorras $X al mes, en Y meses tendrás $Z." (haz la multiplicación tú).

${resumenGastos(gastos)}`;
}

function resumenGastos(gastos: Gasto[]): string {
  if (gastos.length === 0) {
    return "El usuario aún no ha registrado gastos. Invítalo amablemente a registrar su primer gasto para poder analizarlo.";
  }

  const total = gastos.reduce((suma, g) => suma + g.monto, 0);

  const porCategoria = new Map<CategoriaGasto, number>();
  for (const g of gastos) {
    porCategoria.set(g.categoria, (porCategoria.get(g.categoria) ?? 0) + g.monto);
  }
  const lineasCategoria = [...porCategoria.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([cat, monto]) => `- ${categoriaLabel(cat)}: ${formatMonto(monto)}`)
    .join("\n");

  const recientes = gastos
    .slice(0, 15)
    .map((g) => `- ${g.descripcion} (${categoriaLabel(g.categoria)}): ${formatMonto(g.monto)} el ${g.fecha}`)
    .join("\n");

  return `Datos de gastos del usuario (úsalos para tus análisis; no los repitas tal cual):
Total registrado: ${formatMonto(total)}
Gasto por categoría:
${lineasCategoria}

Gastos más recientes:
${recientes}`;
}
