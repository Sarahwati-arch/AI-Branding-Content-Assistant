"use client";

import type { Analytics } from "@/types";
import { useTranslations } from "next-intl";
import { useLocaleStore } from "@/i18n/locale";

interface MetricsOverviewProps {
  analytics: Analytics[];
}

export function MetricsOverview({ analytics }: MetricsOverviewProps) {
  const t = useTranslations();
  const { locale } = useLocaleStore();

  const numLocale = locale === "en" ? "en-US" : "id-ID";

  const totalImpressions = analytics.reduce((sum, a) => sum + a.impressions, 0);
  const totalReach = analytics.reduce((sum, a) => sum + a.reach, 0);
  const totalLikes = analytics.reduce((sum, a) => sum + a.likes, 0);
  const totalComments = analytics.reduce((sum, a) => sum + a.comments, 0);
  const totalShares = analytics.reduce((sum, a) => sum + a.shares, 0);
  const avgEngagement =
    analytics.length > 0
      ? analytics.reduce((sum, a) => sum + a.engagement_rate, 0) / analytics.length
      : 0;

  const metrics = [
    { label: t("analytics.impressions"), value: totalImpressions.toLocaleString(numLocale) },
    { label: t("analytics.reach"), value: totalReach.toLocaleString(numLocale) },
    { label: t("analytics.engagementRate"), value: `${avgEngagement.toFixed(1)}%` },
    { label: t("analytics.totalLikes"), value: totalLikes.toLocaleString(numLocale) },
    { label: t("analytics.totalComments"), value: totalComments.toLocaleString(numLocale) },
    { label: t("analytics.totalShares"), value: totalShares.toLocaleString(numLocale) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="p-4 rounded-xl border border-border bg-card">
          <p className="text-xs text-muted-foreground">{metric.label}</p>
          <p className="text-xl font-bold text-foreground mt-1">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
