"use client";

import { useEffect, useState } from "react";
import { ContentCalendar } from "@/components/calendar/content-calendar";
import { ScheduleModal } from "@/components/calendar/schedule-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocaleStore } from "@/i18n/locale";
import type { CalendarEvent } from "@/types";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [scheduling, setScheduling] = useState(false);
  const t = useTranslations();
  const { locale } = useLocaleStore();

  const dateLocale = locale === "en" ? "en-US" : "id-ID";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/calendar");
      const data = await res.json();
      setEvents(data.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleSchedule = async (data: {
    title: string;
    description: string;
    platform: string;
    scheduled_at: string;
    content_id?: string | null;
  }) => {
    setScheduling(true);
    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetchEvents();
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error scheduling:", error);
    } finally {
      setScheduling(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm(t("calendar.confirmDeleteEvent"))) return;
    try {
      await fetch(`/api/calendar/${id}`, { method: "DELETE" });
      setSelectedEvent(null);
      await fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{t("calendar.title")}</h1>
          <p className="text-muted-foreground mt-1">{t("calendar.subtitle")}</p>
        </div>
        <Button onClick={() => { setSelectedDate(new Date()); setModalOpen(true); }}>
          <Plus size={18} className="mr-2" />
          {t("calendar.scheduleContent")}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {loading ? (
            <div className="h-96 rounded-xl bg-secondary animate-pulse" />
          ) : (
            <ContentCalendar
              events={events}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
            />
          )}
        </div>

        {/* Sidebar - Event Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">{t("calendar.eventDetail")}</h3>
          {selectedEvent ? (
            <div className="p-4 rounded-xl border border-border bg-card space-y-3">
              <h4 className="font-medium text-foreground">{selectedEvent.title}</h4>
              {selectedEvent.description && (
                <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
              )}
              <Badge>{selectedEvent.platform}</Badge>
              <p className="text-xs text-muted-foreground">
                {new Date(selectedEvent.scheduled_at).toLocaleDateString(dateLocale, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => handleDeleteEvent(selectedEvent.id)}
              >
                <Trash2 size={14} className="mr-1" />
                {t("common.delete")}
              </Button>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-border bg-card text-center">
              <p className="text-sm text-muted-foreground">
                {t("calendar.noSelection")}
              </p>
            </div>
          )}

          {/* Upcoming Events */}
          <h3 className="font-semibold text-foreground mt-6">{t("calendar.upcoming")}</h3>
          <div className="space-y-2">
            {events
              .filter((e) => new Date(e.scheduled_at) >= new Date())
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border border-border bg-card cursor-pointer hover:bg-secondary/50 transition"
                  onClick={() => setSelectedEvent(event)}
                >
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.scheduled_at).toLocaleDateString(dateLocale, {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            {events.filter((e) => new Date(e.scheduled_at) >= new Date()).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                {t("calendar.noUpcoming")}
              </p>
            )}
          </div>
        </div>
      </div>

      <ScheduleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedDate={selectedDate}
        onSubmit={handleSchedule}
        loading={scheduling}
      />
    </div>
  );
}
