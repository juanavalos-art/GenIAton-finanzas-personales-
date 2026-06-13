import { Wallet, CalendarDays, TrendingUp, PiggyBank } from "lucide-react";
import { ResumenFinanciero } from "@/domain/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatMonto } from "@/lib/format";
import { categoriaLabel } from "@/lib/categorias";

export function ResumenCards({ resumen }: { resumen: ResumenFinanciero }) {
  const cards = [
    {
      label: "Total este mes",
      valor: formatMonto(resumen.totalMes),
      mono: true,
      Icon: Wallet,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      label: "Gasto diario promedio",
      valor: formatMonto(resumen.promedioDiario),
      mono: true,
      Icon: CalendarDays,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      label: "Mayor gasto",
      valor: resumen.categoriaTop ? categoriaLabel(resumen.categoriaTop) : "—",
      mono: false,
      Icon: TrendingUp,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      label: "Podrías ahorrar",
      valor: formatMonto(resumen.sugerenciaAhorro),
      mono: true,
      Icon: PiggyBank,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map(({ label, valor, mono, Icon, iconBg, iconColor }) => (
        <Card key={label} className="p-4">
          <div className="flex items-center gap-3">
            <div className={cn("rounded-lg p-2", iconBg)}>
              <Icon className={cn("h-5 w-5", iconColor)} />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className={cn("truncate text-xl font-bold", mono && "font-mono")}>
                {valor}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
