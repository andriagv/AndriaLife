'use client'

import React, { useState } from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AppStateProvider } from '@/contexts/AppStateContext'
import { CategoryProvider, useCategory } from '@/contexts/CategoryContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import ErrorBoundary from '@/components/ErrorBoundary'
import ClickSpark from '@/components/ClickSpark'
import WelcomeAlert from '@/components/WelcomeAlert'
import ReflectBackground2 from '@/components/common/ReflectBackground2'
import Navbar from '@/components/Navbar'
import SplashCursor from '@/components/SplashCursor'
import AiAgentWidget from '@/components/AiAgent/AiAgentWidget'
import { useIsMobile } from '@/hooks/use-mobile'

const queryClient = new QueryClient()

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

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
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
                        const [volume, setVolume] = useState(30);
                        const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>('reflect');
                        const [showParticles, setShowParticles] = useState(false);
                        const [showSplashCursor, setShowSplashCursor] = useState(false);
                        const [showTargetCursor, setShowTargetCursor] = useState(false);
                        const [showHeroAnimation, setShowHeroAnimation] = useState(true);
                        const isMobile = useIsMobile();

                        // Set audio volume when volume state changes
                        React.useEffect(() => {
                          if (audioRef && audioRef.current) {
                            audioRef.current.volume = volume / 100;
                          }
                        }, [volume, audioRef]);

                        return <>
                          {showSplashCursor && !isMobile && <SplashCursor />}
                          <Toaster />
                          <Sonner />
                          {backgroundMode === 'reflect' && <ReflectBackground2 />}
                          <AiAgentWidget />
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
                          {children}
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
}
