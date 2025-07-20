
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
import ClickSpark from "@/components/ClickSpark";
import Spline from '@splinetool/react-spline';
import { Switch } from "@/components/ui/switch";
// Remove import of ReactQueryDevtools since the module is missing

const queryClient = new QueryClient();

const App = () => {
  const [showParticles, setShowParticles] = useState(true);
  const [showSplashCursor, setShowSplashCursor] = useState(true);
  const [showSplineBackground, setShowSplineBackground] = useState(false);
  console.log('showSplineBackground:', showSplineBackground);

  // Remove Spline script loader

  return (
    <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppStateProvider>
            <ThemeProvider>
              <LanguageProvider>
                <TooltipProvider>
                  {/* Animated Spline Background using React component */}
                  {showSplineBackground && (
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 0,
                        pointerEvents: 'none',
                        overflow: 'hidden',
                      }}
                    >
                      <Spline
                        scene="https://prod.spline.design/qBilcHnHrzoU2dwg/scene.splinecode"
                        style={{
                          width: '120vw',
                          height: '120vh',
                          minWidth: '100vw',
                          minHeight: '100vh',
                          transform: 'scale(1.2)',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                      />
                    </div>
                  )}
                  {/* Spline animated background temporarily disabled for debugging 3D ring */}
                  {showSplashCursor && <SplashCursor />}
                  <Toaster />
                  <Sonner />
                  <Navbar
                    showParticles={showParticles}
                    setShowParticles={setShowParticles}
                    showSplashCursor={showSplashCursor}
                    setShowSplashCursor={setShowSplashCursor}
                    showSplineBackground={showSplineBackground}
                    setShowSplineBackground={setShowSplineBackground}
                  />
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
    </ClickSpark>
  );
};

export default App;
