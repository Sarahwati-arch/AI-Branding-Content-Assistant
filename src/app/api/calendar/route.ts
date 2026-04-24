import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: events, error } = await supabase
      .from("calendar_events")
      .select("*")
      .eq("user_id", user.id)
      .order("scheduled_at", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: events });
  } catch (error) {
    console.error("Get calendar events error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const content_id = body.content_id || null;

    const { data: event, error } = await supabase
      .from("calendar_events")
      .insert({
        user_id: user.id,
        title: body.title,
        description: body.description,
        platform: body.platform,
        scheduled_at: body.scheduled_at,
        content_id,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // If linked to content, update content status to "scheduled"
    if (content_id) {
      await supabase
        .from("contents")
        .update({ status: "scheduled", scheduled_at: body.scheduled_at })
        .eq("id", content_id);
    }

    return NextResponse.json({ data: event }, { status: 201 });
  } catch (error) {
    console.error("Create calendar event error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
