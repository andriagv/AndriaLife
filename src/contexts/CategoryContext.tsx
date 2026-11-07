import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

export type Category = "ios" | "camps" | "academic" | "design" | "photography" | "robotics" | "mathematics" | "sports";

// The voice assistant lives in an iframe on another origin and talks to the page via postMessage.
// These ids are shared with the assistant, so don't rename them without updating it too.
const AVATAR_ORIGIN = "https://georgian-voice-avatar.lovable.app";
const AVATAR_LIST_MESSAGE = "andria-avatar:categories"; // it is listing the areas
const AVATAR_PICK_MESSAGE = "andria-avatar:category"; // an area was picked
const CATEGORY_IDS: readonly Category[] = ["ios", "camps", "academic", "design", "photography", "robotics", "mathematics", "sports"];
const AVATAR_HIGHLIGHT_MS = 2800;

/**
 * Scrolls to the category buttons so that all of them are on screen. Starts at the top of the section, or a bit
 * further down when the last row would end up below the fold, but never so far that the first row hides under
 * the fixed navbar.
 */
const scrollToCategories = () => {
  const section = document.getElementById("category-selection");
  if (!section) return;

  const clearance = parseFloat(getComputedStyle(section).scrollMarginTop) || 0; // space for the fixed navbar
  let top = section.getBoundingClientRect().top + window.scrollY - clearance;

  const cards = Array.from(document.querySelectorAll("[data-category-id]"), (el) => el.getBoundingClientRect());
  if (cards.length) {
    const firstTop = Math.min(...cards.map((c) => c.top)) + window.scrollY;
    const lastBottom = Math.max(...cards.map((c) => c.bottom)) + window.scrollY;
    top = Math.min(Math.max(top, lastBottom + 24 - window.innerHeight), firstTop - clearance);
  }
  window.scrollTo({ top, behavior: "smooth" });
};

/** Scrolls to the content of the selected category (the robotics page has no "about" block, only a placeholder). */
const scrollToDetails = () => {
  const target = document.getElementById("about") ?? document.getElementById("robotics-coming-soon");
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
};

interface CategoryContextType {
  category: Category;
  setCategory: (category: Category) => void;
  /** Category the assistant picked most recently; set for a couple of seconds so the UI can flash it. */
  avatarHighlight: Category | null;
  /** Counts how many times the assistant has listed the areas (0 = never), so the UI can react to each one. */
  avatarListing: number;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<Category>("ios");
  const [avatarHighlight, setAvatarHighlight] = useState<Category | null>(null);
  const [avatarListing, setAvatarListing] = useState(0);
  const [detailsScrolls, setDetailsScrolls] = useState(0);
  const highlightTimer = useRef<ReturnType<typeof setTimeout>>();

  const setCategoryAndScroll = (newCategory: Category) => {
    setCategory(newCategory);
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Scroll to the details only after the new category has rendered: switching from robotics mounts #about
  useEffect(() => {
    if (detailsScrolls > 0) scrollToDetails();
  }, [detailsScrolls]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== AVATAR_ORIGIN) return;

      // 1) The assistant lists the areas -> show the buttons
      if (e.data?.type === AVATAR_LIST_MESSAGE) {
        scrollToCategories();
        setAvatarListing((n) => n + 1);
        return;
      }

      // 2) An area was picked -> select it, flash its button and move on to its content
      if (e.data?.type === AVATAR_PICK_MESSAGE && CATEGORY_IDS.includes(e.data.category)) {
        const next = e.data.category as Category;
        setCategory(next); // not setCategoryAndScroll: that one centers #about, here it should start at the top
        setAvatarHighlight(next);
        clearTimeout(highlightTimer.current);
        highlightTimer.current = setTimeout(() => setAvatarHighlight(null), AVATAR_HIGHLIGHT_MS);
        setDetailsScrolls((n) => n + 1);
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(highlightTimer.current);
    };
  }, []);

  return (
    <CategoryContext.Provider value={{ category, setCategory: setCategoryAndScroll, avatarHighlight, avatarListing }}>
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
