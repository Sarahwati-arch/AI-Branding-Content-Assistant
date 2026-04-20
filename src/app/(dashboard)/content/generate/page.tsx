"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContentGenerationForm } from "@/components/content/content-generation-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from "lucide-react";
import type { ContentType, Platform } from "@/types";

export default function GenerateContentPage() {
  const router = useRouter();
  const [generatedData, setGeneratedData] = useState<{
    title: string;
    caption: string;
    hashtags: string[];
    visual_description: string;
    posting_time_suggestion: string;
  } | null>(null);
  const [visualUrl, setVisualUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generatingVisual, setGeneratingVisual] = useState(false);
  const [saving, setSaving] = useState(false);
  const [requestData, setRequestData] = useState<{
    brandId: string;
    contentType: ContentType;
    platform: Platform;
    topic: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: {
    brandId: string;
    contentType: ContentType;
    platform: Platform;
    topic: string;
    additionalContext?: string;
  }) => {
    setGenerating(true);
    setError(null);
    setRequestData(data);

    try {
      const res = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Gagal generate konten");
        return;
      }

      setGeneratedData(result.data);
    } catch {
      setError("Terjadi kesalahan koneksi");
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateVisual = async () => {
    if (!generatedData || !requestData) return;
    setGeneratingVisual(true);

    try {
      const res = await fetch("/api/ai/generate-visual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandId: requestData.brandId,
          platform: requestData.platform,
          description: generatedData.visual_description,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setVisualUrl(result.url);
      }
    } catch {
      // silently fail
    } finally {
      setGeneratingVisual(false);
    }
  };

  const handleSave = async () => {
    if (!generatedData || !requestData) return;
    setSaving(true);

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_id: requestData.brandId,
          title: generatedData.title,
          type: requestData.contentType,
          platform: requestData.platform,
          caption: generatedData.caption,
          hashtags: generatedData.hashtags,
          visual_url: visualUrl,
          status: "generated",
        }),
      });

      if (res.ok) {
        router.push("/content");
        router.refresh();
      }
    } catch {
      setError("Gagal menyimpan konten");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1 mb-4"
      >
        <ArrowLeft size={14} />
        Kembali
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-6">
        Generate Konten
      </h1>

      {error && (
        <div className="mb-6 bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Pengaturan</h2>
          <ContentGenerationForm onSubmit={handleGenerate} loading={generating} />
        </div>

        <div className="space-y-4">
          {generatedData ? (
            <>
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-foreground">
                    {generatedData.title}
                  </h2>
                  <Badge variant="success">Generated</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Waktu posting terbaik: {generatedData.posting_time_suggestion}
                </p>
                <div className="bg-secondary/50 rounded-lg p-4 mb-3">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {generatedData.caption}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {generatedData.hashtags.map((tag, i) => (
                    <span key={i} className="text-xs text-primary">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-3">Visual Asset</h3>
                {visualUrl ? (
                  <img src={visualUrl} alt="Generated visual" className="rounded-lg w-full" />
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {generatedData.visual_description}
                    </p>
                    <Button onClick={handleGenerateVisual} disabled={generatingVisual} variant="outline" className="w-full">
                      <ImageIcon size={16} className="mr-2" />
                      {generatingVisual ? "Generating..." : "Generate Visual"}
                    </Button>
                  </div>
                )}
              </div>

              <Button onClick={handleSave} disabled={saving} className="w-full" size="lg">
                <Save size={16} className="mr-2" />
                {saving ? "Menyimpan..." : "Simpan Konten"}
              </Button>
            </>
          ) : (
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <Sparkles size={32} className="text-primary mx-auto mb-3" />
              <p className="text-muted-foreground">
                Isi form di samping dan klik generate untuk membuat konten
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
