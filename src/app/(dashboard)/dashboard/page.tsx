import Link from "next/link";
import { Palette, FileText, CalendarDays, BarChart3, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Selamat datang di AI Branding Assistant
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/branding/new"
          className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
            <Palette className="text-primary" size={24} />
          </div>
          <div>
            <p className="font-semibold text-foreground">Buat Brand</p>
            <p className="text-sm text-muted-foreground">Buat brand profile baru</p>
          </div>
        </Link>

        <Link
          href="/content/generate"
          className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition">
            <Plus className="text-success" size={24} />
          </div>
          <div>
            <p className="font-semibold text-foreground">Generate Konten</p>
            <p className="text-sm text-muted-foreground">Buat konten dengan AI</p>
          </div>
        </Link>

        <Link
          href="/calendar"
          className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
            <CalendarDays className="text-accent" size={24} />
          </div>
          <div>
            <p className="font-semibold text-foreground">Kalender</p>
            <p className="text-sm text-muted-foreground">Jadwalkan konten</p>
          </div>
        </Link>

        <Link
          href="/analytics"
          className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md transition group"
        >
          <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition">
            <BarChart3 className="text-destructive" size={24} />
          </div>
          <div>
            <p className="font-semibold text-foreground">Analitik</p>
            <p className="text-sm text-muted-foreground">Lihat performa</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Mulai dari sini
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Buat Brand Profile</p>
                <p className="text-xs text-muted-foreground">Definisikan identitas brand Anda</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Generate Brand Kit</p>
                <p className="text-xs text-muted-foreground">AI buatkan warna, tagline, dan tone of voice</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Buat Konten</p>
                <p className="text-xs text-muted-foreground">Generate konten sesuai brand untuk tiap platform</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Tips Branding
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground">Konsistensi adalah kunci</p>
              <p className="text-xs text-muted-foreground">
                Gunakan warna dan tone of voice yang sama di semua platform
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Kenali audiens Anda</p>
              <p className="text-xs text-muted-foreground">
                Sesuaikan gaya konten dengan preferensi target audiens
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Jadwal yang konsisten</p>
              <p className="text-xs text-muted-foreground">
                Posting secara teratur untuk membangun kehadiran brand
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
