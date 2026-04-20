"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { PLATFORMS, CONTENT_TYPES } from "@/lib/constants";
import type { Content } from "@/types";

export default function ContentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");

  useEffect(() => {
    fetchContent();
  }, [params.id]);

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/content/${params.id}`);
      const data = await res.json();
      if (res.ok) {
        setContent(data.data);
        setTitle(data.data.title);
        setCaption(data.data.caption);
        setHashtags((data.data.hashtags || []).join(", "));
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/content/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          caption,
          hashtags: hashtags.split(",").map((h) => h.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push("/content");
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating content:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus konten ini?")) return;
    try {
      await fetch(`/api/content/${params.id}`, { method: "DELETE" });
      router.push("/content");
      router.refresh();
    } catch (error) {
      console.error("Error deleting content:", error);
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

  if (!content) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-semibold">Konten tidak ditemukan</h2>
        <Link href="/content" className="text-primary mt-2 inline-block">
          Kembali ke daftar konten
        </Link>
      </div>
    );
  }

  const platform = PLATFORMS.find((p) => p.value === content.platform);

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/content"
        className="text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1 mb-4"
      >
        <ArrowLeft size={14} />
        Kembali
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Konten</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge>{content.type}</Badge>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: platform ? `${platform.color}15` : "transparent",
                color: platform?.color,
              }}
            >
              {platform?.label}
            </span>
          </div>
        </div>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 size={14} className="mr-1" />
          Hapus
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-5 p-6 rounded-xl border border-border bg-card">
        <Input
          id="title"
          label="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          id="caption"
          label="Caption"
          rows={6}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <Input
          id="hashtags"
          label="Hashtag (pisahkan dengan koma)"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
        {content.visual_url && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Visual
            </label>
            <img
              src={content.visual_url}
              alt="Content visual"
              className="rounded-lg max-h-64"
            />
          </div>
        )}
        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            <Save size={16} className="mr-2" />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
