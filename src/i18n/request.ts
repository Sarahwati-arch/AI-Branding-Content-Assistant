import { cookies } from "next/headers";
import id from "@/messages/id.json";
import en from "@/messages/en.json";

export type Locale = "id" | "en";

const flatMessages = { id, en } as const;

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

const nestedMessages = {
  id: toNested(flatMessages.id),
  en: toNested(flatMessages.en),
};

async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale");
  return localeCookie?.value === "en" ? "en" : "id";
}

export default async function getRequestConfig() {
  const locale = await resolveLocale();
  return { locale, messages: nestedMessages[locale] };
}

export async function getLocale(): Promise<Locale> {
  return resolveLocale();
}
