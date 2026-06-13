"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";

// Card del "Reto de la semana" generado por IA. Solo consulta cuando `enabled`.
export function RetoSemana({ enabled }: { enabled: boolean }) {
  const [reto, setReto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    let cancelado = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/reto");
        if (res.ok && !cancelado) {
          const data = await res.json();
          setReto(data.reto);
        }
      } finally {
        if (!cancelado) setLoading(false);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <Card className="border-emerald-500/30 bg-emerald-500/5 p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-emerald-500/10 p-2">
          <Flame className="h-5 w-5 text-emerald-500" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">🔥 Reto de la semana</p>
          {loading ? (
            <p className="mt-1 animate-pulse text-sm text-muted-foreground">
              Generando tu reto personalizado…
            </p>
          ) : (
            <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
              {reto ?? "No se pudo generar el reto ahora. Intenta más tarde."}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
