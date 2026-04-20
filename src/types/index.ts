// Profile
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Brand
export interface BrandProfile {
  id: string;
  user_id: string;
  brand_name: string;
  industry: string;
  description: string;
  target_audience: string;
  unique_value: string;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BrandGuidelines {
  id: string;
  brand_id: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  typography: string;
  tone_of_voice: string;
  tagline: string;
  mission: string;
  visual_style: string;
  do_list: string[];
  dont_list: string[];
  created_at: string;
  updated_at: string;
}

// Content
export interface Content {
  id: string;
  user_id: string;
  brand_id: string;
  title: string;
  type: ContentType;
  platform: Platform;
  caption: string;
  hashtags: string[];
  visual_url: string | null;
  status: ContentStatus;
  scheduled_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ContentType = "post" | "story" | "reel" | "carousel" | "video" | "article";
export type Platform = "instagram" | "facebook" | "tiktok" | "twitter" | "linkedin" | "youtube";
export type ContentStatus = "draft" | "generated" | "scheduled" | "published";

// Calendar
export interface CalendarEvent {
  id: string;
  user_id: string;
  content_id: string | null;
  title: string;
  description: string | null;
  platform: Platform;
  scheduled_at: string;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

// Analytics
export interface Analytics {
  id: string;
  user_id: string;
  content_id: string;
  platform: Platform;
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
  engagement_rate: number;
  recorded_at: string;
  created_at: string;
}

// API request/response types
export interface GenerateBrandRequest {
  brandName: string;
  industry: string;
  description: string;
  targetAudience: string;
  uniqueValue: string;
  visualStyle: string;
}

export interface GenerateContentRequest {
  brandId: string;
  contentType: ContentType;
  platform: Platform;
  topic: string;
  additionalContext?: string;
}

export interface GenerateCaptionRequest {
  brandId: string;
  platform: Platform;
  topic: string;
  tone?: string;
}

export interface GenerateHashtagRequest {
  platform: Platform;
  topic: string;
  content?: string;
}

export interface GenerateVisualRequest {
  brandId: string;
  platform: Platform;
  description: string;
  style?: string;
}

export interface AIRecommendation {
  type: string;
  title: string;
  description: string;
  action: string;
  priority: "high" | "medium" | "low";
}
