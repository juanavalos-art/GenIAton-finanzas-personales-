"use client";

import { useState, useEffect, useCallback } from "react";
import { Gasto } from "@/domain/types";
import { GastoForm } from "@/components/GastoForm";
import { GastoList } from "@/components/GastoList";

export default function GastosPage() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/gastos");
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "No se pudieron cargar los gastos");
      }
      setGastos(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mis Gastos</h1>

      <GastoForm onCreated={cargar} />

      {error && <p className="text-sm text-red-400">{error}</p>}

      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando gastos…</p>
      ) : (
        <GastoList gastos={gastos} />
      )}
    </div>
  );
}
