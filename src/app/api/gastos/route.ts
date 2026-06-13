import { NextResponse } from "next/server";
import {
  registrarGasto,
  obtenerTodosLosGastos,
} from "@/services/gastos.service";

// Lee de la BD en cada request (no cachear en build).
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const gastos = await obtenerTodosLosGastos();
    return NextResponse.json(gastos);
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gasto = await registrarGasto(
      body.descripcion,
      body.monto,
      body.categoria,
    );
    return NextResponse.json(gasto, { status: 201 });
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}
