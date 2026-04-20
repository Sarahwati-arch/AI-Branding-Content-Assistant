"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES, VISUAL_STYLES } from "@/lib/constants";

interface BrandProfileFormProps {
  onSubmit: (data: {
    brandName: string;
    industry: string;
    description: string;
    targetAudience: string;
    uniqueValue: string;
    visualStyle: string;
  }) => void;
  loading: boolean;
}

export function BrandProfileForm({ onSubmit, loading }: BrandProfileFormProps) {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [uniqueValue, setUniqueValue] = useState("");
  const [visualStyle, setVisualStyle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ brandName, industry, description, targetAudience, uniqueValue, visualStyle });
  };

  const isValid =
    brandName && industry && description && targetAudience && uniqueValue && visualStyle;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        id="brandName"
        label="Nama Brand"
        placeholder="Contoh: Kopi Nusantara"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        required
      />

      <Select
        id="industry"
        label="Industri"
        placeholder="Pilih industri"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        options={PRODUCT_CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
        required
      />

      <Textarea
        id="description"
        label="Deskripsi Brand"
        placeholder="Ceritakan tentang brand Anda..."
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <Textarea
        id="targetAudience"
        label="Target Audiens"
        placeholder="Contoh: Wanita 25-35 tahun, urban, tertarik gaya hidup sehat"
        rows={2}
        value={targetAudience}
        onChange={(e) => setTargetAudience(e.target.value)}
        required
      />

      <Textarea
        id="uniqueValue"
        label="Nilai Unik / USP"
        placeholder="Apa yang membuat brand Anda berbeda?"
        rows={2}
        value={uniqueValue}
        onChange={(e) => setUniqueValue(e.target.value)}
        required
      />

      <Select
        id="visualStyle"
        label="Gaya Visual"
        placeholder="Pilih gaya visual"
        value={visualStyle}
        onChange={(e) => setVisualStyle(e.target.value)}
        options={VISUAL_STYLES.map((style) => ({ value: style, label: style }))}
        required
      />

      <Button type="submit" disabled={!isValid || loading} className="w-full">
        {loading ? "Generating Brand Kit..." : "Generate Brand Kit dengan AI"}
      </Button>
    </form>
  );
}
