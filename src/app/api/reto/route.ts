import { NextResponse } from "next/server";
import { obtenerRetoSemanal } from "@/services/reto.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const reto = await obtenerRetoSemanal();
    return NextResponse.json({ reto });
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}
