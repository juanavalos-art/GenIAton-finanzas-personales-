import { Bot, User } from "lucide-react";
import { MensajeChat } from "@/domain/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatHora } from "@/lib/format";

export function ChatBubble({ mensaje }: { mensaje: MensajeChat }) {
  const esUser = mensaje.rol === "user";

  return (
    <div className={cn("flex items-end gap-2", esUser && "flex-row-reverse")}>
      <Avatar className="h-8 w-8">
        <AvatarFallback
          className={cn(
            esUser
              ? "bg-emerald-500/15 text-emerald-500"
              : "bg-muted text-foreground",
          )}
        >
          {esUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
          esUser
            ? "rounded-br-sm bg-emerald-500 text-white"
            : "rounded-bl-sm bg-muted text-foreground",
        )}
      >
        <p className="whitespace-pre-wrap break-words">{mensaje.contenido}</p>
        <p
          className={cn(
            "mt-1 text-[10px]",
            esUser ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {formatHora(mensaje.created_at)}
        </p>
      </div>
    </div>
  );
}
