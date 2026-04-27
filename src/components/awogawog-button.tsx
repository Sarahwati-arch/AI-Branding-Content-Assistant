"use client";

import { useState, useCallback } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VALID_NAMES = [
  "piki",
  "Piki",
  "piky",
  "Piky",
  "picky",
  "Picky",
  "vicky",
  "Vicky",
  "victoria",
  "Victoria",
  "lanee",
  "Lanee",
  "lani",
  "Lani",
  "noelani",
  "Noelani",
  "depita",
  "Depita",
  "devita",
  "Devita",
  "sarah",
  "Sarah",
];

export function AwogawogButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setName("");
      setSubmitted(false);
      setIsMatch(false);
    }, 200);
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmed = name.trim().toLowerCase();
    const match = VALID_NAMES.includes(trimmed);
    setSubmitted(true);
    setIsMatch(match);

    if (!match) {
      setTimeout(() => {
        handleClose();
      }, 1500);
    }
  }, [name, handleClose]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer select-none"
      >
        awogawog?
      </button>

      <Dialog open={open} onClose={handleClose}>
        {!submitted ? (
          <div className="space-y-4 w-full max-w-sm mx-auto">
            <p className="text-sm text-muted-foreground">lu siape mpruy?</p>
            <div className="flex gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && name.trim()) handleSubmit();
                }}
                placeholder="ketik nama lu..."
                autoFocus
              />
              <Button
                onClick={handleSubmit}
                disabled={!name.trim()}
                size="md"
              >
                Gas
              </Button>
            </div>
          </div>
        ) : isMatch ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Aplikasi ini lahir dari brainstorming kita berhari-hari.
              Idenya terlalu kece untuk ditinggalin. Ini buat kalian ges, my beloved gang.
              Thankss udah mau ikut daftar hackathon bareng gw.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleClose} size="sm">
                Tutup
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-destructive font-medium">
            lu bukan geng kami
          </p>
        )}
      </Dialog>
    </>
  );
}
