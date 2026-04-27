import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOpenAIClient } from "@/lib/openai/client";
import { generateContentPrompt } from "@/lib/openai/prompts/content";
import { contentOutputSchema } from "@/lib/openai/schemas/content";
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

    // Get brand context
    let brandContext;
    if (body.brandId) {
      const { data: brand } = await supabase
        .from("brands")
        .select("brand_name, brand_guidelines(tone_of_voice, tagline, visual_style)")
        .eq("id", body.brandId)
        .single();

      if (brand) {
        const g = brand.brand_guidelines?.[0] || {};
        brandContext = {
          brand_name: brand.brand_name,
          tone_of_voice: g.tone_of_voice,
          tagline: g.tagline,
          visual_style: g.visual_style,
        };
      }
    }

    const prompt = generateContentPrompt(body, brandContext, locale);

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Kamu adalah content creator profesional. Berikan output hanya dalam format JSON yang valid." },
        { role: "user", content: prompt },
      ],
      temperature: 0.85,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return NextResponse.json({ error: "Gagal generate konten" }, { status: 500 });

    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    const result = contentOutputSchema.safeParse(parsed);

    if (!result.success) {
      return NextResponse.json({ error: "Format output tidak valid" }, { status: 500 });
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error("Generate content error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
