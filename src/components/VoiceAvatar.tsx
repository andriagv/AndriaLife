import React, { useEffect, useRef, useState } from "react";
import { Mic, Minus } from "lucide-react";

import { useCategory } from "@/contexts/CategoryContext";
import { useLanguage } from "@/contexts/LanguageContext";

const AVATAR_URL = "https://georgian-voice-avatar.lovable.app";
const PANEL_WIDTH = 340; // px, keep in sync with the w-[min(340px,...)] class below
const PANEL_MARGIN = 16; // px, keep in sync with left-4 / right-4

const labels = {
  ka: { title: "ანდრიას ასისტენტი", minimize: "ასისტენტის დაპატარავება", open: "ასისტენტის გახსნა" },
  en: { title: "Andria's assistant", minimize: "Minimize assistant", open: "Open assistant" },
} as const;

/**
 * Voice assistant iframe.
 *
 * It sits in the hero until the hero scrolls out of view, then the very same iframe switches to a floating
 * panel in the bottom-right corner. Only CSS changes (no remount), so an ongoing conversation isn't interrupted
 * and the assistant stays visible while it scrolls the page around.
 */
const VoiceAvatar: React.FC = () => {
  const { language } = useLanguage();
  const text = labels[language === "en" ? "en" : "ka"];

  const { avatarHighlight, avatarListing } = useCategory();

  const slotRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const autoCollapsed = useRef(false); // collapsed by us (not by the visitor) to uncover the category buttons
  const [docked, setDocked] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [side, setSide] = useState<"left" | "right">("right");

  // While the assistant lists the areas the buttons must all be visible: keep the floating panel off them by
  // staying on the right if that is clear, else moving to the left, else collapsing.
  useEffect(() => {
    if (!avatarListing) return;
    const cards = Array.from(document.querySelectorAll("[data-category-id]"), (el) => el.getBoundingClientRect());
    const panelWidth = Math.min(PANEL_WIDTH, window.innerWidth - 2 * PANEL_MARGIN);
    const covers = (panelLeft: number) => cards.some((c) => c.left < panelLeft + panelWidth && c.right > panelLeft);

    if (!covers(window.innerWidth - PANEL_MARGIN - panelWidth)) setSide("right");
    else if (!covers(PANEL_MARGIN)) setSide("left");
    else {
      autoCollapsed.current = true;
      setMinimized(true);
    }
  }, [avatarListing]);

  // Once an area is picked the page moves on to its content, so a panel we collapsed can come back
  // (not on phones: there it would cover the very content the page just scrolled to)
  useEffect(() => {
    if (avatarHighlight && autoCollapsed.current) {
      autoCollapsed.current = false;
      if (window.innerWidth >= 768) setMinimized(false);
    }
  }, [avatarHighlight]);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Dock only after the slot has scrolled off the top (on phones the slot starts below the fold)
        const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setDocked(scrolledPast);
        // On small screens a floating panel would cover the page, so start it collapsed
        if (scrolledPast && !touched.current && window.innerWidth < 768) setMinimized(true);
      },
      { rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  const toggle = (value: boolean) => {
    touched.current = true;
    autoCollapsed.current = false;
    setMinimized(value);
  };

  const sideClass = side === "left" ? "left-4" : "right-4";

  const panelClass = docked
    ? [
        `fixed bottom-4 ${sideClass} z-40 flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl`,
        // The assistant page needs ~545px of height at this width, plus ~40px for our header and border
        "w-[min(340px,calc(100vw-2rem))] h-[min(600px,calc(100vh-6rem))]",
        minimized ? "invisible pointer-events-none" : "",
      ].join(" ")
    : "absolute inset-0 flex flex-col";

  return (
    <div ref={slotRef} className="relative w-full max-w-[470px] h-[560px]">
      <div className={panelClass}>
        {docked && (
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
            <span className="text-sm font-medium">{text.title}</span>
            <button
              type="button"
              onClick={() => toggle(true)}
              aria-label={text.minimize}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:text-primary"
            >
              <Minus size={16} />
            </button>
          </div>
        )}
        <iframe
          src={AVATAR_URL}
          allow="microphone; autoplay"
          title={labels.ka.title}
          loading="lazy"
          // Transparent + color-scheme: normal, otherwise the browser paints a white box behind the (dark-mode) avatar page
          className="min-h-0 w-full flex-1 border-0 bg-transparent [color-scheme:normal]"
        />
      </div>

      {docked && minimized && (
        <button
          type="button"
          onClick={() => toggle(false)}
          aria-label={text.open}
          className={`fixed bottom-4 ${sideClass} z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105`}
        >
          <Mic size={24} />
        </button>
      )}
    </div>
  );
};

export default VoiceAvatar;
