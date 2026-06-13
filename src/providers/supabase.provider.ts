// Provider de Supabase — SOLO conexión a la BD. Sin lógica de negocio.
import { createClient } from "@supabase/supabase-js";
import { Gasto, GastoInput, MensajeChat, MensajeInput } from "@/domain/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan las variables de entorno de Supabase. Rellena NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Gastos ---

export async function crearGasto(gasto: GastoInput): Promise<Gasto> {
  const { data, error } = await supabase
    .from("gastos")
    .insert(gasto)
    .select()
    .single();

  if (error) throw new Error(`Error al crear gasto: ${error.message}`);
  return data as Gasto;
}

export async function obtenerGastos(): Promise<Gasto[]> {
  const { data, error } = await supabase
    .from("gastos")
    .select("*")
    .order("fecha", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al obtener gastos: ${error.message}`);
  return (data ?? []) as Gasto[];
}

// --- Mensajes del chat ---

export async function crearMensaje(mensaje: MensajeInput): Promise<MensajeChat> {
  const { data, error } = await supabase
    .from("mensajes_chat")
    .insert(mensaje)
    .select()
    .single();

  if (error) throw new Error(`Error al crear mensaje: ${error.message}`);
  return data as MensajeChat;
}

export async function obtenerMensajes(): Promise<MensajeChat[]> {
  const { data, error } = await supabase
    .from("mensajes_chat")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Error al obtener mensajes: ${error.message}`);
  return (data ?? []) as MensajeChat[];
}
