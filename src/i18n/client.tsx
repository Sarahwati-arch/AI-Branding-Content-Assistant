"use client";

import { useEffect, useMemo } from "react";
import { useLocaleStore, getInitialLocale } from "./locale";
import { NextIntlClientProvider } from "next-intl";

function toNested(flat: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split(".");
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current)) current[parts[i]] = {};
      current = current[parts[i]] as Record<string, unknown>;
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { locale, messages, setLocale } = useLocaleStore();

  useEffect(() => {
    const initial = getInitialLocale();
    if (initial !== locale) {
      setLocale(initial);
    }
  }, []);

  const nested = useMemo(() => toNested(messages), [messages]);

  return (
    <NextIntlClientProvider locale={locale} messages={nested}>
      {children}
    </NextIntlClientProvider>
  );
}
