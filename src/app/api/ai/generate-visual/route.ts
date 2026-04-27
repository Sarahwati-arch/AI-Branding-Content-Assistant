import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOpenAIClient } from "@/lib/openai/client";
import { PLATFORM_IMAGE_SIZES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/openai/prompts/index";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const cookieStore = await cookies();
    const locale = (cookieStore.get("locale")?.value as Locale) || "id";

    const { brandId, platform, description, style } = await request.json();

    // Get brand context for visual
    let visualContext = "";
    if (brandId) {
      const { data: brand } = await supabase
        .from("brands")
        .select("brand_name, brand_guidelines(primary_color, visual_style)")
        .eq("id", brandId)
        .single();

      if (brand?.brand_guidelines?.[0]) {
        const g = brand.brand_guidelines[0];
        visualContext = ` Brand: ${brand.brand_name}. Color theme: ${g.primary_color}. Style: ${g.visual_style}.`;
      }
    }

    const prompt = `Create a social media visual for ${platform}: ${description}.${visualContext} Style: ${style || "modern and clean"}. High quality, professional design, suitable for ${platform}.`;

    const openai = getOpenAIClient();
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) return NextResponse.json({ error: "Gagal generate visual" }, { status: 500 });

    const sizeInfo = PLATFORM_IMAGE_SIZES[platform as keyof typeof PLATFORM_IMAGE_SIZES];

    return NextResponse.json({
      url: imageUrl,
      platform,
      recommended_size: sizeInfo,
    });
  } catch (error) {
    console.error("Generate visual error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
