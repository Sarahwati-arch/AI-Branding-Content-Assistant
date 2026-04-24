import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/openai/client";
import { generateLogoPrompt } from "@/lib/openai/prompts/branding";
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
    const prompt = generateLogoPrompt(body);

    const openai = getOpenAIClient();
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "b64_json",
    });

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) {
      return NextResponse.json(
        { error: "Gagal generate logo" },
        { status: 500 }
      );
    }

    // Convert base64 to Uint8Array for Supabase Storage upload
    const buffer = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const fileName = `${user.id}/${Date.now()}-logo.png`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("logos")
      .upload(fileName, buffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError || !uploadData) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Gagal menyimpan logo" },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from("logos")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (error) {
    console.error("Generate logo error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat generate logo" },
      { status: 500 }
    );
  }
}
