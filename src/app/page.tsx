import Link from "next/link";
import {
  Palette,
  FileText,
  CalendarDays,
  BarChart3,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Brand Kit Generator",
    description:
      "AI buatkan palet warna, tipografi, tagline, dan tone of voice yang sesuai dengan brand Anda.",
  },
  {
    icon: FileText,
    title: "Content Generator",
    description:
      "Generate caption, hashtag, dan ide konten untuk Instagram, TikTok, Facebook, dan platform lainnya.",
  },
  {
    icon: CalendarDays,
    title: "Kalender Konten",
    description:
      "Jadwalkan posting konten dengan kalender visual yang mudah digunakan.",
  },
  {
    icon: BarChart3,
    title: "Analitik & Insight",
    description:
      "Pantau performa konten dan dapatkan rekomendasi AI untuk meningkatkan engagement.",
  },
  {
    icon: Sparkles,
    title: "Logo Generator",
    description:
      "Generate logo brand dengan DALL-E AI dalam hitungan detik.",
  },
  {
    icon: CheckCircle2,
    title: "Visual Assets",
    description:
      "Buat visual konten yang sesuai ukuran tiap platform media sosial.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Palette size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">BrandAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-foreground hover:text-primary transition px-3 py-2"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary-dark transition"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={14} />
            Didukung AI GPT-4 & DALL-E
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight">
            Bangun Brand Anda
            <br />
            <span className="text-primary">dengan Kekuatan AI</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Platform AI all-in-one untuk membuat brand kit, generate konten media
            sosial, jadwalkan posting, dan analisis performa.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary-dark transition shadow-lg shadow-primary/25"
            >
              Mulai Gratis
              <ArrowRight size={18} />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-secondary transition"
            >
              Lihat Fitur
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Gratis. Tanpa kartu kredit.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Semua yang Anda butuhkan
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Dari membuat brand kit hingga menganalisis performa konten, semua
              bisa dilakukan dalam satu platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Cara Kerja
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tiga langkah mudah untuk mulai membangun brand Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Buat Brand Profile
              </h3>
              <p className="text-muted-foreground">
                Isi informasi brand Anda dan AI akan generate brand kit lengkap
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Generate Konten
              </h3>
              <p className="text-muted-foreground">
                AI buatkan caption, hashtag, dan visual untuk tiap platform
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Jadwalkan & Analisis
              </h3>
              <p className="text-muted-foreground">
                Atur jadwal posting dan pantau performa dengan insight AI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Siap Membangun Brand Anda?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Bergabung sekarang dan mulai buat konten yang luar biasa dengan AI
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-semibold text-lg hover:bg-white/90 transition"
            >
              Mulai Sekarang - Gratis
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Palette size={12} className="text-white" />
            </div>
            <span className="font-semibold text-foreground">BrandAI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            AI Branding & Content Assistant. Dibuat dengan Next.js & OpenAI.
          </p>
        </div>
      </footer>
    </div>
  );
}
