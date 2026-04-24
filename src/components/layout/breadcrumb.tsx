"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const labelMap: Record<string, string> = {
  dashboard: "Dashboard",
  branding: "Branding",
  content: "Konten",
  calendar: "Kalender",
  analytics: "Analitik",
  new: "Baru",
  generate: "Generate",
  edit: "Edit",
};

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      <Link
        href="/dashboard"
        className="hover:text-foreground transition-colors duration-150"
      >
        <Home size={14} />
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const label = labelMap[segment] || segment;

        return (
          <span key={href} className="flex items-center gap-1">
            <ChevronRight size={12} />
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link
                href={href}
                className="hover:text-foreground transition-colors duration-150"
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
