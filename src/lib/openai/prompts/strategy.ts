import { buildPTCFPrompt } from "./index";

export function generateStrategyPrompt(analyticsSummary: string) {
  return buildPTCFPrompt({
    persona:
      "Kamu adalah seorang strategist media sosial dan digital marketing berpengalaman di Indonesia. Kamu memahami algoritma platform, tren konten, dan cara meningkatkan engagement.",
    task: "Beri rekomendasi strategi konten berdasarkan data performa yang diberikan.",
    context_data: analyticsSummary,
    format: `Berikan output dalam format JSON array:
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
    constraints:
      "Hanya JSON array valid. Semua text dalam Bahasa Indonesia. Fokus pada actionable insights.",
  });
}
