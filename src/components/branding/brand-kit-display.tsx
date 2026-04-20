"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BrandKitOutput } from "@/lib/openai/schemas/branding";
import Image from "next/image";

interface BrandKitDisplayProps {
  kit: BrandKitOutput;
  logoUrl?: string | null;
  onGenerateLogo?: () => void;
  generatingLogo?: boolean;
  onSave?: () => void;
  saving?: boolean;
}

export function BrandKitDisplay({
  kit,
  logoUrl,
  onGenerateLogo,
  generatingLogo,
  onSave,
  saving,
}: BrandKitDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Logo Section */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Logo</h3>
        {logoUrl ? (
          <div className="flex justify-center">
            <Image
              src={logoUrl}
              alt="Brand Logo"
              width={256}
              height={256}
              className="rounded-xl"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-32 h-32 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
              Belum ada logo
            </div>
            {onGenerateLogo && (
              <Button onClick={onGenerateLogo} disabled={generatingLogo} variant="outline">
                {generatingLogo ? "Generating Logo..." : "Generate Logo dengan DALL-E"}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Palet Warna</h3>
        <div className="flex gap-4">
          <div className="flex-1 text-center">
            <div
              className="w-full h-20 rounded-lg mb-2"
              style={{ backgroundColor: kit.primary_color }}
            />
            <p className="text-xs text-muted-foreground">Utama</p>
            <p className="text-xs font-mono">{kit.primary_color}</p>
          </div>
          <div className="flex-1 text-center">
            <div
              className="w-full h-20 rounded-lg mb-2"
              style={{ backgroundColor: kit.secondary_color }}
            />
            <p className="text-xs text-muted-foreground">Sekunder</p>
            <p className="text-xs font-mono">{kit.secondary_color}</p>
          </div>
          <div className="flex-1 text-center">
            <div
              className="w-full h-20 rounded-lg mb-2"
              style={{ backgroundColor: kit.accent_color }}
            />
            <p className="text-xs text-muted-foreground">Aksen</p>
            <p className="text-xs font-mono">{kit.accent_color}</p>
          </div>
        </div>
      </div>

      {/* Typography & Tone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
            Tipografi
          </h3>
          <p className="text-foreground font-medium">{kit.typography}</p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
            Tagline
          </h3>
          <p className="text-foreground font-medium text-lg">&ldquo;{kit.tagline}&rdquo;</p>
        </div>
      </div>

      {/* Mission */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
          Misi Brand
        </h3>
        <p className="text-foreground">{kit.mission}</p>
      </div>

      {/* Tone of Voice */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
          Tone of Voice
        </h3>
        <p className="text-foreground">{kit.tone_of_voice}</p>
      </div>

      {/* Visual Style */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
          Gaya Visual
        </h3>
        <p className="text-foreground">{kit.visual_style}</p>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold text-success uppercase mb-3">
            Panduan (Do)
          </h3>
          <div className="space-y-2">
            {kit.do_list.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Badge variant="success">Ya</Badge>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold text-destructive uppercase mb-3">
            Larangan (Don&apos;t)
          </h3>
          <div className="space-y-2">
            {kit.dont_list.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Badge variant="destructive">Tidak</Badge>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      {onSave && (
        <div className="flex justify-end">
          <Button onClick={onSave} disabled={saving} size="lg">
            {saving ? "Menyimpan..." : "Simpan Brand Kit"}
          </Button>
        </div>
      )}
    </div>
  );
}
