import { Brand } from "./Brand";
import { SidebarNav } from "./SidebarNav";

// Sidebar fijo de escritorio. Oculto en mobile (ahí se usa MobileHeader + Sheet).
export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-6 border-r bg-card/40 p-4 md:flex">
      <Brand />
      <SidebarNav />
    </aside>
  );
}
