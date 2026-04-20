import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/openai/client";
import { generateHashtagPrompt } from "@/lib/openai/prompts/hashtag";
import { hashtagOutputSchema } from "@/lib/openai/schemas/content";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const prompt = generateHashtagPrompt(body);

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Kamu adalah ahli hashtag media sosial. Berikan output hanya dalam format JSON yang valid." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return NextResponse.json({ error: "Gagal generate hashtag" }, { status: 500 });

    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    const result = hashtagOutputSchema.safeParse(parsed);

    if (!result.success) {
      return NextResponse.json({ error: "Format output tidak valid" }, { status: 500 });
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error("Generate hashtag error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
