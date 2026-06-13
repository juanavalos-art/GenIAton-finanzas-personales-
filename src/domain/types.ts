// Tipos e interfaces del dominio — fuente de verdad de la estructura de datos.

/** Categorías posibles de un gasto. */
export type CategoriaGasto =
  | "comida"
  | "transporte"
  | "entretenimiento"
  | "servicios"
  | "compras"
  | "salud"
  | "educacion"
  | "otros";

/** Lista de todas las categorías (útil para selects y validaciones). */
export const CATEGORIAS: CategoriaGasto[] = [
  "comida",
  "transporte",
  "entretenimiento",
  "servicios",
  "compras",
  "salud",
  "educacion",
  "otros",
];

/** Un gasto registrado por el usuario. */
export interface Gasto {
  id: string;
  descripcion: string;
  monto: number;
  categoria: CategoriaGasto;
  fecha: string; // ISO date (YYYY-MM-DD)
  created_at: string; // ISO timestamp
}

/** Datos necesarios para crear un gasto (fecha es opcional: default = hoy en la BD). */
export type GastoInput = {
  descripcion: string;
  monto: number;
  categoria: CategoriaGasto;
  fecha?: string;
};

/** Rol de un mensaje del chat. */
export type RolMensaje = "user" | "assistant";

/** Un mensaje del chat con el coach. */
export interface MensajeChat {
  id: string;
  rol: RolMensaje;
  contenido: string;
  created_at: string; // ISO timestamp
}

/** Datos necesarios para crear un mensaje. */
export type MensajeInput = {
  rol: RolMensaje;
  contenido: string;
};

/** Gasto total acumulado por categoría. */
export interface GastoPorCategoria {
  categoria: CategoriaGasto;
  total: number;
  porcentaje: number; // 0–100 respecto al total del mes
}

/** Resumen financiero calculado a partir de los gastos. */
export interface ResumenFinanciero {
  totalMes: number;
  promedioDiario: number;
  gastosPorCategoria: GastoPorCategoria[];
  categoriaTop: CategoriaGasto | null;
  sugerenciaAhorro: number;
}
