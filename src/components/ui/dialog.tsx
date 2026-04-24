"use client";

import { useEffect, useRef, useState } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Dialog({ open, onClose, children, title }: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setVisible(false), 200);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={`fixed inset-0 bg-overlay transition-opacity duration-200 ${
          animateIn ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative bg-card rounded-xl border border-border shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-200 ${
          animateIn
            ? "opacity-100 scale-100"
            : "opacity-0 scale-[0.95]"
        }`}
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
