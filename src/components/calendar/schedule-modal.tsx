"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PLATFORMS } from "@/lib/constants";
import { format } from "date-fns";

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSubmit: (data: {
    title: string;
    description: string;
    platform: string;
    scheduled_at: string;
  }) => void;
  loading?: boolean;
}

export function ScheduleModal({
  open,
  onClose,
  selectedDate,
  onSubmit,
  loading,
}: ScheduleModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [scheduledAt, setScheduledAt] = useState(
    selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      platform,
      scheduled_at: new Date(scheduledAt).toISOString(),
    });
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onClose={onClose} title="Jadwalkan Konten">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="scheduleTitle"
          label="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul konten"
          required
        />
        <Textarea
          id="scheduleDesc"
          label="Deskripsi (opsional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Deskripsi atau catatan..."
        />
        <Select
          id="schedulePlatform"
          label="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          options={PLATFORMS.map((p) => ({ value: p.value, label: p.label }))}
        />
        <Input
          id="scheduleDate"
          label="Tanggal & Waktu"
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          required
        />
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Jadwalkan"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
