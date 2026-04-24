"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  FileText,
  CalendarDays,
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/hooks/use-sidebar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/branding", label: "Branding", icon: Palette },
  { href: "/content", label: "Konten", icon: FileText },
  { href: "/calendar", label: "Kalender", icon: CalendarDays },
  { href: "/analytics", label: "Analitik", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { collapsed, toggle } = useSidebar();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const NavLinks = () => (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              isActive
                ? "bg-sidebar-active text-white"
                : "text-sidebar-foreground/70 hover:bg-sidebar-hover hover:text-sidebar-foreground"
            } ${collapsed ? "lg:justify-center" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} className="shrink-0" />
            <span className={`${collapsed ? "lg:hidden" : ""}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar-bg text-sidebar-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-overlay z-40 transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-sidebar-bg flex flex-col transform transition-all duration-300 ease-in-out lg:transform-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "w-16" : "w-64"}`}
      >
        <div
          className={`px-6 py-5 border-b border-sidebar-hover ${
            collapsed ? "lg:px-3" : ""
          }`}
        >
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 ${
              collapsed ? "lg:justify-center" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Palette size={18} className="text-white" />
            </div>
            <span
              className={`text-lg font-bold text-white ${
                collapsed ? "lg:hidden" : ""
              }`}
            >
              BrandAI
            </span>
          </Link>
        </div>

        <NavLinks />

        {/* Collapse toggle - desktop only */}
        <div className="hidden lg:block px-3 py-2">
          <button
            onClick={toggle}
            className="flex items-center justify-center w-full px-3 py-2 rounded-lg text-sidebar-foreground/50 hover:bg-sidebar-hover hover:text-sidebar-foreground transition-all duration-150"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        <div className={`px-3 py-4 border-t border-sidebar-hover`}>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-hover hover:text-sidebar-foreground transition-all duration-150 w-full ${
              collapsed ? "lg:justify-center" : ""
            }`}
            title={collapsed ? "Keluar" : undefined}
          >
            <LogOut size={20} className="shrink-0" />
            <span className={`${collapsed ? "lg:hidden" : ""}`}>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
