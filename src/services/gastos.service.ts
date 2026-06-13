import { Gasto, CategoriaGasto } from "@/domain/types";
import { crearGasto, obtenerGastos } from "@/providers/supabase.provider";

// Registra un gasto. Valida los datos y delega en el provider.
// Si no se pasa categoría, por ahora usa "otros" (la Etapa 6 la clasificará con IA).
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

  return crearGasto({
    descripcion: desc,
    monto,
    categoria: categoria ?? "otros",
  });
}

// Devuelve todos los gastos (el provider ya los ordena por fecha desc).
export async function obtenerTodosLosGastos(): Promise<Gasto[]> {
  return obtenerGastos();
}
