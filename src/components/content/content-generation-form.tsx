"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CONTENT_TYPES, PLATFORMS } from "@/lib/constants";
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
        label="Brand"
        value={brandId}
        onChange={(e) => setBrandId(e.target.value)}
        options={brands.map((b) => ({ value: b.id, label: b.brand_name }))}
        placeholder="Pilih brand"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          id="contentType"
          label="Tipe Konten"
          value={contentType}
          onChange={(e) => setContentType(e.target.value as ContentType)}
          options={CONTENT_TYPES.map((t) => ({ value: t.value, label: t.label }))}
        />
        <Select
          id="platform"
          label="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value as Platform)}
          options={PLATFORMS.map((p) => ({ value: p.value, label: p.label }))}
        />
      </div>

      <Input
        id="topic"
        label="Topik / Tema"
        placeholder="Contoh: Tips menjaga kulit sehat di musim hujan"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        required
      />

      <Textarea
        id="additionalContext"
        label="Konteks Tambahan (opsional)"
        placeholder="Informasi tambahan untuk AI..."
        rows={3}
        value={additionalContext}
        onChange={(e) => setAdditionalContext(e.target.value)}
      />

      <Button type="submit" disabled={!isValid || loading} className="w-full">
        {loading ? "Generating Konten..." : "Generate Konten dengan AI"}
      </Button>
    </form>
  );
}
