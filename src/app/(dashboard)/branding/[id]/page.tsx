"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BrandKitDisplay } from "@/components/branding/brand-kit-display";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import type { BrandProfile, BrandGuidelines } from "@/types";

type BrandWithGuidelines = BrandProfile & { brand_guidelines: BrandGuidelines[] };

export default function BrandDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [brand, setBrand] = useState<BrandWithGuidelines | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrand();
  }, [params.id]);

  const fetchBrand = async () => {
    try {
      const res = await fetch(`/api/brands/${params.id}`);
      const data = await res.json();
      if (res.ok) {
        setBrand(data.data);
      }
    } catch (error) {
      console.error("Error fetching brand:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus brand ini?")) return;

    try {
      const res = await fetch(`/api/brands/${params.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/branding");
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-semibold text-foreground">Brand tidak ditemukan</h2>
        <Link href="/branding" className="text-primary mt-2 inline-block">
          Kembali ke daftar brand
        </Link>
      </div>
    );
  }

  const guidelines = brand.brand_guidelines?.[0];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/branding"
            className="text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1 mb-2"
          >
            <ArrowLeft size={14} />
            Kembali
          </Link>
          <h1 className="text-2xl font-bold text-foreground">{brand.brand_name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge>{brand.industry}</Badge>
            {guidelines && <Badge variant="success">Brand Kit Lengkap</Badge>}
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/branding/${brand.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit2 size={14} className="mr-1" />
              Edit
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 size={14} className="mr-1" />
            Hapus
          </Button>
        </div>
      </div>

      {guidelines ? (
        <BrandKitDisplay kit={guidelines} logoUrl={brand.logo_url} />
      ) : (
        <div className="text-center py-16 p-6 rounded-xl border border-border bg-card">
          <p className="text-muted-foreground mb-4">
            Brand kit belum di-generate
          </p>
          <Link href={`/branding/${brand.id}/edit`}>
            <Button>Edit & Generate Brand Kit</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
