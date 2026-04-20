import { buildPTCFPrompt } from "./index";
import type { Platform } from "@/types";

export function generateHashtagPrompt(params: {
  platform: Platform;
  topic: string;
  content?: string;
}) {
  return buildPTCFPrompt({
    persona:
      "Kamu adalah ahli strategi hashtag media sosial di Indonesia. Kamu memahami tren hashtag, reach, dan cara menargetkan audiens yang tepat.",
    task: `Generate hashtag yang optimal untuk ${params.platform} dengan topik "${params.topic}".`,
    context_data: `- Platform: ${params.platform}\n- Topik: ${params.topic}\n- Konten: ${params.content || "-"}`,
    format: `Berikan output dalam format JSON:
{
  "primary_hashtags": ["hashtag utama 1", ...],
  "secondary_hashtags": ["hashtag pendukung 1", ...],
  "niche_hashtags": ["hashtag niche 1", ...],
  "trending_hashtags": ["hashtag trending 1", ...]
}

Total 20-30 hashtag yang relevan.`,
    constraints:
      "Hanya JSON valid. Hashtag tanpa simbol #. Campuran hashtag populer dan niche untuk reach optimal.",
  });
}
