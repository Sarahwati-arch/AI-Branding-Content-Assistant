"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Analytics } from "@/types";
import { useTranslations } from "next-intl";
import { useLocaleStore } from "@/i18n/locale";

interface EngagementChartProps {
  analytics: Analytics[];
}

export function EngagementChart({ analytics }: EngagementChartProps) {
  const t = useTranslations();
  const { locale } = useLocaleStore();

  const dateLocale = locale === "en" ? "en-US" : "id-ID";

  // Get theme-aware colors
  const getThemeColors = () => {
    if (typeof window === "undefined") {
      return {
        primary: "#6366f1",
        accent: "#f59e0b",
        success: "#10b981",
        grid: "#e2e8f0",
        text: "#64748b",
        tooltipBg: "#ffffff",
        tooltipBorder: "#e2e8f0",
      };
    }
    const style = getComputedStyle(document.documentElement);
    return {
      primary: style.getPropertyValue("--primary").trim() || "#6366f1",
      accent: style.getPropertyValue("--accent").trim() || "#f59e0b",
      success: style.getPropertyValue("--success").trim() || "#10b981",
      grid: style.getPropertyValue("--border").trim() || "#e2e8f0",
      text: style.getPropertyValue("--muted-foreground").trim() || "#64748b",
      tooltipBg: style.getPropertyValue("--card").trim() || "#ffffff",
      tooltipBorder: style.getPropertyValue("--border").trim() || "#e2e8f0",
    };
  };

  const colors = getThemeColors();

  // Group by date
  const chartData = analytics.reduce(
    (acc, a) => {
      const date = new Date(a.recorded_at).toLocaleDateString(dateLocale, {
        day: "numeric",
        month: "short",
      });
      const existing = acc.find((d) => d.date === date);
      if (existing) {
        existing.likes += a.likes;
        existing.comments += a.comments;
        existing.shares += a.shares;
      } else {
        acc.push({ date, likes: a.likes, comments: a.comments, shares: a.shares });
      }
      return acc;
    },
    [] as { date: string; likes: number; comments: number; shares: number }[]
  );

  if (chartData.length === 0) {
    return (
      <div className="p-5 rounded-xl border border-border bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">{t("analytics.chartEngagement")}</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          {t("analytics.chartNoEngagement")}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl border border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">{t("analytics.chartEngagement")}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke={colors.text} />
            <YAxis tick={{ fontSize: 12 }} stroke={colors.text} />
            <Tooltip
              contentStyle={{
                background: colors.tooltipBg,
                border: `1px solid ${colors.tooltipBorder}`,
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="likes" fill={colors.primary} name="Likes" radius={[4, 4, 0, 0]} />
            <Bar dataKey="comments" fill={colors.accent} name={t("analytics.comments")} radius={[4, 4, 0, 0]} />
            <Bar dataKey="shares" fill={colors.success} name={t("analytics.shares")} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
