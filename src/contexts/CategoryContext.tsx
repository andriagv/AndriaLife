import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

export type Category = "ios" | "camps" | "academic" | "design" | "photography" | "robotics" | "mathematics" | "sports";

// The voice assistant lives in an iframe on another origin and asks us to switch category via postMessage.
// These ids are shared with the assistant, so don't rename them without updating it too.
const AVATAR_ORIGIN = "https://georgian-voice-avatar.lovable.app";
const AVATAR_MESSAGE_TYPE = "andria-avatar:category";
const CATEGORY_IDS: readonly Category[] = ["ios", "camps", "academic", "design", "photography", "robotics", "mathematics", "sports"];
const AVATAR_HIGHLIGHT_MS = 2800;

/**
 * Scrolls to the top of the category section, or a little further if the picked button wouldn't fit on screen
 * (the section heading is tall, so on a laptop screen the second row of buttons ends up below the fold).
 */
const scrollToCategories = (picked: Category) => {
  const section = document.getElementById("category-selection");
  if (!section) return;

  const clearance = parseFloat(getComputedStyle(section).scrollMarginTop) || 0; // space for the fixed navbar
  let top = section.getBoundingClientRect().top + window.scrollY - clearance;

  const card = document.querySelector(`[data-category-id="${picked}"]`);
  if (card) {
    const cardBottom = card.getBoundingClientRect().bottom + window.scrollY;
    top = Math.max(top, cardBottom + 24 - window.innerHeight);
  }
  window.scrollTo({ top, behavior: "smooth" });
};

interface CategoryContextType {
  category: Category;
  setCategory: (category: Category) => void;
  /** Category the assistant picked most recently; set for a couple of seconds so the UI can flash it. */
  avatarHighlight: Category | null;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<Category>("ios");
  const [avatarHighlight, setAvatarHighlight] = useState<Category | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout>>();

  const setCategoryAndScroll = (newCategory: Category) => {
    setCategory(newCategory);
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== AVATAR_ORIGIN || e.data?.type !== AVATAR_MESSAGE_TYPE) return;
      const next = e.data.category as Category;
      if (!CATEGORY_IDS.includes(next)) return;

      // Not setCategoryAndScroll on purpose: that one jumps to #about, but here people should land on the category buttons.
      setCategory(next);
      setAvatarHighlight(next);
      clearTimeout(highlightTimer.current);
      highlightTimer.current = setTimeout(() => setAvatarHighlight(null), AVATAR_HIGHLIGHT_MS);
      scrollToCategories(next);
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(highlightTimer.current);
    };
  }, []);

  return (
    <CategoryContext.Provider value={{ category, setCategory: setCategoryAndScroll, avatarHighlight }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
