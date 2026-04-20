"use client";

import { useEffect, useState } from "react";
import { MetricsOverview } from "@/components/analytics/metrics-overview";
import { EngagementChart } from "@/components/analytics/engagement-chart";
import { PlatformBreakdown } from "@/components/analytics/platform-breakdown";
import { AIRecommendations } from "@/components/analytics/ai-recommendations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import { Plus, BarChart3 } from "lucide-react";
import { PLATFORMS } from "@/lib/constants";
import type { Analytics, Content, AIRecommendation } from "@/types";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  // Form state
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [impressions, setImpressions] = useState("");
  const [reach, setReach] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");
  const [saves, setSaves] = useState("");
  const [clicks, setClicks] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, contentRes] = await Promise.all([
        fetch("/api/analytics"),
        fetch("/api/content"),
      ]);
      const analyticsData = await analyticsRes.json();
      const contentData = await contentRes.json();
      setAnalytics(analyticsData.data || []);
      setContents(contentData.data || []);
      if (contentData.data?.length > 0) {
        setSelectedContent(contentData.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnalytics = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);

    const engRate =
      impressions && (Number(likes) + Number(comments) + Number(shares) + Number(saves))
        ? ((Number(likes) + Number(comments) + Number(shares) + Number(saves)) / Number(impressions)) * 100
        : 0;

    try {
      const res = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content_id: selectedContent,
          platform: selectedPlatform,
          impressions: Number(impressions) || 0,
          reach: Number(reach) || 0,
          likes: Number(likes) || 0,
          comments: Number(comments) || 0,
          shares: Number(shares) || 0,
          saves: Number(saves) || 0,
          clicks: Number(clicks) || 0,
          engagement_rate: Number(engRate.toFixed(2)),
        }),
      });

      if (res.ok) {
        await fetchData();
        setAddModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error adding analytics:", error);
    } finally {
      setAdding(false);
    }
  };

  const resetForm = () => {
    setImpressions("");
    setReach("");
    setLikes("");
    setComments("");
    setShares("");
    setSaves("");
    setClicks("");
  };

  const handleRequestRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      const res = await fetch("/api/ai/recommend", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setRecommendations(data.data);
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analitik</h1>
          <p className="text-muted-foreground mt-1">Pantau performa konten Anda</p>
        </div>
        <Button onClick={() => setAddModalOpen(true)}>
          <Plus size={18} className="mr-2" />
          Tambah Data
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-secondary animate-pulse" />
          ))}
        </div>
      ) : analytics.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={32} className="text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Belum ada data analitik</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            Tambahkan data performa konten untuk melihat insight
          </p>
          <Button onClick={() => setAddModalOpen(true)}>
            <Plus size={18} className="mr-2" />
            Tambah Data Pertama
          </Button>
        </div>
      ) : (
        <>
          <MetricsOverview analytics={analytics} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EngagementChart analytics={analytics} />
            <PlatformBreakdown analytics={analytics} />
          </div>

          <AIRecommendations
            recommendations={recommendations}
            loading={loadingRecommendations}
            onRequestRecommendations={handleRequestRecommendations}
          />
        </>
      )}

      {/* Add Analytics Modal */}
      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} title="Tambah Data Analitik">
        <form onSubmit={handleAddAnalytics} className="space-y-4">
          <Select
            id="analyticContent"
            label="Konten"
            value={selectedContent}
            onChange={(e) => setSelectedContent(e.target.value)}
            options={contents.map((c) => ({ value: c.id, label: c.title }))}
            required
          />
          <Select
            id="analyticPlatform"
            label="Platform"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            options={PLATFORMS.map((p) => ({ value: p.value, label: p.label }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input id="impressions" label="Impressions" type="number" value={impressions} onChange={(e) => setImpressions(e.target.value)} />
            <Input id="reach" label="Reach" type="number" value={reach} onChange={(e) => setReach(e.target.value)} />
            <Input id="likes" label="Likes" type="number" value={likes} onChange={(e) => setLikes(e.target.value)} />
            <Input id="comments" label="Komentar" type="number" value={comments} onChange={(e) => setComments(e.target.value)} />
            <Input id="shares" label="Share" type="number" value={shares} onChange={(e) => setShares(e.target.value)} />
            <Input id="saves" label="Save" type="number" value={saves} onChange={(e) => setSaves(e.target.value)} />
            <Input id="clicks" label="Klik" type="number" value={clicks} onChange={(e) => setClicks(e.target.value)} />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={adding}>
              {adding ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
