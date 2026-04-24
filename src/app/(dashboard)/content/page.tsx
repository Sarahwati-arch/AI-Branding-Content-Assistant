"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/content/content-card";
import { AnimateIn } from "@/components/ui/animate-in";
import { Skeleton } from "@/components/ui/skeleton";
import type { Content } from "@/types";

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      setContents(data.data || []);
    } catch (error) {
      console.error("Error fetching contents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus konten ini?")) return;
    try {
      await fetch(`/api/content/${id}`, { method: "DELETE" });
      setContents((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Konten</h1>
          <p className="text-muted-foreground mt-1">Kelola konten media sosial Anda</p>
        </div>
        <Link href="/content/generate">
          <Button>
            <Plus size={18} className="mr-2" />
            Generate Konten
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : contents.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-xl bg-secondary/30">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-float">
            <FileText size={32} className="text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Belum ada konten</h2>
          <p className="text-muted-foreground mt-2 mb-6 max-w-md mx-auto">
            Generate konten pertama Anda dengan bantuan AI
          </p>
          <Link href="/content/generate">
            <Button>
              <Plus size={18} className="mr-2" />
              Generate Konten Pertama
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.map((content, i) => (
            <AnimateIn key={content.id} animation="fade-in-up" delay={i * 100}>
              <ContentCard
                content={content}
                onDelete={handleDelete}
              />
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
}
