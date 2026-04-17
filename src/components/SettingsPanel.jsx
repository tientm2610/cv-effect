import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';

function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setAccentColor, setMode, setWeather, toggleMode } = useTheme();
  const panelRef = React.useRef(null);
  
  useGSAP(() => {
    if (isOpen && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [isOpen]);
  
  const colors = [
    { name: 'Cyan', value: '#22d3ee' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Rose', value: '#fb7185' },
    { name: 'Amber', value: '#fbbf24' },
    { name: 'Emerald', value: '#34d399' },
    { name: 'Blue', value: '#60a5fa' },
  ];
  
  const modes = [
    { name: 'Space', value: 'dark', icon: 'Moon' },
    { name: 'Nature', value: 'light', icon: 'Sun' },
  ];
  
  const weathers = [
    { name: 'Clear', value: 'clear' },
    { name: 'Rainy', value: 'rainy' },
    { name: 'Cloudy', value: 'cloudy' },
  ];
  
  const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
  
  const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
  
  const CloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  );
  
  const RainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><line x1="4" y1="4" x2="2" y2="6"/><line x1="10" y1="4" x2="8" y2="6"/><line x1="16" y1="4" x2="14" y2="6"/><line x1="22" y1="4" x2="20" y2="6"/>
    </svg>
  );
  
  const GearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
  
  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-24 right-4 z-[9999] w-12 h-12 rounded-full glass-card flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all cursor-hover"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <GearIcon />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ x: 300, opacity: 0 }}
            exit={{ x: 300, opacity: 0, duration: 0.3 }}
            className="fixed top-24 right-16 w-72 z-[9998] rounded-2xl glass-card p-5"
            style={{ 
              backdropFilter: 'blur(20px)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Theme Settings
            </h3>
            
            <div className="mb-5">
              <label className="text-sm mb-2 block" style={{ color: 'var(--text-secondary)' }}>
                Accent Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color.value}
                    onClick={() => setAccentColor(color.value)}
                    className="w-8 h-8 rounded-full transition-transform hover:scale-110 cursor-hover"
                    style={{ 
                      background: color.value,
                      transform: theme.accentColor === color.value ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: theme.accentColor === color.value ? `0 0 12px ${color.value}` : 'none',
                    }}
                    title={color.name}
                  />
                ))}
              </div>
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-full mt-2 h-8 rounded cursor-pointer"
              />
            </div>
            
            <div className="mb-5">
              <label className="text-sm mb-2 block" style={{ color: 'var(--text-secondary)' }}>
                Mode
              </label>
              <div className="flex gap-2">
                {modes.map(mode => (
                  <button
                    key={mode.value}
                    onClick={() => setMode(mode.value)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all cursor-hover ${
                      theme.mode === mode.value 
                        ? 'ring-2 ring-[var(--accent-primary)]' 
                        : ''
                    }`}
                    style={{ 
                      background: theme.mode === mode.value ? 'var(--accent-glow)' : 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {mode.icon === 'Sun' ? <SunIcon /> : <MoonIcon />}
                      {mode.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { SettingsPanel };
export default SettingsPanel;