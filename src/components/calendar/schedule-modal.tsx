"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLATFORMS, getContentTypes } from "@/lib/constants";
import { format } from "date-fns";
import { Search, FileText, PenLine } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Content } from "@/types";

type ScheduleMode = "select" | "manual";

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSubmit: (data: {
    title: string;
    description: string;
    platform: string;
    scheduled_at: string;
    content_id?: string | null;
  }) => void;
  loading?: boolean;
}

export function ScheduleModal({
  open,
  onClose,
  selectedDate,
  onSubmit,
  loading,
}: ScheduleModalProps) {
  const [mode, setMode] = useState<ScheduleMode>("select");
  const [contents, setContents] = useState<Content[]>([]);
  const [fetchingContents, setFetchingContents] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const t = useTranslations();

  // Manual form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [scheduledAt, setScheduledAt] = useState(
    selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : ""
  );

  useEffect(() => {
    if (open) {
      fetchContents();
      setScheduledAt(selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : "");
    }
  }, [open, selectedDate]);

  const fetchContents = async () => {
    setFetchingContents(true);
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      // Only show unscheduled content (draft or generated)
      const available = (data.data || []).filter(
        (c: Content) => c.status === "draft" || c.status === "generated"
      );
      setContents(available);
    } catch (error) {
      console.error("Error fetching contents:", error);
    } finally {
      setFetchingContents(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPlatform("instagram");
    setSelectedContent(null);
    setSearchQuery("");
    setMode("select");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSelectContent = (content: Content) => {
    if (selectedContent?.id === content.id) {
      setSelectedContent(null);
      return;
    }
    setSelectedContent(content);
    setTitle(content.title);
    setDescription(content.caption || "");
    setPlatform(content.platform);
  };

  const handleSelectSubmit = () => {
    if (!selectedContent) return;
    onSubmit({
      title: selectedContent.title,
      description: selectedContent.caption || "",
      platform: selectedContent.platform,
      scheduled_at: new Date(scheduledAt).toISOString(),
      content_id: selectedContent.id,
    });
    handleClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      platform,
      scheduled_at: new Date(scheduledAt).toISOString(),
      content_id: null,
    });
    handleClose();
  };

  const filteredContents = contents.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caption?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPlatformLabel = (value: string) =>
    PLATFORMS.find((p) => p.value === value)?.label || value;

  const getPlatformColor = (value: string) =>
    PLATFORMS.find((p) => p.value === value)?.color || "#64748b";

  const getContentTypeLabel = (value: string) =>
    getContentTypes(t).find((ct) => ct.value === value)?.label || value;

  const getStatusBadge = (status: string) => {
    const map: Record<string, { variant: "info" | "success" | "warning" | "default"; label: string }> = {
      draft: { variant: "default", label: t("common.draft") },
      generated: { variant: "info", label: t("common.generated") },
      scheduled: { variant: "warning", label: t("common.scheduled") },
      published: { variant: "success", label: t("common.published") },
    };
    const s = map[status] || { variant: "default" as const, label: status };
    return <Badge variant={s.variant}>{s.label}</Badge>;
  };

  return (
    <Dialog open={open} onClose={handleClose} title={t("scheduleModal.title")}>
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-4 border-b border-border pb-3">
        <button
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "select"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setMode("select")}
        >
          <FileText size={16} />
          {t("scheduleModal.selectContent")}
        </button>
        <button
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            mode === "manual"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setMode("manual")}
        >
          <PenLine size={16} />
          {t("scheduleModal.addManual")}
        </button>
      </div>

      {/* Shared: Date picker */}
      <div className="mb-4">
        <Input
          id="scheduleDate"
          label={t("scheduleModal.dateTime")}
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          required
        />
      </div>

      {mode === "select" ? (
        /* ===== SELECT EXISTING CONTENT ===== */
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("scheduleModal.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Content list */}
          {fetchingContents ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              {t("scheduleModal.loadingContent")}
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                {contents.length === 0
                  ? t("scheduleModal.noContent")
                  : t("scheduleModal.noSearchResult")}
              </p>
              <button
                type="button"
                className="mt-2 text-sm text-primary hover:underline"
                onClick={() => setMode("manual")}
              >
                {t("scheduleModal.addManualLink")}
              </button>
            </div>
          ) : (
            <div className="max-h-[280px] overflow-y-auto space-y-2">
              {filteredContents.map((content) => {
                const isSelected = selectedContent?.id === content.id;
                return (
                  <div
                    key={content.id}
                    className={`p-3 rounded-lg border cursor-pointer transition ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                    onClick={() => handleSelectContent(content)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {content.title}
                        </p>
                        {content.caption && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {content.caption}
                          </p>
                        )}
                      </div>
                      {getStatusBadge(content.status)}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${getPlatformColor(content.platform)}15`,
                          color: getPlatformColor(content.platform),
                        }}
                      >
                        {getPlatformLabel(content.platform)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {getContentTypeLabel(content.type)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Submit for select mode */}
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              {t("common.cancel")}
            </Button>
            <Button type="button" disabled={!selectedContent || loading} onClick={handleSelectSubmit}>
              {loading ? t("common.saving") : t("scheduleModal.schedule")}
            </Button>
          </div>
        </div>
      ) : (
        /* ===== MANUAL ENTRY ===== */
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <Input
            id="scheduleTitle"
            label={t("scheduleModal.titleField")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("scheduleModal.titlePlaceholder")}
            required
          />
          <Textarea
            id="scheduleDesc"
            label={t("scheduleModal.description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder={t("scheduleModal.descriptionPlaceholder")}
          />
          <Select
            id="schedulePlatform"
            label={t("scheduleModal.platform")}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            options={PLATFORMS.map((p) => ({ value: p.value, label: p.label }))}
          />
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={handleClose}>
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t("common.saving") : t("scheduleModal.schedule")}
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
