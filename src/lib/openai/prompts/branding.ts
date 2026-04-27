import { buildPTCFPrompt, type Locale } from "./index";
import type { GenerateBrandRequest } from "@/types";

export function generateBrandKitPrompt(req: GenerateBrandRequest, locale: Locale = "id") {
  const langConstraint = locale === "en"
    ? "All text must be in English."
    : "Semua text dalam Bahasa Indonesia.";

  const persona = locale === "en"
    ? "You are a branding and design expert with 15 years of experience. You understand market trends, current design trends, and how to build a strong brand identity."
    : "Kamu adalah seorang ahli branding dan desain berpengalaman 15 tahun di Indonesia. Kamu memahami pasar Indonesia, tren desain terkini, dan cara membangun identitas brand yang kuat.";

  const taglineLang = locale === "en"
    ? "tagline in English"
    : "tagline brand dalam Bahasa Indonesia";

  const missionLang = locale === "en"
    ? "mission"
    : "misi brand";

  return buildPTCFPrompt({
    persona,
    task: locale === "en"
      ? `Create a complete brand kit for brand "${req.brandName}" in the ${req.industry} industry. The brand kit should include color palette, typography, tone of voice, tagline, mission, and visual guidelines.`
      : `Buatkan brand kit lengkap untuk brand "${req.brandName}" di industri ${req.industry}. Brand kit harus mencakup palet warna, tipografi, tone of voice, tagline, misi, dan panduan visual.`,
    context_data: `
- Brand Name: ${req.brandName}
- Industry: ${req.industry}
- Description: ${req.description}
- Target Audience: ${req.targetAudience}
- Unique Value: ${req.uniqueValue}
- Visual Style: ${req.visualStyle}
`,
    format: `Provide output in JSON format with the following structure:
{
  "primary_color": "#hex",
  "secondary_color": "#hex",
  "accent_color": "#hex",
  "typography": "font name",
  "tone_of_voice": "tone of voice description in 2-3 sentences",
  "tagline": "${taglineLang}",
  "mission": "${missionLang} in 1-2 sentences",
  "visual_style": "visual style description",
  "do_list": ["guideline 1", "guideline 2", ...],
  "dont_list": ["restriction 1", "restriction 2", ...]
}

Make sure:
- Colors are harmonious and match the industry
- Tagline is catchy and memorable
- Tone of voice matches the target audience
- ${langConstraint}`,
    constraints: locale === "en"
      ? "Only provide valid JSON without markdown code blocks. Do not add text outside the JSON."
      : "Hanya berikan JSON yang valid tanpa markdown code block. Jangan tambahkan teks di luar JSON.",
  }, locale);
}

export function generateLogoPrompt(req: GenerateBrandRequest & { brandGuidelines?: { primary_color: string; visual_style: string } }) {
  const styleHint = req.brandGuidelines
    ? ` dengan warna utama ${req.brandGuidelines.primary_color} dan gaya ${req.brandGuidelines.visual_style}`
    : ` dengan gaya ${req.visualStyle}`;

  return `Logo design for ${req.brandName}, a ${req.industry} brand${styleHint}. Modern, clean, professional logo on white background. The logo should represent: ${req.uniqueValue}. Target audience: ${req.targetAudience}. Simple and scalable design.`;
}
