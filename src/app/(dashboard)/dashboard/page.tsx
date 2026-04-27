"use client";

import Link from "next/link";
import { Palette, FileText, CalendarDays, BarChart3, Plus } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{t("nav.dashboard")}</h1>
        <p className="text-muted-foreground mt-1">{t("dashboard.welcome")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { href: "/branding/new", icon: Palette, label: t("dashboard.createBrand"), sub: t("dashboard.createBrandSub"), color: "bg-primary/10 text-primary group-hover:bg-primary/20", accent: "primary" },
          { href: "/content/generate", icon: Plus, label: t("dashboard.genContent"), sub: t("dashboard.genContentSub"), color: "bg-success/10 text-success group-hover:bg-success/20", accent: "success" },
          { href: "/calendar", icon: CalendarDays, label: t("nav.calendar"), sub: t("dashboard.calendarSub"), color: "bg-accent/10 text-accent group-hover:bg-accent/20", accent: "accent" },
          { href: "/analytics", icon: BarChart3, label: t("nav.analytics"), sub: t("dashboard.analyticsSub"), color: "bg-info/10 text-info group-hover:bg-info/20", accent: "info" },
        ].map((item, i) => (
          <AnimateIn key={item.href} animation="fade-in-up" delay={i * 100}>
            <Link href={item.href} className={`flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-200 group border-t-2 border-t-${item.accent}`}>
              <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center transition-all duration-200`}>
                <item.icon size={24} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.sub}</p>
              </div>
            </Link>
          </AnimateIn>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimateIn animation="fade-in-up" delay={400}>
          <div className="p-5 rounded-xl border border-border bg-card border-t-2 border-t-primary">
            <h2 className="text-lg font-semibold text-foreground mb-4">{t("dashboard.startHere")}</h2>
            <div className="space-y-3">
              {[
                { num: "1", title: t("dashboard.step1"), desc: t("dashboard.step1Desc") },
                { num: "2", title: t("dashboard.step2"), desc: t("dashboard.step2Desc") },
                { num: "3", title: t("dashboard.step3"), desc: t("dashboard.step3Desc") },
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-150">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{step.num}</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
        <AnimateIn animation="fade-in-up" delay={500}>
          <div className="p-5 rounded-xl border border-border bg-card border-t-2 border-t-success">
            <h2 className="text-lg font-semibold text-foreground mb-4">{t("dashboard.tipsTitle")}</h2>
            <div className="space-y-4">
              {[
                { title: t("dashboard.tip1Title"), desc: t("dashboard.tip1Desc") },
                { title: t("dashboard.tip2Title"), desc: t("dashboard.tip2Desc") },
                { title: t("dashboard.tip3Title"), desc: t("dashboard.tip3Desc") },
              ].map((tip) => (
                <div key={tip.title}>
                  <p className="text-sm font-medium text-foreground">{tip.title}</p>
                  <p className="text-xs text-muted-foreground">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
