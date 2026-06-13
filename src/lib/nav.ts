import { LayoutDashboard, Receipt, MessageSquare, type LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/gastos", label: "Gastos", icon: Receipt },
  { href: "/chat", label: "Chat", icon: MessageSquare },
];
