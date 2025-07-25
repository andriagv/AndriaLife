import React, { createContext, useContext, ReactNode } from "react";

// Individual context interfaces following ISP
interface AppStateContextType {
  // Central app state management if needed
  isLoading: boolean;
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(() => {
    // Check user's system preference for reduced motion
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  return (
    <AppStateContext.Provider value={{ isLoading, reduceMotion, setReduceMotion }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};