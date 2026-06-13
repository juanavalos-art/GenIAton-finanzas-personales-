import { CategoriaGasto } from "@/domain/types";

// Color del badge por categoría (ver skill de UI).
const BADGE_COLORS: Record<CategoriaGasto, string> = {
  comida: "bg-orange-500/10 text-orange-500",
  transporte: "bg-blue-500/10 text-blue-500",
  entretenimiento: "bg-purple-500/10 text-purple-500",
  servicios: "bg-slate-500/10 text-slate-500",
  compras: "bg-pink-500/10 text-pink-500",
  salud: "bg-emerald-500/10 text-emerald-500",
  educacion: "bg-cyan-500/10 text-cyan-500",
  otros: "bg-gray-500/10 text-gray-500",
};

export function categoriaBadgeColor(cat: CategoriaGasto): string {
  return BADGE_COLORS[cat];
}

// Etiqueta legible (con acentos y mayúscula inicial) por categoría.
const LABELS: Record<CategoriaGasto, string> = {
  comida: "Comida",
  transporte: "Transporte",
  entretenimiento: "Entretenimiento",
  servicios: "Servicios",
  compras: "Compras",
  salud: "Salud",
  educacion: "Educación",
  otros: "Otros",
};

export function categoriaLabel(cat: CategoriaGasto): string {
  return LABELS[cat];
}
