import React, { createContext, useContext, useState, ReactNode } from "react";

export type Category = "ios" | "camps" | "academic" | "design" | "photography" | "robotics" | "mathematics" | "sports";

interface CategoryContextType {
  category: Category;
  setCategory: (category: Category) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<Category>("ios");

  const setCategoryAndScroll = (newCategory: Category) => {
    setCategory(newCategory);
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <CategoryContext.Provider value={{ category, setCategory: setCategoryAndScroll }}>
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
