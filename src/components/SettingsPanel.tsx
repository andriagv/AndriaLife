import React from 'react';
import { motion } from 'framer-motion';
import StyledSwitch from './ui/StyledSwitch';
import { Music, Volume2, Pause, Play } from 'lucide-react';
import SegmentedControl from './ui/SegmentedControl';

interface SettingsPanelProps {
  showParticles: boolean;
  setShowParticles: (v: boolean) => void;
  showSplashCursor: boolean;
  setShowSplashCursor: (v: boolean) => void;
  musicPlaying: boolean;
  onMusicToggle: () => void;
  volume: number;
  onVolumeChange: (v: number) => void;
  backgroundMode: 'none' | '3d' | 'reflect';
  setBackgroundMode: (mode: 'none' | '3d' | 'reflect') => void;
  showHeroAnimation: boolean;
  setShowHeroAnimation: (v: boolean) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  showParticles,
  setShowParticles,
  showSplashCursor,
  setShowSplashCursor,
  musicPlaying,
  onMusicToggle,
  volume,
  onVolumeChange,
  backgroundMode,
  setBackgroundMode,
  showHeroAnimation,
  setShowHeroAnimation,
}) => {
  const backgroundOptions = [
    { label: 'None', value: 'none' as const },
    { label: '3D', value: '3d' as const },
    { label: 'Reflect', value: 'reflect' as const },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-80 p-6 bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-black/20 shadow-xl rounded-2xl"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Display Settings</h3>
          <div className="space-y-4">
            <SettingRow label="Particles">
              <StyledSwitch checked={showParticles} onCheckedChange={setShowParticles} />
            </SettingRow>
            <SettingRow label="Splash Cursor">
              <StyledSwitch checked={showSplashCursor} onCheckedChange={setShowSplashCursor} />
            </SettingRow>
            <SettingRow label="Hero Animation">
              <StyledSwitch checked={showHeroAnimation} onCheckedChange={setShowHeroAnimation} />
            </SettingRow>
            <SettingRow label="Background">
              <SegmentedControl
                options={backgroundOptions}
                value={backgroundMode}
                onChange={(value) => setBackgroundMode(value)}
              />
            </SettingRow>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Sound Settings</h3>
          <div className="space-y-4">
            <SettingRow label="Music">
              <button
                onClick={onMusicToggle}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${
                  musicPlaying ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-black/20 dark:bg-white/10'
                }`}
              >
                {musicPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </SettingRow>
            <SettingRow label="Volume">
              <div className="w-full flex items-center gap-2">
                <Volume2 size={20} className="text-gray-700 dark:text-white/70" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </SettingRow>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SettingRow: React.FC<{ label: string, children: React.ReactNode }> = ({ label, children }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-800 dark:text-white font-medium">{label}</span>
      {children}
    </div>
  );
};

export default SettingsPanel; 