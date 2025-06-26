import React, { createContext, useContext, ReactNode } from "react";

// Individual context interfaces following ISP
interface AppStateContextType {
  // Central app state management if needed
  isLoading: boolean;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading] = React.useState(false);

  return (
    <AppStateContext.Provider value={{ isLoading }}>
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