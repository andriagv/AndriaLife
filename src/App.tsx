
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
import { CategoryProvider, useCategory } from "./contexts/CategoryContext";
import ReflectBackground2 from "@/components/common/ReflectBackground2";

const queryClient = new QueryClient();

// MusicPlayer component to handle music logic inside CategoryProvider
const MusicPlayer: React.FC<{ children: (props: { musicPlaying: boolean; onMusicToggle: () => void; audioRef: React.RefObject<HTMLAudioElement> }) => React.ReactNode }> = ({ children }) => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { category } = useCategory();
  const musicMap: Record<string, string> = {
    sports: "/music/sportmusic.mp3",
    camps: "/music/campmusic.mp3",
    mathematics: "/music/mathsong.mp3",
    robotics: "/music/robotsong.mp3",
    // add more as needed
  };
  const musicSrc = musicMap[category] || "/music/mainmusic.mp3";
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (musicPlaying) {
        audioRef.current.play();
      }
    }
  }, [musicSrc]);
  React.useEffect(() => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicPlaying]);
  const handleMusicToggle = () => setMusicPlaying((v) => !v);
  return <>
    <audio ref={audioRef} src={musicSrc} loop style={{ display: 'none' }} />
    {children({ musicPlaying, onMusicToggle: handleMusicToggle, audioRef })}
  </>;
};

const App = () => {
  const [showParticles, setShowParticles] = useState(true);
  const [showSplashCursor, setShowSplashCursor] = useState(true);
  const [showSplineBackground, setShowSplineBackground] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showReflectBackground, setShowReflectBackground] = useState(true);

  // Remove Spline script loader

  return (
    <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppStateProvider>
            <CategoryProvider>
              <ThemeProvider>
                <LanguageProvider>
                  <TooltipProvider>
                    <MusicPlayer>
                      {({ musicPlaying, onMusicToggle, audioRef }) => {
                        // Set audio volume when volume state changes
                        React.useEffect(() => {
                          if (audioRef && audioRef.current) {
                            audioRef.current.volume = volume / 100;
                          }
                        }, [volume, audioRef]);
                        return <>
                          {/* Animated Spline Background using React component */}
                          {showSplineBackground && (
                            <div
                              style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '1000vh',
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
                          {/* Add ReflectBackground2 as a background layer */}
                          {showReflectBackground && <ReflectBackground2 />}
                          <Navbar
                            showParticles={showParticles}
                            setShowParticles={setShowParticles}
                            showSplashCursor={showSplashCursor}
                            setShowSplashCursor={setShowSplashCursor}
                            showSplineBackground={showSplineBackground}
                            setShowSplineBackground={setShowSplineBackground}
                            musicPlaying={musicPlaying}
                            onMusicToggle={onMusicToggle}
                            volume={volume}
                            onVolumeChange={setVolume}
                            showReflectBackground={showReflectBackground}
                            setShowReflectBackground={setShowReflectBackground}
                          />
                          <BrowserRouter>
                            <Routes>
                              <Route path="/" element={<Index showParticles={showParticles} setShowParticles={setShowParticles} showSplashCursor={showSplashCursor} setShowSplashCursor={setShowSplashCursor} />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </BrowserRouter>
                        </>;
                      }}
                    </MusicPlayer>
                  </TooltipProvider>
                </LanguageProvider>
              </ThemeProvider>
            </CategoryProvider>
          </AppStateProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ClickSpark>
  );
};

export default App;
