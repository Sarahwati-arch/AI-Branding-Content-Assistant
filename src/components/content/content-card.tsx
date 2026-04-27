"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Content, Platform } from "@/types";
import { PLATFORMS } from "@/lib/constants";
import { Edit2, Trash2, Calendar } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocaleStore } from "@/i18n/locale";

interface ContentCardProps {
  content: Content;
  onDelete?: (id: string) => void;
}

export function ContentCard({ content, onDelete }: ContentCardProps) {
  const platform = PLATFORMS.find((p) => p.value === content.platform);
  const t = useTranslations();
  const { locale } = useLocaleStore();

  const dateLocale = locale === "en" ? "en-US" : "id-ID";

  const statusVariants: Record<string, "default" | "primary" | "secondary" | "success"> = {
    draft: "default",
    generated: "primary",
    scheduled: "secondary",
    published: "success",
  };

  const statusLabels: Record<string, string> = {
    draft: t("common.draft"),
    generated: t("common.generated"),
    scheduled: t("common.scheduled"),
    published: t("common.published"),
  };

  return (
    <div className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{content.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant={statusVariants[content.status] || "default"}
            >
              {statusLabels[content.status] || content.status}
            </Badge>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: platform ? `${platform.color}15` : "transparent",
                color: platform?.color,
              }}
            >
              {platform?.label || content.platform}
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <Link href={`/content/${content.id}`}>
            <Button variant="ghost" size="icon">
              <Edit2 size={14} />
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(content.id)}
            >
              <Trash2 size={14} />
            </Button>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {content.caption}
      </p>

      {content.hashtags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {content.hashtags.slice(0, 5).map((tag, i) => (
            <span key={i} className="text-xs text-primary">
              #{tag}
            </span>
          ))}
          {content.hashtags.length > 5 && (
            <span className="text-xs text-muted-foreground">
              +{content.hashtags.length - 5} {t("common.more")}
            </span>
          )}
        </div>
      )}

      {content.scheduled_at && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar size={12} />
          {new Date(content.scheduled_at).toLocaleDateString(dateLocale, {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}
    </div>
  );
}
