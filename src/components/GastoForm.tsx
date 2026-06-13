"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIAS, CategoriaGasto } from "@/domain/types";
import { categoriaLabel } from "@/lib/categorias";

type Props = { onCreated: () => void };

// "auto" = sin categoría explícita (en Etapa 6 lo clasificará la IA).
type CategoriaSeleccion = CategoriaGasto | "auto";

export function GastoForm({ onCreated }: Props) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState<CategoriaSeleccion>("auto");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const montoNum = parseFloat(monto);
    if (!descripcion.trim()) {
      setError("Escribe una descripción");
      return;
    }
    if (isNaN(montoNum) || montoNum <= 0) {
      setError("El monto debe ser mayor a 0");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descripcion: descripcion.trim(),
          monto: montoNum,
          categoria: categoria === "auto" ? undefined : categoria,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "No se pudo registrar el gasto");
      }
      setDescripcion("");
      setMonto("");
      setCategoria("auto");
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              placeholder="Ej. Café en Starbucks"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="monto">Monto</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="monto"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="0.00"
                className="pl-7 font-mono"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Categoría</Label>
          <Select
            value={categoria}
            onValueChange={(v) => setCategoria(v as CategoriaSeleccion)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Automática 🤖</SelectItem>
              {CATEGORIAS.map((c) => (
                <SelectItem key={c} value={c}>
                  {categoriaLabel(c)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" disabled={loading} className="self-start">
          {loading ? "Registrando…" : "Registrar Gasto"}
        </Button>
      </form>
    </Card>
  );
}
