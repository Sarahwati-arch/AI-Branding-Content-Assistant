import { create } from "zustand";
import id from "@/messages/id.json";
import en from "@/messages/en.json";

export type Locale = "id" | "en";

export const messagesMap: Record<Locale, Record<string, string>> = { id, en };

interface LocaleState {
  locale: Locale;
  messages: Record<string, string>;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: "id",
  messages: id,
  setLocale: (locale: Locale) => {
    const messages = messagesMap[locale];
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
    document.documentElement.lang = locale;
    try {
      localStorage.setItem("locale", locale);
    } catch {}
    set({ locale, messages });
  },
}));

export function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "id";
  try {
    const stored = localStorage.getItem("locale");
    if (stored === "en" || stored === "id") return stored;
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("locale="));
    if (cookie) {
      const val = cookie.split("=")[1];
      if (val === "en" || val === "id") return val;
    }
  } catch {}
  return "id";
}
