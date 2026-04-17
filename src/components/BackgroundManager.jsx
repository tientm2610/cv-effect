import React, { useState, useEffect, Suspense } from 'react';
import { useTheme } from '../context/ThemeContext';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import SpaceBackground from './SpaceBackground';
import NatureEnvironment from './NatureEnvironment';

function FadeLoader({ isLoading }) {
  if (!isLoading) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      style={{ background: 'var(--bg-main)', transition: 'opacity 0.5s ease' }}
    >
      <div className="flex flex-col items-center">
        <div 
          className="w-2 h-2 rounded-full mb-2"
          style={{ 
            background: 'var(--accent-primary)',
            animation: 'pulse 1s ease-in-out infinite'
          }}
        />
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>
      </div>
    </div>
  );
}

function BackgroundManager() {
  const { theme } = useTheme();
  const [currentMode, setCurrentMode] = useState(theme.mode);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    if (currentMode !== theme.mode) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setCurrentMode(theme.mode);
        setTransitionKey(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [theme.mode, currentMode]);

  const renderBackground = () => {
    const isDark = currentMode === 'dark';
    
    return (
      <div 
        key={`bg-${transitionKey}-${currentMode}`}
        className="fixed inset-0 z-[-1] transition-opacity duration-500"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        <WebGLErrorBoundary
          fallback={
            <div 
              className="absolute inset-0"
              style={{ background: isDark ? '#000000' : 'linear-gradient(180deg, #87CEEB 0%, #E0F7FA 100%)' }}
            />
          }
        >
          {isDark ? (
            <SpaceBackground key={`space-${transitionKey}`} />
          ) : (
            <NatureEnvironment key={`nature-${transitionKey}`} active={true} />
          )}
        </WebGLErrorBoundary>
      </div>
    );
  };

  return (
    <>
      <FadeLoader isLoading={isTransitioning} />
      {renderBackground()}
    </>
  );
}

export default BackgroundManager;