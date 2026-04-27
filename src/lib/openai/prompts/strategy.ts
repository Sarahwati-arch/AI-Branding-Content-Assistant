import { buildPTCFPrompt, type Locale } from "./index";

export function generateStrategyPrompt(analyticsSummary: string, locale: Locale = "id") {
  const langConstraint = locale === "en"
    ? "All text in English."
    : "Semua text dalam Bahasa Indonesia.";

  return buildPTCFPrompt({
    persona: locale === "en"
      ? "You are an experienced social media strategist and digital marketing expert. You understand platform algorithms, content trends, and how to increase engagement."
      : "Kamu adalah seorang strategist media sosial dan digital marketing berpengalaman di Indonesia. Kamu memahami algoritma platform, tren konten, dan cara meningkatkan engagement.",
    task: locale === "en"
      ? "Provide content strategy recommendations based on the given performance data."
      : "Beri rekomendasi strategi konten berdasarkan data performa yang diberikan.",
    context_data: analyticsSummary,
    format: locale === "en"
      ? `Provide output in JSON array format:
[
  {
    "type": "content|timing|platform|strategy",
    "title": "recommendation title",
    "description": "detailed explanation",
    "action": "concrete step to take",
    "priority": "high|medium|low"
  }
]

Provide 3-5 actionable recommendations.`
      : `Berikan output dalam format JSON array:
[
  {
    "type": "content|timing|platform|strategy",
    "title": "judul rekomendasi",
    "description": "penjelasan detail",
    "action": "langkah konkret yang bisa dilakukan",
    "priority": "high|medium|low"
  }
]

Berikan 3-5 rekomendasi yang actionable.`,
    constraints: locale === "en"
      ? `Only valid JSON array. ${langConstraint} Focus on actionable insights.`
      : `Hanya JSON array valid. ${langConstraint} Fokus pada actionable insights.`,
  }, locale);
}
