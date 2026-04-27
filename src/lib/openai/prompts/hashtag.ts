import { buildPTCFPrompt, type Locale } from "./index";
import type { Platform } from "@/types";

export function generateHashtagPrompt(params: {
  platform: Platform;
  topic: string;
  content?: string;
}, locale: Locale = "id") {
  return buildPTCFPrompt({
    persona: locale === "en"
      ? "You are a social media hashtag strategy expert. You understand hashtag trends, reach, and how to target the right audience."
      : "Kamu adalah ahli strategi hashtag media sosial di Indonesia. Kamu memahami tren hashtag, reach, dan cara menargetkan audiens yang tepat.",
    task: locale === "en"
      ? `Generate optimal hashtags for ${params.platform} with topic "${params.topic}".`
      : `Generate hashtag yang optimal untuk ${params.platform} dengan topik "${params.topic}".`,
    context_data: `- Platform: ${params.platform}\n- Topic: ${params.topic}\n- Content: ${params.content || "-"}`,
    format: locale === "en"
      ? `Provide output in JSON format:
{
  "primary_hashtags": ["primary hashtag 1", ...],
  "secondary_hashtags": ["supporting hashtag 1", ...],
  "niche_hashtags": ["niche hashtag 1", ...],
  "trending_hashtags": ["trending hashtag 1", ...]
}

Total 20-30 relevant hashtags.`
      : `Berikan output dalam format JSON:
{
  "primary_hashtags": ["hashtag utama 1", ...],
  "secondary_hashtags": ["hashtag pendukung 1", ...],
  "niche_hashtags": ["hashtag niche 1", ...],
  "trending_hashtags": ["hashtag trending 1", ...]
}

Total 20-30 hashtag yang relevan.`,
    constraints: locale === "en"
      ? "Only valid JSON. Hashtags without # symbol. Mix of popular and niche hashtags for optimal reach."
      : "Hanya JSON valid. Hashtag tanpa simbol #. Campuran hashtag populer dan niche untuk reach optimal.",
  }, locale);
}
