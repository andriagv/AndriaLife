
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
import React, { useState, useEffect } from "react";
import SplashCursor from "@/components/SplashCursor";
import Navbar from "./components/Navbar";
import { useTheme } from "@/contexts/ThemeContext";
import ClickSpark from "@/components/ClickSpark";
import ReactLazy, { Suspense } from 'react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));
import { Switch } from "@/components/ui/switch";
import { CategoryProvider, useCategory } from "./contexts/CategoryContext";
import ReflectBackground2 from "@/components/common/ReflectBackground2";
import Preloader from "./components/Preloader";
import { useIsMobile } from "@/hooks/use-mobile";
import WelcomeAlert from "@/components/WelcomeAlert";

const queryClient = new QueryClient();

// MusicPlayer component to handle music logic inside CategoryProvider
const MusicPlayer: React.FC<{ children: (props: { musicPlaying: boolean; onMusicToggle: () => void; audioRef: React.RefObject<HTMLAudioElement>; audioLoaded: boolean; isLoadingMusic: boolean }) => React.ReactNode }> = ({ children }) => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [isLoadingMusic, setIsLoadingMusic] = useState(false);
  const [currentMusicSrc, setCurrentMusicSrc] = useState<string>('');
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

  // Load audio only when user first enables music
  const loadAudio = async (src: string) => {
    setIsLoadingMusic(true);
    try {
      if (audioRef.current) {
        audioRef.current.src = src;
        audioRef.current.load();
        setCurrentMusicSrc(src);
        setAudioLoaded(true);
      }
    } catch (error) {
      console.error('Failed to load audio:', error);
    } finally {
      setIsLoadingMusic(false);
    }
  };

  // Handle category changes - update music source if already loaded
  React.useEffect(() => {
    if (audioLoaded && audioRef.current && musicSrc !== currentMusicSrc) {
      const wasPlaying = musicPlaying;
      if (wasPlaying) {
        audioRef.current.pause();
      }
      
      // Load new music source
      loadAudio(musicSrc).then(() => {
        if (wasPlaying && audioRef.current) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              setMusicPlaying(false);
            });
          }
        }
      });
    }
  }, [musicSrc, audioLoaded]);

  React.useEffect(() => {
    if (audioRef.current && audioLoaded) {
      if (musicPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            setMusicPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicPlaying, audioLoaded]);

  const handleMusicToggle = async () => {
    if (!audioLoaded) {
      await loadAudio(musicSrc);
    }
    setMusicPlaying((v) => !v);
  };

  return <>
    <audio ref={audioRef} loop style={{ display: 'none' }} preload="none" />
    {children({ musicPlaying, onMusicToggle: handleMusicToggle, audioRef, audioLoaded, isLoadingMusic })}
  </>;
};

type BackgroundMode = 'none' | '3d' | 'reflect';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showParticles, setShowParticles] = useState(false);
  const [showSplashCursor, setShowSplashCursor] = useState(false);
  const [volume, setVolume] = useState(30);
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>('reflect');
  const [showHeroAnimation, setShowHeroAnimation] = useState(true);
  const [showTargetCursor, setShowTargetCursor] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  // Remove Spline script loader

  return (
    <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppStateProvider>
            <CategoryProvider>
              <ThemeProvider>
                <LanguageProvider>
                  <WelcomeAlert />
                  <TooltipProvider>
                    <MusicPlayer>
                      {({ musicPlaying, onMusicToggle, audioRef, audioLoaded, isLoadingMusic }) => {
                        // Set audio volume when volume state changes
                        React.useEffect(() => {
                          if (audioRef && audioRef.current) {
                            audioRef.current.volume = volume / 100;
                          }
                        }, [volume, audioRef]);
                        return <>
                          {/* Animated Spline Background using React component */}
                          {backgroundMode === '3d' && (
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
                              <Suspense fallback={null}>
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
                              </Suspense>
                            </div>
                          )}
                          {/* Spline animated background temporarily disabled for debugging 3D ring */}
                          {showSplashCursor && !isMobile && <SplashCursor />}
                          <Toaster />
                          <Sonner />
                          {/* Add ReflectBackground2 as a background layer */}
                          {backgroundMode === 'reflect' && <ReflectBackground2 />}
                          <Navbar
                            showParticles={showParticles}
                            setShowParticles={setShowParticles}
                            showSplashCursor={showSplashCursor}
                            setShowSplashCursor={setShowSplashCursor}
                            showTargetCursor={showTargetCursor}
                            setShowTargetCursor={setShowTargetCursor}
                            musicPlaying={musicPlaying}
                            onMusicToggle={onMusicToggle}
                            volume={volume}
                            onVolumeChange={setVolume}
                            backgroundMode={backgroundMode}
                            setBackgroundMode={setBackgroundMode}
                            showHeroAnimation={showHeroAnimation}
                            setShowHeroAnimation={setShowHeroAnimation}
                            audioLoaded={audioLoaded}
                            isLoadingMusic={isLoadingMusic}
                          />
                          <BrowserRouter>
                            <Routes>
                              <Route path="/" element={<Index showParticles={showParticles} setShowParticles={setShowParticles} showSplashCursor={showSplashCursor} setShowSplashCursor={setShowSplashCursor} backgroundMode={backgroundMode} showHeroAnimation={showHeroAnimation} 
                                showTargetCursor={showTargetCursor} setShowTargetCursor={setShowTargetCursor}
                              />} />
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
