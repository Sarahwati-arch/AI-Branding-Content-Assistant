import { buildPTCFPrompt } from "./index";
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
}) {
  const brandInfo = params.brandContext
    ? `\n- Brand: ${params.brandContext.brand_name}\n- Tone of Voice: ${params.brandContext.tone_of_voice || "-"}\n- Tagline: ${params.brandContext.tagline || "-"}`
    : "";

  return buildPTCFPrompt({
    persona:
      "Kamu adalah copywriter profesional media sosial di Indonesia. Kamu bisa menulis caption yang engaging, persuasif, dan viral untuk berbagai platform.",
    task: `Buatkan caption untuk ${params.platform} dengan topik "${params.topic}". Tone: ${params.tone || "sesuai brand"}.`,
    context_data: `- Platform: ${params.platform}\n- Topik: ${params.topic}\n- Tone: ${params.tone || "Sesuai brand"}${brandInfo}`,
    format: `Berikan output dalam format JSON:
{
  "caption": "caption lengkap siap posting",
  "short_caption": "versi pendek untuk story",
  "hashtags": ["hashtag1", "hashtag2", ...]
}`,
    constraints:
      "Hanya JSON valid. Caption Bahasa Indonesia. Sesuaikan panjang dengan platform (IG caption bisa panjang, TikTok pendek).",
  });
}
