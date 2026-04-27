"use client";

import { useLocaleStore, type Locale } from "@/i18n/locale";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore();

  const toggle = () => {
    setLocale(locale === "id" ? "en" : "id");
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-150"
      title={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <Globe size={16} />
      <span className="uppercase">{locale}</span>
    </button>
  );
}
