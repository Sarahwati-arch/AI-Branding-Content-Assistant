"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandProfileForm } from "@/components/branding/brand-profile-form";
import { BrandKitDisplay } from "@/components/branding/brand-kit-display";
import type { BrandKitOutput } from "@/lib/openai/schemas/branding";

export default function NewBrandPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "preview">("form");
  const [brandData, setBrandData] = useState<{
    brandName: string;
    industry: string;
    description: string;
    targetAudience: string;
    uniqueValue: string;
    visualStyle: string;
  } | null>(null);
  const [brandKit, setBrandKit] = useState<BrandKitOutput | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [generatingBrand, setGeneratingBrand] = useState(false);
  const [generatingLogo, setGeneratingLogo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBrand = async (data: typeof brandData) => {
    setBrandData(data);
    setGeneratingBrand(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/generate-brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Gagal generate brand kit");
        setGeneratingBrand(false);
        return;
      }

      setBrandKit(result.data);
      setStep("preview");
    } catch {
      setError("Terjadi kesalahan koneksi");
    } finally {
      setGeneratingBrand(false);
    }
  };

  const handleGenerateLogo = async () => {
    if (!brandData || !brandKit) return;
    setGeneratingLogo(true);

    try {
      const res = await fetch("/api/ai/generate-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...brandData,
          brandGuidelines: {
            primary_color: brandKit.primary_color,
            visual_style: brandKit.visual_style,
          },
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setLogoUrl(result.url);
      }
    } catch {
      // silently fail
    } finally {
      setGeneratingLogo(false);
    }
  };

  const handleSave = async () => {
    if (!brandData || !brandKit) return;
    setSaving(true);

    try {
      // Create brand
      const brandRes = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: brandData.brandName,
          industry: brandData.industry,
          description: brandData.description,
          target_audience: brandData.targetAudience,
          unique_value: brandData.uniqueValue,
          logo_url: logoUrl,
        }),
      });

      const brandResult = await brandRes.json();
      if (!brandRes.ok) {
        setError(brandResult.error || "Gagal menyimpan brand");
        setSaving(false);
        return;
      }

      // Save brand guidelines
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error: guidelinesError } = await supabase
        .from("brand_guidelines")
        .insert({
          brand_id: brandResult.data.id,
          ...brandKit,
        });

      if (guidelinesError) {
        setError("Brand tersimpan tapi gagal menyimpan guidelines");
        setSaving(false);
        return;
      }

      router.push("/branding");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan saat menyimpan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Buat Brand Baru</h1>
        <p className="text-muted-foreground mt-1">
          {step === "form"
            ? "Isi informasi brand Anda dan AI akan generate brand kit"
            : "Preview brand kit yang di-generate AI"}
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      {step === "form" && (
        <div className="p-6 rounded-xl border border-border bg-card">
          <BrandProfileForm onSubmit={handleGenerateBrand} loading={generatingBrand} />
        </div>
      )}

      {step === "preview" && brandKit && (
        <>
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setStep("form")}
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              &larr; Kembali ke form
            </button>
          </div>
          <BrandKitDisplay
            kit={brandKit}
            logoUrl={logoUrl}
            onGenerateLogo={handleGenerateLogo}
            generatingLogo={generatingLogo}
            onSave={handleSave}
            saving={saving}
          />
        </>
      )}
    </div>
  );
}
