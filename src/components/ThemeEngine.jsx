import React, { useRef, Suspense } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import SpaceBackground from './SpaceBackground';
import NatureEnvironment from './NatureEnvironment';

function AnimatedGradientBlob() {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  
  useGSAP(() => {
    const moveBlob = (blob, delay) => {
      gsap.to(blob, {
        x: 'random(-100, 100, 20)',
        y: 'random(-50, 50, 20)',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      });
    };
    
    if (blob1Ref.current) moveBlob(blob1Ref.current, 0);
    if (blob2Ref.current) moveBlob(blob2Ref.current, 2);
    if (blob3Ref.current) moveBlob(blob3Ref.current, 4);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        ref={blob1Ref}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, var(--gradient-start) 0%, transparent 70%)',
          opacity: 0.3,
          filter: 'blur(150px)',
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, var(--gradient-end) 0%, transparent 70%)',
          opacity: 0.25,
          filter: 'blur(120px)',
        }}
      />
      <div
        ref={blob3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full will-change-transform"
        style={{ 
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          opacity: 0.2,
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
}

function WeatherOverlay({ weather, mode }) {
  const overlayRef = useRef(null);
  
  useGSAP(() => {
    if (!overlayRef.current || weather === 'clear') return;
    
    const drops = overlayRef.current.querySelectorAll('.raindrop');
    drops.forEach((drop, i) => {
      gsap.fromTo(drop, 
        { y: 0, opacity: 1 },
        { 
          y: '100vh', 
          opacity: 0,
          duration: 0.8 + Math.random() * 0.4,
          repeat: -1,
          ease: 'none',
          delay: i * 0.1,
        }
      );
    });
  }, [weather]);

  if (weather === 'clear' || mode === 'light') return null;
  
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
      style={{ opacity: weather === 'rainy' ? 0.3 : 0.15 }}
    >
      {weather === 'rainy' && (
        <>
          <div className="raindrop absolute w-0.5 h-4 top-0" style={{ left: '10%', background: 'var(--accent-primary)', opacity: 0.5 }} />
          <div className="raindrop absolute w-0.5 h-4 top-0" style={{ left: '30%', background: 'var(--accent-primary)', opacity: 0.5 }} />
          <div className="raindrop absolute w-0.5 h-4 top-0" style={{ left: '50%', background: 'var(--accent-primary)', opacity: 0.5 }} />
          <div className="raindrop absolute w-0.5 h-4 top-0" style={{ left: '70%', background: 'var(--accent-primary)', opacity: 0.5 }} />
          <div className="raindrop absolute w-0.5 h-4 top-0" style={{ left: '90%', background: 'var(--accent-primary)', opacity: 0.5 }} />
        </>
      )}
      {weather === 'cloudy' && (
        <div className="absolute inset-0 bg-gray-500/20" style={{ filter: 'blur(20px)' }} />
      )}
    </div>
  );
}

export function ThemeEngine() {
  const { theme } = useTheme();
  const [bgKey, setBgKey] = React.useState(0);
  const isDark = theme.mode === 'dark';
  
  React.useEffect(() => {
    setBgKey(prev => prev + 1);
  }, [theme.mode, theme.weather]);

  return (
    <>
      <div 
        key={`bg-${bgKey}`}
        className="fixed inset-0 z-[-1] transition-colors duration-700"
        style={{ 
          background: 'var(--bg-main)',
        }}
      >
        {isDark ? (
          <>
            <AnimatedGradientBlob />
            <WebGLErrorBoundary>
              <SpaceBackground key={`space-${bgKey}`} />
            </WebGLErrorBoundary>
          </>
        ) : (
          <NatureEnvironment key={`nature-${bgKey}`} active={true} />
        )}
      </div>
      <WeatherOverlay weather={theme.weather} mode={theme.mode} />
    </>
  );
}