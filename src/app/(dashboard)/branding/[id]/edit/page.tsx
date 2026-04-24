"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BrandProfileForm } from "@/components/branding/brand-profile-form";
import { BrandKitDisplay } from "@/components/branding/brand-kit-display";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useBreadcrumb } from "@/components/layout/breadcrumb-provider";
import type { BrandKitOutput } from "@/lib/openai/schemas/branding";

export default function EditBrandPage() {
  const params = useParams();
  const router = useRouter();
  const { setOverride } = useBreadcrumb();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchBrand();
  }, [params.id]);

  const fetchBrand = async () => {
    try {
      const res = await fetch(`/api/brands/${params.id}`, { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        const brand = data.data;
        setBrandData({
          brandName: brand.brand_name,
          industry: brand.industry,
          description: brand.description,
          targetAudience: brand.target_audience,
          uniqueValue: brand.unique_value,
          visualStyle: "",
        });
        setLogoUrl(brand.logo_url);
        if (brand.brand_name) {
          setOverride(params.id as string, brand.brand_name);
        }
      }
    } catch (error) {
      console.error("Error fetching brand:", error);
    } finally {
      setLoading(false);
    }
  };

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
      const res = await fetch(`/api/brands/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: brandData.brandName,
          industry: brandData.industry,
          description: brandData.description,
          target_audience: brandData.targetAudience,
          unique_value: brandData.uniqueValue,
          logo_url: logoUrl,
          brand_guidelines: brandKit,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Gagal mengupdate brand");
        setSaving(false);
        return;
      }

      // Full page reload to ensure fresh data
      window.location.href = `/branding/${params.id}`;
    } catch {
      setError("Terjadi kesalahan saat menyimpan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href={`/branding/${params.id}`}
          className="text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1 mb-2"
        >
          <ArrowLeft size={14} />
          Kembali ke detail brand
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Edit Brand</h1>
        <p className="text-muted-foreground mt-1">
          {step === "form"
            ? "Perbarui informasi brand dan generate ulang brand kit"
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
