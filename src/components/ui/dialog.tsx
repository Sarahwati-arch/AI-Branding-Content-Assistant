"use client";

import { useEffect, useRef, useState } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Dialog({ open, onClose, children, title }: DialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    setVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimateIn(true));
    });

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open && visible) {
      setAnimateIn(false);
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open, visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`relative bg-card rounded-xl border border-border shadow-xl max-w-sm w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-200 ${
          animateIn
            ? "opacity-100 scale-100"
            : "opacity-0 scale-[0.95]"
        }`}
        ref={contentRef}
      >
        {title && (
          <div className="p-6 pb-0">
            <h2 className="text-lg font-semibold text-card-foreground">
              {title}
            </h2>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
