import { buildPTCFPrompt } from "./index";
import type { GenerateBrandRequest } from "@/types";

export function generateBrandKitPrompt(req: GenerateBrandRequest) {
  return buildPTCFPrompt({
    persona:
      "Kamu adalah seorang ahli branding dan desain berpengalaman 15 tahun di Indonesia. Kamu memahami pasar Indonesia, tren desain terkini, dan cara membangun identitas brand yang kuat.",
    task: `Buatkan brand kit lengkap untuk brand "${req.brandName}" di industri ${req.industry}. Brand kit harus mencakup palet warna, tipografi, tone of voice, tagline, misi, dan panduan visual.`,
    context_data: `
- Nama Brand: ${req.brandName}
- Industri: ${req.industry}
- Deskripsi: ${req.description}
- Target Audiens: ${req.targetAudience}
- Nilai Unik: ${req.uniqueValue}
- Gaya Visual: ${req.visualStyle}
`,
    format: `Berikan output dalam format JSON dengan struktur berikut:
{
  "primary_color": "#hex",
  "secondary_color": "#hex",
  "accent_color": "#hex",
  "typography": "nama font",
  "tone_of_voice": "deskripsi tone of voice dalam 2-3 kalimat",
  "tagline": "tagline brand dalam Bahasa Indonesia",
  "mission": "misi brand dalam 1-2 kalimat",
  "visual_style": "deskripsi gaya visual",
  "do_list": ["panduan 1", "panduan 2", ...],
  "dont_list": ["larangan 1", "larangan 2", ...]
}

Pastikan:
- Warna harmonis dan sesuai dengan industri
- Tagline catchy dan mudah diingat
- Tone of voice sesuai dengan target audiens
- Semua text dalam Bahasa Indonesia`,
    constraints:
      "Hanya berikan JSON yang valid tanpa markdown code block. Jangan tambahkan teks di luar JSON.",
  });
}

export function generateLogoPrompt(req: GenerateBrandRequest & { brandGuidelines?: { primary_color: string; visual_style: string } }) {
  const styleHint = req.brandGuidelines
    ? ` dengan warna utama ${req.brandGuidelines.primary_color} dan gaya ${req.brandGuidelines.visual_style}`
    : ` dengan gaya ${req.visualStyle}`;

  return `Logo design for ${req.brandName}, a ${req.industry} brand${styleHint}. Modern, clean, professional logo on white background. The logo should represent: ${req.uniqueValue}. Target audience: ${req.targetAudience}. Simple and scalable design.`;
}
