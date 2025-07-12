
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AppStateProvider } from "./contexts/AppStateContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Particles from "@/components/Particles";
import React, { useState } from "react";
import SplashCursor from "@/components/SplashCursor";
import Navbar from "./components/Navbar";
import { useTheme } from "@/contexts/ThemeContext";
// Remove import of ReactQueryDevtools since the module is missing

const queryClient = new QueryClient();

const App = () => {
  const [showParticles, setShowParticles] = useState(true);
  const [showSplashCursor, setShowSplashCursor] = useState(true);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppStateProvider>
          <ThemeProvider>
            <LanguageProvider>
              <TooltipProvider>
                {showSplashCursor && <SplashCursor />}
                <Toaster />
                <Sonner />
                <Navbar />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index showParticles={showParticles} setShowParticles={setShowParticles} showSplashCursor={showSplashCursor} setShowSplashCursor={setShowSplashCursor} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </LanguageProvider>
          </ThemeProvider>
        </AppStateProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
