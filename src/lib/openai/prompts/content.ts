import { buildPTCFPrompt } from "./index";
import type { GenerateContentRequest, Platform } from "@/types";

export function generateContentPrompt(req: GenerateContentRequest, brandContext?: {
  brand_name: string;
  tone_of_voice?: string;
  tagline?: string;
  visual_style?: string;
}) {
  const brandInfo = brandContext
    ? `\n- Brand: ${brandContext.brand_name}
- Tone of Voice: ${brandContext.tone_of_voice || "-"}
- Tagline: ${brandContext.tagline || "-"}
- Visual Style: ${brandContext.visual_style || "-"}`
    : "";

  return buildPTCFPrompt({
    persona:
      "Kamu adalah seorang content creator profesional di Indonesia yang memahami tren media sosial terkini, algoritma platform, dan cara membuat konten yang engaging untuk audiens Indonesia.",
    task: `Generate ide konten ${req.contentType} untuk platform ${req.platform} dengan topik "${req.topic}".`,
    context_data: `
- Tipe Konten: ${req.contentType}
- Platform: ${req.platform}
- Topik: ${req.topic}
- Konteks Tambahan: ${req.additionalContext || "-"}${brandInfo}
`,
    format: `Berikan output dalam format JSON:
{
  "title": "judul konten yang menarik",
  "caption": "caption lengkap siap posting dalam Bahasa Indonesia",
  "hashtags": ["hashtag1", "hashtag2", ...],
  "visual_description": "deskripsi visual yang cocok untuk konten ini",
  "posting_time_suggestion": "waktu posting terbaik (contoh: Senin, 19:00 WIB)"
}`,
    constraints:
      "Hanya berikan JSON yang valid tanpa markdown code block. Caption harus engaging dan sesuai platform. Gunakan Bahasa Indonesia.",
  });
}
