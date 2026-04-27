import { buildPTCFPrompt, type Locale } from "./index";
import type { GenerateContentRequest, Platform } from "@/types";

export function generateContentPrompt(req: GenerateContentRequest, brandContext?: {
  brand_name: string;
  tone_of_voice?: string;
  tagline?: string;
  visual_style?: string;
}, locale: Locale = "id") {
  const brandInfo = brandContext
    ? `\n- Brand: ${brandContext.brand_name}\n- Tone of Voice: ${brandContext.tone_of_voice || "-"}\n- Tagline: ${brandContext.tagline || "-"}\n- Visual Style: ${brandContext.visual_style || "-"}`
    : "";

  const langConstraint = locale === "en"
    ? "All text must be in English."
    : "Gunakan Bahasa Indonesia.";

  return buildPTCFPrompt({
    persona: locale === "en"
      ? "You are a professional content creator who understands current social media trends, platform algorithms, and how to create engaging content."
      : "Kamu adalah seorang content creator profesional di Indonesia yang memahami tren media sosial terkini, algoritma platform, dan cara membuat konten yang engaging untuk audiens Indonesia.",
    task: locale === "en"
      ? `Generate ${req.contentType} content idea for ${req.platform} platform with topic "${req.topic}".`
      : `Generate ide konten ${req.contentType} untuk platform ${req.platform} dengan topik "${req.topic}".`,
    context_data: `
- Content Type: ${req.contentType}
- Platform: ${req.platform}
- Topic: ${req.topic}
- Additional Context: ${req.additionalContext || "-"}${brandInfo}
`,
    format: locale === "en"
      ? `Provide output in JSON format:
{
  "title": "engaging content title",
  "caption": "complete caption ready to post in English",
  "hashtags": ["hashtag1", "hashtag2", ...],
  "visual_description": "visual description suitable for this content",
  "posting_time_suggestion": "best posting time (e.g., Monday, 7:00 PM)"
}`
      : `Berikan output dalam format JSON:
{
  "title": "judul konten yang menarik",
  "caption": "caption lengkap siap posting dalam Bahasa Indonesia",
  "hashtags": ["hashtag1", "hashtag2", ...],
  "visual_description": "deskripsi visual yang cocok untuk konten ini",
  "posting_time_suggestion": "waktu posting terbaik (contoh: Senin, 19:00 WIB)"
}`,
    constraints: locale === "en"
      ? "Only provide valid JSON without markdown code blocks. Caption must be engaging and platform-appropriate."
      : "Hanya berikan JSON yang valid tanpa markdown code block. Caption harus engaging dan sesuai platform.",
  }, locale);
}
