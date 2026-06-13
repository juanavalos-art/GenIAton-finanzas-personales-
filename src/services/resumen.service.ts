import {
  CategoriaGasto,
  GastoPorCategoria,
  ResumenFinanciero,
} from "@/domain/types";
import { obtenerGastos } from "@/providers/supabase.provider";

// Categorías "discrecionales" (gasto no esencial) para la sugerencia de ahorro.
const DISCRECIONALES: CategoriaGasto[] = ["comida", "entretenimiento", "compras"];

// Calcula el resumen financiero del mes en curso.
export async function obtenerResumen(): Promise<ResumenFinanciero> {
  const todos = await obtenerGastos();

  const ahora = new Date();
  const mesActual = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}`;
  const delMes = todos.filter((g) => g.fecha.slice(0, 7) === mesActual);

  const totalMes = delMes.reduce((suma, g) => suma + g.monto, 0);

  // Promedio diario = total del mes / días transcurridos.
  const diaActual = ahora.getDate();
  const promedioDiario = totalMes / diaActual;

  // Total por categoría (solo las que tienen gasto este mes), ordenado desc.
  const porCategoria = new Map<CategoriaGasto, number>();
  for (const g of delMes) {
    porCategoria.set(g.categoria, (porCategoria.get(g.categoria) ?? 0) + g.monto);
  }
  const gastosPorCategoria: GastoPorCategoria[] = Array.from(porCategoria.entries())
    .map(([categoria, total]) => ({
      categoria,
      total,
      porcentaje: totalMes > 0 ? (total / totalMes) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);

  const categoriaTop = gastosPorCategoria[0]?.categoria ?? null;

  // Sugerencia: ahorra el 20% de lo gastado en categorías discrecionales.
  const totalDiscrecional = delMes
    .filter((g) => DISCRECIONALES.includes(g.categoria))
    .reduce((suma, g) => suma + g.monto, 0);
  const sugerenciaAhorro = totalDiscrecional * 0.2;

  return {
    totalMes,
    promedioDiario,
    gastosPorCategoria,
    categoriaTop,
    sugerenciaAhorro,
  };
}
