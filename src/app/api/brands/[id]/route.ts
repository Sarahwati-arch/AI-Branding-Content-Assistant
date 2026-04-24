import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { data: brand, error } = await supabase
      .from("brands")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !brand) {
      return NextResponse.json({ error: "Brand tidak ditemukan" }, { status: 404 });
    }

    // Fetch guidelines separately to avoid RLS issues with join
    const { data: guidelines } = await supabase
      .from("brand_guidelines")
      .select("*")
      .eq("brand_id", id);

    const brandWithGuidelines = {
      ...brand,
      brand_guidelines: guidelines ?? [],
    };

    return NextResponse.json({ data: brandWithGuidelines });
  } catch (error) {
    console.error("Get brand error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { brand_guidelines, ...brandFields } = body;

    const { data: brand, error } = await supabase
      .from("brands")
      .update(brandFields)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("[PUT /api/brands] brand update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (brand_guidelines) {
      const { error: guidelinesError } = await supabase
        .from("brand_guidelines")
        .upsert(
          { brand_id: id, ...brand_guidelines },
          { onConflict: "brand_id" }
        );

      if (guidelinesError) {
        return NextResponse.json(
          { error: "Brand tersimpan tapi gagal menyimpan guidelines: " + guidelinesError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ data: brand });
  } catch (error) {
    console.error("Update brand error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { error } = await supabase
      .from("brands")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete brand error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
