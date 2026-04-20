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

interface EngagementChartProps {
  analytics: Analytics[];
}

export function EngagementChart({ analytics }: EngagementChartProps) {
  // Group by date
  const chartData = analytics.reduce(
    (acc, a) => {
      const date = new Date(a.recorded_at).toLocaleDateString("id-ID", {
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
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Engagement</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          Belum ada data engagement
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Engagement</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="likes" fill="#6366f1" name="Likes" radius={[4, 4, 0, 0]} />
            <Bar dataKey="comments" fill="#f59e0b" name="Komentar" radius={[4, 4, 0, 0]} />
            <Bar dataKey="shares" fill="#10b981" name="Share" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
