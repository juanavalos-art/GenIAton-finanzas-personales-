import { Gasto, CategoriaGasto, CATEGORIAS } from "@/domain/types";
import { crearGasto, obtenerGastos } from "@/providers/supabase.provider";
import { clasificarTexto } from "@/providers/deepseek.provider";

// Registra un gasto. Valida los datos y delega en el provider.
// Si no se pasa categoría, la IA la clasifica automáticamente.
export async function registrarGasto(
  descripcion: string,
  monto: number,
  categoria?: CategoriaGasto,
): Promise<Gasto> {
  const desc = descripcion?.trim();
  if (!desc) throw new Error("La descripción es requerida");
  if (typeof monto !== "number" || isNaN(monto) || monto <= 0) {
    throw new Error("El monto debe ser un número mayor a 0");
  }

  const categoriaFinal =
    categoria ?? normalizarCategoria(await clasificarTexto(desc));

  return crearGasto({ descripcion: desc, monto, categoria: categoriaFinal });
}

// Devuelve todos los gastos (el provider ya los ordena por fecha desc).
export async function obtenerTodosLosGastos(): Promise<Gasto[]> {
  return obtenerGastos();
}

// Convierte el texto libre del modelo a una CategoriaGasto válida (fallback: "otros").
function normalizarCategoria(texto: string): CategoriaGasto {
  const limpio = texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, ""); // quita acentos
  return CATEGORIAS.find((c) => limpio.includes(c)) ?? "otros";
}
