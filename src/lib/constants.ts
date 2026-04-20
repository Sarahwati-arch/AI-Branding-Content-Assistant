import type { ContentType, Platform } from "@/types";

export const PRODUCT_CATEGORIES = [
  "Makanan & Minuman",
  "Fashion & Pakaian",
  "Teknologi & Elektronik",
  "Kecantikan & Perawatan",
  "Kesehatan & Fitness",
  "Pendidikan & Pelatihan",
  "Properti & Real Estate",
  "Otomotif",
  "Pariwisata & Travel",
  "Finance & Bisnis",
  "Hiburan & Media",
  "Kuliner & Restoran",
  "E-commerce & Retail",
  "Jasa & Layanan",
  "Lainnya",
] as const;

export const PLATFORMS: { value: Platform; label: string; color: string }[] = [
  { value: "instagram", label: "Instagram", color: "#E4405F" },
  { value: "facebook", label: "Facebook", color: "#1877F2" },
  { value: "tiktok", label: "TikTok", color: "#000000" },
  { value: "twitter", label: "Twitter/X", color: "#1DA1F2" },
  { value: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  { value: "youtube", label: "YouTube", color: "#FF0000" },
];

export const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: "post", label: "Post" },
  { value: "story", label: "Story" },
  { value: "reel", label: "Reel/Video Pendek" },
  { value: "carousel", label: "Carousel" },
  { value: "video", label: "Video" },
  { value: "article", label: "Artikel" },
];

export const VISUAL_STYLES = [
  "Modern & Minimalis",
  "Bold & Berani",
  "Elegant & Mewah",
  "Playful & Fun",
  "Professional & Korporat",
  "Vintage & Retro",
  "Natural & Organik",
  "Futuristik & Tech",
  "Colorful & Ceria",
  "Clean & Simpel",
] as const;

export const PLATFORM_IMAGE_SIZES: Record<Platform, { width: number; height: number; label: string }> = {
  instagram: { width: 1080, height: 1080, label: "1:1 (Feed Post)" },
  facebook: { width: 1200, height: 630, label: "16:9 (Link Post)" },
  tiktok: { width: 1080, height: 1920, label: "9:16 (Full Screen)" },
  twitter: { width: 1200, height: 675, label: "16:9 (Tweet Image)" },
  linkedin: { width: 1200, height: 627, label: "16:9 (Post Image)" },
  youtube: { width: 1280, height: 720, label: "16:9 (Thumbnail)" },
};

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/branding", label: "Branding", icon: "Palette" },
  { href: "/content", label: "Konten", icon: "FileText" },
  { href: "/calendar", label: "Kalender", icon: "CalendarDays" },
  { href: "/analytics", label: "Analitik", icon: "BarChart3" },
] as const;
