import { GastoPorCategoria } from "@/domain/types";
import { cn } from "@/lib/utils";
import { formatMonto } from "@/lib/format";
import { categoriaLabel, categoriaBarColor } from "@/lib/categorias";

export function CategoriaBarChart({ data }: { data: GastoPorCategoria[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Aún no hay gastos este mes para graficar.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((d) => (
        <div key={d.categoria}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span>{categoriaLabel(d.categoria)}</span>
            <span className="font-mono text-muted-foreground">
              {formatMonto(d.total)} · {Math.round(d.porcentaje)}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full", categoriaBarColor(d.categoria))}
              style={{ width: `${d.porcentaje}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
