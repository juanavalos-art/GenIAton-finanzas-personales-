import { NextResponse } from "next/server";
import { obtenerResumen } from "@/services/resumen.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const resumen = await obtenerResumen();
    return NextResponse.json(resumen);
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}
