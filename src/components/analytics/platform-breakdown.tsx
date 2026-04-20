"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PLATFORMS } from "@/lib/constants";
import type { Analytics, Platform } from "@/types";

interface PlatformBreakdownProps {
  analytics: Analytics[];
}

export function PlatformBreakdown({ analytics }: PlatformBreakdownProps) {
  const platformData = analytics.reduce(
    (acc, a) => {
      const p = a.platform as Platform;
      const existing = acc.find((d) => d.platform === p);
      if (existing) {
        existing.impressions += a.impressions;
        existing.count += 1;
      } else {
        acc.push({
          platform: p,
          impressions: a.impressions,
          count: 1,
          color: PLATFORMS.find((pl) => pl.value === p)?.color || "#94a3b8",
        });
      }
      return acc;
    },
    [] as { platform: Platform; impressions: number; count: number; color: string }[]
  );

  if (platformData.length === 0) {
    return (
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Per Platform</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          Belum ada data platform
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Per Platform</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={platformData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              dataKey="impressions"
              nameKey="platform"
              label={({ name }) =>
                PLATFORMS.find((p) => p.value === name)?.label || String(name)
              }
            >
              {platformData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
              formatter={(value, name) => [
                Number(value).toLocaleString("id-ID"),
                PLATFORMS.find((p) => p.value === name)?.label || String(name),
              ]}
            />
            <Legend
              formatter={(value) =>
                PLATFORMS.find((p) => p.value === value)?.label || value
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
