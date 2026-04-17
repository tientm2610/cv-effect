import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

function Starfield({ active }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let stars = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          speed: Math.random() * 0.02 + 0.005,
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.opacity += Math.sin(Date.now() * star.speed) * 0.01;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.8})`;
        ctx.fill();
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    resize();
    createStars();
    animate();
    
    window.addEventListener('resize', () => {
      resize();
      createStars();
    });
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [active]);
  
  if (!active) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ willChange: 'opacity' }}
    />
  );
}
function Particles() {
  return (
    <Sparkles
      count={200}
      scale={12}
      size={4}
      speed={0.5}
      color="var(--accent-primary)"
      opacity={0.8}
    />
  )
}
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="var(--accent-primary)" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7C3AED" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#FFFFFF"
      />
      <Particles />
    </>
  )
}
function NatureBackground({ active }) {
  const cloudsRef = useRef(null);
  const leavesRef = useRef(null);
  
  useGSAP(() => {
    if (!active || !cloudsRef.current) return;
    
    const clouds = cloudsRef.current.querySelectorAll('.cloud');
    clouds.forEach((cloud, i) => {
      gsap.to(cloud, {
        x: '+=200',
        duration: 15 + Math.random() * 10,
        repeat: -1,
        ease: 'none',
        delay: i * 5,
      });
    });
    
    const leaves = leavesRef.current?.querySelectorAll('.leaf');
    if (leaves) {
      leaves.forEach((leaf, i) => {
        gsap.to(leaf, {
          x: '+=400',
          y: 100,
          rotation: 360,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          ease: 'power1.inOut',
          delay: i * 2,
        });
      });
    }
  }, [active]);
  
  if (!active) return null;
  
  return (
    <div ref={cloudsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="cloud absolute bg-white/30 rounded-full"
          style={{
            width: 100 + i * 50,
            height: 40 + i * 20,
            top: `${10 + i * 25}%`,
            left: `${-20 + i * 30}%`,
            filter: 'blur(20px)',
          }}
        />
      ))}
      <div ref={leavesRef} className="absolute inset-0">
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="leaf absolute w-3 h-3 bg-green-500/40 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${i * 20}%`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function WeatherOverlay({ weather, mode }) {
  const overlayRef = useRef(null);
  
  useGSAP(() => {
    if (!overlayRef.current || weather === 'clear') return;
    
    const drops = overlayRef.current.querySelectorAll('.raindrop');
    drops.forEach((drop, i) => {
      gsap.to(drop, {
        y: '+=100vh',
        duration: 0.8 + Math.random() * 0.4,
        repeat: -1,
        ease: 'none',
        delay: i * 0.1,
      });
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
          <div className="raindrop absolute w-0.5 h-4 bg-cyan-300/50 top-0" style={{ left: '10%' }} />
          <div className="raindrop absolute w-0.5 h-4 bg-cyan-300/50 top-0" style={{ left: '30%' }} />
          <div className="raindrop absolute w-0.5 h-4 bg-cyan-300/50 top-0" style={{ left: '50%' }} />
          <div className="raindrop absolute w-0.5 h-4 bg-cyan-300/50 top-0" style={{ left: '70%' }} />
          <div className="raindrop absolute w-0.5 h-4 bg-cyan-300/50 top-0" style={{ left: '90%' }} />
        </>
      )}
      {weather === 'cloudy' && (
        <div className="absolute inset-0 bg-gray-500/20" />
      )}
    </div>
  );
}

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

export function ThemeEngine() {
  const { theme } = useTheme();
  const isDark = theme.mode === 'dark';
  const hasWeather = theme.weather !== 'clear';
  
  return (
    <>
      <div 
        className="fixed inset-0 z-[-1] transition-colors duration-700"
        style={{ 
          background: isDark ? 'var(--bg-main)' : 'var(--bg-main)',
        }}
      >
        {isDark ? (
          <>
            <AnimatedGradientBlob />
            <Starfield active={isDark} />
          </>
        ) : (
          <NatureBackground active={!isDark} />
        )}
      </div>
      <WeatherOverlay weather={theme.weather} mode={theme.mode} />
      <>
      {
        isDark ? 
              <div className="fixed inset-0 pointer-events-none z-0" style={{ background: '#0A0A0F' }}>
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
            >
              <color attach="background" args={['#0A0A0F']} />
              <fog attach="fog" args={['#0A0A0F', 5, 20]} />
              <Scene />
            </Canvas>
          </div>
          :
              <div className="fixed inset-0 pointer-events-none z-0" style={{ background: '#f8f8ff' }}>
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
            >
              <color attach="background" args={['#ffffff']} />
              <fog attach="fog" args={['#ffe589', 5, 20]} />
              <Scene />
            </Canvas>
          </div>
      }
      </>

    </>
  );
}