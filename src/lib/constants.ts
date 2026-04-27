import type { ContentType, Platform } from "@/types";

// Category keys for i18n lookup
export const PRODUCT_CATEGORY_KEYS = [
  "food",
  "fashion",
  "tech",
  "beauty",
  "health",
  "education",
  "property",
  "automotive",
  "travel",
  "finance",
  "entertainment",
  "culinary",
  "ecommerce",
  "services",
  "other",
] as const;

export function getProductCategories(t: (key: string) => string) {
  return PRODUCT_CATEGORY_KEYS.map((key) => ({
    value: t(`constants.${key}`),
    label: t(`constants.${key}`),
  }));
}

export const PLATFORMS: { value: Platform; label: string; color: string }[] = [
  { value: "instagram", label: "Instagram", color: "#E4405F" },
  { value: "facebook", label: "Facebook", color: "#1877F2" },
  { value: "tiktok", label: "TikTok", color: "#000000" },
  { value: "twitter", label: "Twitter/X", color: "#1DA1F2" },
  { value: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  { value: "youtube", label: "YouTube", color: "#FF0000" },
];

// Content type keys for i18n lookup (some labels are self-translating)
export const CONTENT_TYPE_KEYS: { value: ContentType; translationKey: string }[] = [
  { value: "post", translationKey: "post" },
  { value: "story", translationKey: "story" },
  { value: "reel", translationKey: "constants.reel" },
  { value: "carousel", translationKey: "carousel" },
  { value: "video", translationKey: "video" },
  { value: "article", translationKey: "constants.article" },
];

export function getContentTypes(t: (key: string) => string) {
  return CONTENT_TYPE_KEYS.map((ct) => ({
    value: ct.value,
    label: ct.translationKey.includes(".")
      ? t(ct.translationKey)
      : ct.translationKey.charAt(0).toUpperCase() + ct.translationKey.slice(1),
  }));
}

// Visual style keys for i18n lookup
export const VISUAL_STYLE_KEYS = [
  "styleModern",
  "styleBold",
  "styleElegant",
  "stylePlayful",
  "styleProfessional",
  "styleVintage",
  "styleNatural",
  "styleFuturistic",
  "styleColorful",
  "styleClean",
] as const;

export function getVisualStyles(t: (key: string) => string) {
  return VISUAL_STYLE_KEYS.map((key) => t(`constants.${key}`));
}

export const PLATFORM_IMAGE_SIZES: Record<Platform, { width: number; height: number; label: string }> = {
  instagram: { width: 1080, height: 1080, label: "1:1 (Feed Post)" },
  facebook: { width: 1200, height: 630, label: "16:9 (Link Post)" },
  tiktok: { width: 1080, height: 1920, label: "9:16 (Full Screen)" },
  twitter: { width: 1200, height: 675, label: "16:9 (Tweet Image)" },
  linkedin: { width: 1200, height: 627, label: "16:9 (Post Image)" },
  youtube: { width: 1280, height: 720, label: "16:9 (Thumbnail)" },
};

export const NAV_ITEMS = [
  { href: "/dashboard", translationKey: "nav.dashboard", icon: "LayoutDashboard" },
  { href: "/branding", translationKey: "nav.branding", icon: "Palette" },
  { href: "/content", translationKey: "nav.content", icon: "FileText" },
  { href: "/calendar", translationKey: "nav.calendar", icon: "CalendarDays" },
  { href: "/analytics", translationKey: "nav.analytics", icon: "BarChart3" },
] as const;
