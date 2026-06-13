"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Receipt, MessageSquare, ChevronRight } from "lucide-react";
import { ResumenFinanciero } from "@/domain/types";
import { ResumenCards } from "@/components/ResumenCards";
import { CategoriaBarChart } from "@/components/CategoriaBarChart";
import { RetoSemana } from "@/components/RetoSemana";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const [resumen, setResumen] = useState<ResumenFinanciero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/resumen");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "No se pudo cargar el resumen");
        }
        setResumen(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">¡Hola! Aquí está tu resumen 💰</h1>
        <p className="text-muted-foreground">
          Un vistazo rápido a tus finanzas de este mes.
        </p>
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground">Cargando resumen…</p>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {resumen && (
        <>
          <ResumenCards resumen={resumen} />
          <RetoSemana enabled={resumen.gastosPorCategoria.length > 0} />
          <Card className="p-4">
            <h2 className="mb-4 text-lg font-semibold">📊 Gasto por categoría</h2>
            <CategoriaBarChart data={resumen.gastosPorCategoria} />
          </Card>
        </>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <QuickLink
          href="/gastos"
          Icon={Receipt}
          titulo="Registrar gasto"
          descripcion="Anota lo que gastaste hoy"
        />
        <QuickLink
          href="/chat"
          Icon={MessageSquare}
          titulo="Hablar con tu coach"
          descripcion="Pide consejos y retos de ahorro"
        />
      </div>
    </div>
  );
}

function QuickLink({
  href,
  Icon,
  titulo,
  descripcion,
}: {
  href: string;
  Icon: typeof Receipt;
  titulo: string;
  descripcion: string;
}) {
  return (
    <Link href={href}>
      <Card className="flex items-center gap-3 p-4 transition-colors hover:bg-muted">
        <div className="rounded-lg bg-emerald-500/10 p-2">
          <Icon className="h-5 w-5 text-emerald-500" />
        </div>
        <div className="flex-1">
          <p className="font-medium">{titulo}</p>
          <p className="text-sm text-muted-foreground">{descripcion}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Card>
    </Link>
  );
}
