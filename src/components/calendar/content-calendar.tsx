"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { id as localeId } from "date-fns/locale/id";
import { enUS as localeEn } from "date-fns/locale/en-US";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLATFORMS } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { useLocaleStore } from "@/i18n/locale";
import type { CalendarEvent } from "@/types";

interface ContentCalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
}

export function ContentCalendar({ events, onEventClick, onDateClick }: ContentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const t = useTranslations();
  const { locale } = useLocaleStore();

  const dateFnsLocale = locale === "en" ? localeEn : localeId;

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = [];
  let day = calStart;
  while (day <= calEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.scheduled_at), date));
  };

  const weekDays = [
    t("calendar.weekMon"),
    t("calendar.weekTue"),
    t("calendar.weekWed"),
    t("calendar.weekThu"),
    t("calendar.weekFri"),
    t("calendar.weekSat"),
    t("calendar.weekSun"),
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          {format(currentMonth, "MMMM yyyy", { locale: dateFnsLocale })}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
          >
            {t("calendar.today")}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden">
        {/* Week day headers */}
        {weekDays.map((wd) => (
          <div key={wd} className="bg-secondary p-2 text-center text-xs font-medium text-muted-foreground">
            {wd}
          </div>
        ))}

        {/* Day cells */}
        {days.map((d, i) => {
          const dayEvents = getEventsForDate(d);
          const inMonth = isSameMonth(d, monthStart);

          return (
            <div
              key={i}
              className={`bg-card min-h-[100px] p-2 cursor-pointer hover:bg-secondary/50 transition ${
                !inMonth ? "opacity-40" : ""
              }`}
              onClick={() => onDateClick?.(d)}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs font-medium ${
                    isToday(d)
                      ? "w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                      : "text-foreground"
                  }`}
                >
                  {format(d, "d")}
                </span>
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => {
                  const platform = PLATFORMS.find((p) => p.value === event.platform);
                  return (
                    <div
                      key={event.id}
                      className="text-xs px-1.5 py-0.5 rounded truncate cursor-pointer hover:opacity-80"
                      style={{
                        backgroundColor: platform ? `${platform.color}15` : "#f1f5f9",
                        color: platform?.color || "#64748b",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                    >
                      {event.title}
                    </div>
                  );
                })}
                {dayEvents.length > 3 && (
                  <p className="text-xs text-muted-foreground">+{dayEvents.length - 3} {t("common.more")}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
