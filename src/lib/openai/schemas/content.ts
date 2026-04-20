import { z } from "zod";

export const contentOutputSchema = z.object({
  title: z.string().min(1),
  caption: z.string().min(10),
  hashtags: z.array(z.string()),
  visual_description: z.string(),
  posting_time_suggestion: z.string(),
});

export const captionOutputSchema = z.object({
  caption: z.string().min(10),
  short_caption: z.string(),
  hashtags: z.array(z.string()),
});

export const hashtagOutputSchema = z.object({
  primary_hashtags: z.array(z.string()),
  secondary_hashtags: z.array(z.string()),
  niche_hashtags: z.array(z.string()),
  trending_hashtags: z.array(z.string()),
});
