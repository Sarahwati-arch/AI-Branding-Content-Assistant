"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";
import { Skeleton } from "@/components/ui/skeleton";
import type { BrandProfile, BrandGuidelines } from "@/types";

type BrandWithGuidelines = BrandProfile & { brand_guidelines: BrandGuidelines[] };

export default function BrandingPage() {
  const [brands, setBrands] = useState<BrandWithGuidelines[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/brands");
      const data = await res.json();
      setBrands(data.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Branding</h1>
            <p className="text-muted-foreground mt-1">Kelola brand profile Anda</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Branding</h1>
          <p className="text-muted-foreground mt-1">Kelola brand profile Anda</p>
        </div>
        <Link href="/branding/new">
          <Button>
            <Plus size={18} className="mr-2" />
            Buat Brand Baru
          </Button>
        </Link>
      </div>

      {brands.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-xl bg-secondary/30">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-float">
            <Palette size={32} className="text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Belum ada brand
          </h2>
          <p className="text-muted-foreground mt-2 mb-6 max-w-md mx-auto">
            Buat brand profile pertama Anda dan biarkan AI generate brand kit
          </p>
          <Link href="/branding/new">
            <Button>
              <Plus size={18} className="mr-2" />
              Buat Brand Pertama
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((brand, i) => (
            <AnimateIn key={brand.id} animation="fade-in-up" delay={i * 100}>
              <Link
                href={`/branding/${brand.id}`}
                className="block p-5 rounded-xl border border-border bg-card hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 transition-all duration-200 border-t-2 border-t-primary"
              >
                <div className="flex items-start gap-4">
                  {brand.logo_url && !imgErrors.has(brand.id) ? (
                    <img
                      src={brand.logo_url}
                      alt={brand.brand_name}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={() =>
                        setImgErrors((prev) => new Set(prev).add(brand.id))
                      }
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Palette size={24} className="text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {brand.brand_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{brand.industry}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                  {brand.description}
                </p>
                {brand.brand_guidelines?.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        backgroundColor: brand.brand_guidelines[0].primary_color,
                      }}
                    />
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        backgroundColor: brand.brand_guidelines[0].secondary_color,
                      }}
                    />
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        backgroundColor: brand.brand_guidelines[0].accent_color,
                      }}
                    />
                    <Badge variant="success" dot>Brand Kit</Badge>
                  </div>
                )}
              </Link>
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
}
