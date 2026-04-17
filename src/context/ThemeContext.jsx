import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const defaultTheme = {
  accentColor: '#22d3ee',
  mode: 'dark',
  weather: 'clear',
};

const ThemeContext = createContext({
  theme: defaultTheme,
  setAccentColor: () => {},
  setMode: () => {},
  setWeather: () => {},
  toggleMode: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) {
        try {
          return { ...defaultTheme, ...JSON.parse(saved) };
        } catch {
          return defaultTheme;
        }
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', JSON.stringify(theme));
    
    document.documentElement.style.setProperty('--accent-primary', theme.accentColor);
    document.documentElement.style.setProperty('--accent-secondary', adjustBrightness(theme.accentColor, -30));
    document.documentElement.style.setProperty('--accent-glow', theme.accentColor + '40');
    
    document.documentElement.setAttribute('data-mode', theme.mode);
    document.documentElement.setAttribute('data-weather', theme.weather);
  }, [theme]);

  const setAccentColor = useCallback((color) => {
    setTheme(prev => ({ ...prev, accentColor: color }));
  }, []);

  const setMode = useCallback((mode) => {
    setTheme(prev => ({ ...prev, mode }));
  }, []);

  const setWeather = useCallback((weather) => {
    setTheme(prev => ({ ...prev, weather }));
  }, []);

  const toggleMode = useCallback(() => {
    setTheme(prev => ({ 
      ...prev, 
      mode: prev.mode === 'dark' ? 'light' : 'dark' 
    }));
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setAccentColor, 
      setMode, 
      setWeather,
      toggleMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}