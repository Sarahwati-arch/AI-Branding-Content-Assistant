import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOpenAIClient } from "@/lib/openai/client";
import { generateCaptionPrompt } from "@/lib/openai/prompts/caption";
import { captionOutputSchema } from "@/lib/openai/schemas/content";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/openai/prompts/index";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const cookieStore = await cookies();
    const locale = (cookieStore.get("locale")?.value as Locale) || "id";

    const body = await request.json();

    let brandContext;
    if (body.brandId) {
      const { data: brand } = await supabase
        .from("brands")
        .select("brand_name, brand_guidelines(tone_of_voice, tagline)")
        .eq("id", body.brandId)
        .single();
      if (brand) {
        const g = brand.brand_guidelines?.[0] || {};
        brandContext = { brand_name: brand.brand_name, tone_of_voice: g.tone_of_voice, tagline: g.tagline };
      }
    }

    const prompt = generateCaptionPrompt({ ...body, brandContext }, locale);

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Kamu adalah copywriter profesional. Berikan output hanya dalam format JSON yang valid." },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return NextResponse.json({ error: "Gagal generate caption" }, { status: 500 });

    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    const result = captionOutputSchema.safeParse(parsed);

    if (!result.success) {
      return NextResponse.json({ error: "Format output tidak valid" }, { status: 500 });
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error("Generate caption error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
