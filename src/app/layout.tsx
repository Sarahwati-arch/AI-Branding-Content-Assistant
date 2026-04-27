import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { I18nProvider } from "@/i18n/client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "id";

  return {
    title:
      locale === "en"
        ? "AI Branding Assistant - Build Brand & Content with AI"
        : "AI Branding Assistant - Buat Brand & Konten dengan AI",
    description:
      locale === "en"
        ? "AI platform to create brand kits, generate social media content, and manage your branding strategy."
        : "Platform AI untuk membuat brand kit, generate konten media sosial, dan mengelola strategi branding Anda.",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "id";

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
