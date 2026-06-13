"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Brand } from "./Brand";
import { SidebarNav } from "./SidebarNav";

// Barra superior en mobile con menú hamburguesa (Sheet). Oculta en escritorio.
export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center gap-3 border-b bg-card/40 p-4 md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Abrir menú">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
          <div className="flex flex-col gap-6">
            <Brand />
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
      <Brand />
    </header>
  );
}
