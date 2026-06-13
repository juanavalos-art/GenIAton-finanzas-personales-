// Formato de montos en pesos mexicanos.
export function formatMonto(monto: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(monto);
}

// Formato de fecha corto en español. Acepta "YYYY-MM-DD" o un ISO timestamp.
export function formatFecha(fecha: string): string {
  const iso = fecha.length === 10 ? `${fecha}T00:00:00` : fecha;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return fecha;
  return d.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
