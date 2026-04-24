import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: brands, error } = await supabase
      .from("brands")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch all guidelines for user's brands separately
    const brandIds = (brands ?? []).map((b: { id: string }) => b.id);
    let guidelinesMap: Record<string, unknown[]> = {};

    if (brandIds.length > 0) {
      const { data: allGuidelines } = await supabase
        .from("brand_guidelines")
        .select("*")
        .in("brand_id", brandIds);

      for (const g of allGuidelines ?? []) {
        const bid = (g as { brand_id: string }).brand_id;
        if (!guidelinesMap[bid]) guidelinesMap[bid] = [];
        guidelinesMap[bid].push(g);
      }
    }

    const brandsWithGuidelines = (brands ?? []).map((b: { id: string }) => ({
      ...b,
      brand_guidelines: guidelinesMap[b.id] ?? [],
    }));

    return NextResponse.json({ data: brandsWithGuidelines });
  } catch (error) {
    console.error("Get brands error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}

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
    const { brand_name, industry, description, target_audience, unique_value, logo_url, brand_guidelines } = body;

    const { data: brand, error } = await supabase
      .from("brands")
      .insert({
        user_id: user.id,
        brand_name,
        industry,
        description,
        target_audience,
        unique_value,
        logo_url,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (brand_guidelines) {
      const { error: guidelinesError } = await supabase
        .from("brand_guidelines")
        .insert({
          brand_id: brand.id,
          ...brand_guidelines,
        });

      if (guidelinesError) {
        return NextResponse.json(
          { error: "Brand tersimpan tapi gagal menyimpan guidelines: " + guidelinesError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ data: brand }, { status: 201 });
  } catch (error) {
    console.error("Create brand error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}
