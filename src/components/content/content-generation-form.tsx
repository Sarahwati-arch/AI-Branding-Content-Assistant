"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getContentTypes, PLATFORMS } from "@/lib/constants";
import { useTranslations } from "next-intl";
import type { ContentType, Platform, BrandProfile } from "@/types";

interface ContentGenerationFormProps {
  onSubmit: (data: {
    brandId: string;
    contentType: ContentType;
    platform: Platform;
    topic: string;
    additionalContext?: string;
  }) => void;
  loading: boolean;
}

export function ContentGenerationForm({ onSubmit, loading }: ContentGenerationFormProps) {
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [brandId, setBrandId] = useState("");
  const [contentType, setContentType] = useState<ContentType>("post");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [topic, setTopic] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const t = useTranslations();

  const contentTypes = getContentTypes(t);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/brands");
      const data = await res.json();
      setBrands(data.data || []);
      if (data.data?.length > 0) {
        setBrandId(data.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ brandId, contentType, platform, topic, additionalContext });
  };

  const isValid = brandId && topic;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Select
        id="brand"
        label={t("contentForm.brand")}
        value={brandId}
        onChange={(e) => setBrandId(e.target.value)}
        options={brands.map((b) => ({ value: b.id, label: b.brand_name }))}
        placeholder={t("contentForm.brandPlaceholder")}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          id="contentType"
          label={t("contentForm.contentType")}
          value={contentType}
          onChange={(e) => setContentType(e.target.value as ContentType)}
          options={contentTypes}
        />
        <Select
          id="platform"
          label={t("contentForm.platform")}
          value={platform}
          onChange={(e) => setPlatform(e.target.value as Platform)}
          options={PLATFORMS.map((p) => ({ value: p.value, label: p.label }))}
        />
      </div>

      <Input
        id="topic"
        label={t("contentForm.topic")}
        placeholder={t("contentForm.topicPlaceholder")}
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        required
      />

      <Textarea
        id="additionalContext"
        label={t("contentForm.additionalContext")}
        placeholder={t("contentForm.additionalContextPlaceholder")}
        rows={3}
        value={additionalContext}
        onChange={(e) => setAdditionalContext(e.target.value)}
      />

      <Button type="submit" disabled={!isValid || loading} className="w-full">
        {loading ? t("contentForm.generating") : t("contentForm.generate")}
      </Button>
    </form>
  );
}
