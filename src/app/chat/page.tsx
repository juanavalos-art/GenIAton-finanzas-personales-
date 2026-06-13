"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, MessageSquare, Send } from "lucide-react";
import { MensajeChat } from "@/domain/types";
import { ChatBubble } from "@/components/ChatBubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ChatPage() {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Cargar historial al montar.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/chat");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "No se pudo cargar el historial");
        }
        setMensajes(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  // Auto-scroll al final cuando cambian los mensajes o el estado de escritura.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, enviando]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const texto = input.trim();
    if (!texto || enviando) return;
    setError(null);

    const optimista: MensajeChat = {
      id: `temp-${crypto.randomUUID()}`,
      rol: "user",
      contenido: texto,
      created_at: new Date().toISOString(),
    };
    setMensajes((prev) => [...prev, optimista]);
    setInput("");
    setEnviando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: texto }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "No se pudo enviar el mensaje");
      }
      const respuesta: MensajeChat = await res.json();
      setMensajes((prev) => [...prev, respuesta]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setEnviando(false);
    }
  }

  const vacio = !cargando && mensajes.length === 0;

  return (
    <div className="flex h-[calc(100dvh-8rem)] flex-col gap-4 md:h-[calc(100dvh-4rem)]">
      <h1 className="text-2xl font-bold">💬 Chat con tu Coach</h1>

      <ScrollArea className="min-h-0 flex-1 pr-3">
        <div className="flex flex-col gap-4 py-2">
          {cargando && (
            <p className="text-sm text-muted-foreground">Cargando conversación…</p>
          )}

          {vacio && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                Empieza la conversación con tu coach
              </p>
              <p className="text-sm text-muted-foreground/70">
                Pregúntale cómo ahorrar o pídele que analice tus gastos.
              </p>
            </div>
          )}

          {mensajes.map((m) => (
            <ChatBubble key={m.id} mensaje={m} />
          ))}

          {enviando && (
            <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted text-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-2 text-sm text-muted-foreground">
                Escribiendo…
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <form onSubmit={handleSend} className="flex gap-2">
        <Input
          placeholder="Escríbele a tu coach…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={enviando}
        />
        <Button type="submit" size="icon" disabled={enviando || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
