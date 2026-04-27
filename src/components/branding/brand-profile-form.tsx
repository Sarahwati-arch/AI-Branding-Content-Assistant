"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getProductCategories, getVisualStyles, PRODUCT_CATEGORY_KEYS, VISUAL_STYLE_KEYS } from "@/lib/constants";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();

  const categories = getProductCategories(t);
  const visualStyles = getVisualStyles(t);

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
        label={t("brandForm.brandName")}
        placeholder={t("brandForm.brandNamePlaceholder")}
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        required
      />

      <Select
        id="industry"
        label={t("brandForm.industry")}
        placeholder={t("brandForm.industryPlaceholder")}
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        options={categories}
        required
      />

      <Textarea
        id="description"
        label={t("brandForm.description")}
        placeholder={t("brandForm.descriptionPlaceholder")}
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <Textarea
        id="targetAudience"
        label={t("brandForm.targetAudience")}
        placeholder={t("brandForm.targetAudiencePlaceholder")}
        rows={2}
        value={targetAudience}
        onChange={(e) => setTargetAudience(e.target.value)}
        required
      />

      <Textarea
        id="uniqueValue"
        label={t("brandForm.uniqueValue")}
        placeholder={t("brandForm.uniqueValuePlaceholder")}
        rows={2}
        value={uniqueValue}
        onChange={(e) => setUniqueValue(e.target.value)}
        required
      />

      <Select
        id="visualStyle"
        label={t("brandForm.visualStyle")}
        placeholder={t("brandForm.visualStylePlaceholder")}
        value={visualStyle}
        onChange={(e) => setVisualStyle(e.target.value)}
        options={visualStyles.map((style) => ({ value: style, label: style }))}
        required
      />

      <Button type="submit" disabled={!isValid || loading} className="w-full">
        {loading ? t("brandForm.generating") : t("brandForm.generate")}
      </Button>
    </form>
  );
}
