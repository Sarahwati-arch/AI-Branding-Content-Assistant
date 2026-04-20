"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lightbulb, TrendingUp, Clock, Target, Share2 } from "lucide-react";
import type { AIRecommendation } from "@/types";

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
  loading: boolean;
  onRequestRecommendations: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  content: <Lightbulb size={18} />,
  timing: <Clock size={18} />,
  platform: <Share2 size={18} />,
  strategy: <TrendingUp size={18} />,
};

const priorityVariant: Record<string, "destructive" | "primary" | "secondary"> = {
  high: "destructive",
  medium: "primary",
  low: "secondary",
};

const priorityLabel: Record<string, string> = {
  high: "Prioritas Tinggi",
  medium: "Prioritas Sedang",
  low: "Prioritas Rendah",
};

export function AIRecommendations({
  recommendations,
  loading,
  onRequestRecommendations,
}: AIRecommendationsProps) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Rekomendasi AI</h3>
        </div>
        <Button onClick={onRequestRecommendations} disabled={loading} variant="outline" size="sm">
          {loading ? "Menganalisis..." : "Minta Rekomendasi"}
        </Button>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <Target size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Klik tombol di atas untuk mendapatkan rekomendasi strategi dari AI
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-primary">{iconMap[rec.type] || <Lightbulb size={18} />}</div>
                  <h4 className="font-medium text-foreground">{rec.title}</h4>
                </div>
                <Badge variant={priorityVariant[rec.priority] || "default"}>
                  {priorityLabel[rec.priority] || rec.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
              <div className="bg-background rounded-lg p-3">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Langkah:</span> {rec.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
