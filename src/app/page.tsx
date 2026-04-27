"use client";

import Link from "next/link";
import {
  Palette,
  FileText,
  CalendarDays,
  BarChart3,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { AwogawogButton } from "@/components/awogawog-button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  const features = [
    {
      icon: Palette,
      title: t("landing.featBrandKitTitle"),
      description: t("landing.featBrandKitDesc"),
      accent: "border-t-primary",
    },
    {
      icon: FileText,
      title: t("landing.featContentTitle"),
      description: t("landing.featContentDesc"),
      accent: "border-t-success",
    },
    {
      icon: CalendarDays,
      title: t("landing.featCalendarTitle"),
      description: t("landing.featCalendarDesc"),
      accent: "border-t-accent",
    },
    {
      icon: BarChart3,
      title: t("landing.featAnalyticsTitle"),
      description: t("landing.featAnalyticsDesc"),
      accent: "border-t-destructive",
    },
    {
      icon: Sparkles,
      title: t("landing.featLogoTitle"),
      description: t("landing.featLogoDesc"),
      accent: "border-t-primary",
    },
    {
      icon: CheckCircle2,
      title: t("landing.featVisualTitle"),
      description: t("landing.featVisualDesc"),
      accent: "border-t-success",
    },
  ];

  const socialProofs = [
    { value: "1,000+", label: t("landing.proofBrands") },
    { value: "5,000+", label: t("landing.proofContent") },
    { value: "100+", label: t("landing.proofUsers") },
    { value: "4.9/5", label: t("landing.proofRating") },
  ];

  const steps = [
    {
      num: "1",
      title: t("landing.step1Title"),
      description: t("landing.step1Desc"),
    },
    {
      num: "2",
      title: t("landing.step2Title"),
      description: t("landing.step2Desc"),
    },
    {
      num: "3",
      title: t("landing.step3Title"),
      description: t("landing.step3Desc"),
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Palette size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">UMKMkitAssistant</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link
              href="/login"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-150 px-3 py-2"
            >
              {t("landing.signIn")}
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-150 active:scale-[0.98]"
            >
              {t("landing.signUpFree")}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left">
              <AnimateIn animation="fade-in-up">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                  <Sparkles size={14} />
                  {t("landing.poweredBy")}
                </div>
              </AnimateIn>

              <AnimateIn animation="fade-in-up" delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight text-balance">
                  {t("landing.heroTitle1")}
                  <br />
                  <span className="gradient-text">{t("landing.heroTitle2")}</span>
                </h1>
              </AnimateIn>

              <AnimateIn animation="fade-in-up" delay={200}>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {t("landing.heroDesc")}
                </p>
              </AnimateIn>

              <AnimateIn animation="fade-in-up" delay={300}>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-semibold text-lg hover:brightness-110 transition-all duration-200 shadow-lg shadow-primary/25 active:scale-[0.98]"
                  >
                    {t("landing.ctaStart")}
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-secondary transition-all duration-200 active:scale-[0.98]"
                  >
                    {t("landing.ctaFeatures")}
                  </Link>
                </div>
                <AwogawogButton />
              </AnimateIn>
            </div>

            {/* Hero visual - Browser mockup */}
            <AnimateIn animation="fade-in-up" delay={400} className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-2xl blur-2xl" />
                <div className="relative bg-card rounded-xl border border-border shadow-2xl overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-warning/60" />
                      <div className="w-3 h-3 rounded-full bg-success/60" />
                    </div>
                    <div className="flex-1 mx-8">
                      <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground text-center">
                        brandai.app/dashboard
                      </div>
                    </div>
                  </div>
                  {/* Dashboard preview */}
                  <div className="p-4 space-y-3">
                    <div className="flex gap-3">
                      <div className="w-20 h-6 rounded bg-primary/20" />
                      <div className="w-16 h-6 rounded bg-secondary" />
                      <div className="w-14 h-6 rounded bg-secondary" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { color: "bg-primary/20", icon: "bg-primary" },
                        { color: "bg-success/20", icon: "bg-success" },
                        { color: "bg-accent/20", icon: "bg-accent" },
                      ].map((card, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg border border-border space-y-2"
                        >
                          <div
                            className={`w-6 h-6 rounded ${card.icon} opacity-80`}
                          />
                          <div className={`h-2 rounded ${card.color} w-12`} />
                          <div className={`h-2 rounded ${card.color} w-8`} />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 rounded-lg border border-border p-3 space-y-2">
                        <div className="h-2 w-16 rounded bg-secondary" />
                        <div className="flex items-end gap-1 h-14">
                          {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-primary/30 rounded-t"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="h-24 rounded-lg border border-border p-3 space-y-2">
                        <div className="h-2 w-16 rounded bg-secondary" />
                        <div className="flex items-center justify-center h-14">
                          <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 border-y border-border bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {socialProofs.map((proof, i) => (
              <AnimateIn
                key={proof.label}
                animation="fade-in-up"
                delay={i * 100}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {proof.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {proof.label}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {t("landing.featuresTitle")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("landing.featuresDesc")}
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <AnimateIn
                key={feature.title}
                animation="fade-in-up"
                delay={i * 100}
              >
                <div
                  className={`p-5 rounded-xl border border-border bg-card hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-200 group border-t-2 ${feature.accent}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                    <feature.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-secondary/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto relative">
          <AnimateIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {t("landing.howTitle")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("landing.howDesc")}
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <AnimateIn
                key={step.num}
                animation="fade-in-up"
                delay={i * 150}
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110">
                    <span className="text-2xl font-bold gradient-text">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="max-w-3xl mx-auto text-center relative">
          <AnimateIn animation="scale-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-balance">
              {t("landing.ctaTitle")}
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              {t("landing.ctaDesc")}
            </p>
            <div className="mt-8">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-semibold text-lg hover:bg-white/90 transition-all duration-200 active:scale-[0.98] shadow-lg"
              >
                {t("landing.ctaButton")}
                <ArrowRight size={18} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Palette size={18} className="text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">
                  UMKMkitAssistant
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                {t("landing.footerDesc")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">{t("landing.footerFeatures")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t("landing.featBrandKitTitle")}</li>
                <li>{t("landing.featContentTitle")}</li>
                <li>{t("landing.featCalendarTitle")}</li>
                <li>{t("landing.featAnalyticsTitle")}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">{t("landing.footerTech")}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap size={14} /> GPT-4 & DALL-E
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={14} /> Supabase Auth
                </li>
                <li className="flex items-center gap-2">
                  <Globe size={14} /> Next.js
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 UMKMkitAssistant. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              AI Branding & Content Assistant
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
