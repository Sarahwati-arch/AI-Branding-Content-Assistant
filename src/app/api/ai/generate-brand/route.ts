import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/openai/client";
import { generateBrandKitPrompt } from "@/lib/openai/prompts/branding";
import { brandKitSchema } from "@/lib/openai/schemas/branding";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const prompt = generateBrandKitPrompt(body);

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah ahli branding profesional. Berikan output hanya dalam format JSON yang valid.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "Gagal generate brand kit" },
        { status: 500 }
      );
    }

    // Clean and parse JSON
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // Validate with Zod
    const result = brandKitSchema.safeParse(parsed);
    if (!result.success) {
      return NextResponse.json(
        { error: "Format output tidak valid", details: result.error.issues },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    console.error("Generate brand error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat generate brand kit" },
      { status: 500 }
    );
  }
}
