import { Receipt } from "lucide-react";
import { Gasto } from "@/domain/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatMonto, formatFecha } from "@/lib/format";
import { categoriaBadgeColor, categoriaLabel } from "@/lib/categorias";

export function GastoList({ gastos }: { gastos: Gasto[] }) {
  if (gastos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Receipt className="mb-4 h-12 w-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">Sin gastos aún</p>
        <p className="text-sm text-muted-foreground/70">
          Registra tu primer gasto con el formulario de arriba.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {gastos.map((gasto) => (
        <Card
          key={gasto.id}
          className="flex items-center justify-between gap-3 p-4"
        >
          <div className="min-w-0">
            <p className="truncate font-medium">{gasto.descripcion}</p>
            <p className="text-xs text-muted-foreground">
              {formatFecha(gasto.fecha)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Badge
              variant="outline"
              className={categoriaBadgeColor(gasto.categoria)}
            >
              {categoriaLabel(gasto.categoria)}
            </Badge>
            <span className="font-mono font-bold">
              {formatMonto(gasto.monto)}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
