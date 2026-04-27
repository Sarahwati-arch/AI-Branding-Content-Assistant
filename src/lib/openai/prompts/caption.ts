import { buildPTCFPrompt, type Locale } from "./index";
import type { Platform } from "@/types";

export function generateCaptionPrompt(params: {
  brandId: string;
  platform: Platform;
  topic: string;
  tone?: string;
  brandContext?: {
    brand_name: string;
    tone_of_voice?: string;
    tagline?: string;
  };
}, locale: Locale = "id") {
  const brandInfo = params.brandContext
    ? `\n- Brand: ${params.brandContext.brand_name}\n- Tone of Voice: ${params.brandContext.tone_of_voice || "-"}\n- Tagline: ${params.brandContext.tagline || "-"}`
    : "";

  const langConstraint = locale === "en"
    ? "Caption must be in English."
    : "Caption Bahasa Indonesia.";

  return buildPTCFPrompt({
    persona: locale === "en"
      ? "You are a professional social media copywriter. You can write engaging, persuasive, and viral captions for various platforms."
      : "Kamu adalah copywriter profesional media sosial di Indonesia. Kamu bisa menulis caption yang engaging, persuasif, dan viral untuk berbagai platform.",
    task: locale === "en"
      ? `Create a caption for ${params.platform} with topic "${params.topic}". Tone: ${params.tone || "brand-appropriate"}.`
      : `Buatkan caption untuk ${params.platform} dengan topik "${params.topic}". Tone: ${params.tone || "sesuai brand"}.`,
    context_data: `- Platform: ${params.platform}\n- Topic: ${params.topic}\n- Tone: ${params.tone || (locale === "en" ? "Brand-appropriate" : "Sesuai brand")}${brandInfo}`,
    format: locale === "en"
      ? `Provide output in JSON format:
{
  "caption": "complete caption ready to post",
  "short_caption": "short version for story",
  "hashtags": ["hashtag1", "hashtag2", ...]
}`
      : `Berikan output dalam format JSON:
{
  "caption": "caption lengkap siap posting",
  "short_caption": "versi pendek untuk story",
  "hashtags": ["hashtag1", "hashtag2", ...]
}`,
    constraints: locale === "en"
      ? `Only valid JSON. ${langConstraint} Adjust length to platform (IG caption can be long, TikTok short).`
      : `Hanya JSON valid. ${langConstraint} Sesuaikan panjang dengan platform (IG caption bisa panjang, TikTok pendek).`,
  }, locale);
}
