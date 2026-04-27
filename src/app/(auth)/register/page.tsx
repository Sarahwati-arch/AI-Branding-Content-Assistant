"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 6) {
      setError(t("auth.passwordError"));
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{t("auth.registerTitle")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("auth.registerDesc")}
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
            {t("auth.fullName")}
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] hover:border-foreground/20 transition-all duration-150"
            placeholder={t("auth.fullNamePlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            {t("auth.email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] hover:border-foreground/20 transition-all duration-150"
            placeholder="nama@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
            {t("auth.password")}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] hover:border-foreground/20 transition-all duration-150"
            placeholder={t("auth.passwordMin")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-primary-dark hover:brightness-110 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : t("auth.registerButton")}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        {t("auth.hasAccount")}{" "}
        <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
          {t("auth.loginLink")}
        </Link>
      </p>
    </div>
  );
}
