import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/openai/client";
import { generateStrategyPrompt } from "@/lib/openai/prompts/strategy";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get user analytics summary
    const { data: analytics } = await supabase
      .from("analytics")
      .select("*")
      .eq("user_id", user.id)
      .order("recorded_at", { ascending: false })
      .limit(20);

    if (!analytics || analytics.length === 0) {
      return NextResponse.json({
        data: [
          {
            type: "strategy",
            title: "Mulai Posting Konten",
            description: "Anda belum memiliki data performa. Mulai dengan membuat dan mempublikasikan konten.",
            action: "Buat brand profile dan generate konten pertama Anda",
            priority: "high",
          },
        ],
      });
    }

    const summary = `
Total data points: ${analytics.length}
Platforms: ${[...new Set(analytics.map((a) => a.platform))].join(", ")}
Avg Impressions: ${Math.round(analytics.reduce((s, a) => s + a.impressions, 0) / analytics.length)}
Avg Engagement Rate: ${(analytics.reduce((s, a) => s + a.engagement_rate, 0) / analytics.length).toFixed(1)}%
Avg Likes: ${Math.round(analytics.reduce((s, a) => s + a.likes, 0) / analytics.length)}
Avg Comments: ${Math.round(analytics.reduce((s, a) => s + a.comments, 0) / analytics.length)}
Best performing platform: ${analytics.reduce(
      (best, a) =>
        a.engagement_rate > (best.engagement_rate || 0) ? { platform: a.platform, engagement_rate: a.engagement_rate } : best,
      {} as { platform?: string; engagement_rate?: number }
    ).platform || "N/A"}
`;

    const prompt = generateStrategyPrompt(summary);
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Kamu adalah strategist media sosial profesional. Berikan output hanya dalam format JSON array yang valid." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return NextResponse.json({ error: "Gagal generate rekomendasi" }, { status: 500 });

    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const recommendations = JSON.parse(cleaned);

    return NextResponse.json({ data: recommendations });
  } catch (error) {
    console.error("AI recommend error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
