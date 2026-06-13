import { NextResponse } from "next/server";
import { enviarMensaje, obtenerHistorial } from "@/services/chat.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const historial = await obtenerHistorial();
    return NextResponse.json(historial);
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const respuesta = await enviarMensaje(body.mensaje);
    return NextResponse.json(respuesta);
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}
