"use client";

import type { Analytics } from "@/types";

interface MetricsOverviewProps {
  analytics: Analytics[];
}

export function MetricsOverview({ analytics }: MetricsOverviewProps) {
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
    { label: "Total Impressions", value: totalImpressions.toLocaleString("id-ID") },
    { label: "Total Reach", value: totalReach.toLocaleString("id-ID") },
    { label: "Avg. Engagement Rate", value: `${avgEngagement.toFixed(1)}%` },
    { label: "Total Likes", value: totalLikes.toLocaleString("id-ID") },
    { label: "Total Komentar", value: totalComments.toLocaleString("id-ID") },
    { label: "Total Share", value: totalShares.toLocaleString("id-ID") },
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
