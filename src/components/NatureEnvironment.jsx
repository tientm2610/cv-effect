import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function SunWithLensFlare() {
  const containerRef = useRef(null);
  const sunRef = useRef(null);
  const flareRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    if (!sunRef.current || !flareRef.current) return;

    gsap.to(sunRef.current, {
      scale: 1.1,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(flareRef.current, {
      opacity: 0.6,
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] pointer-events-none overflow-visible"
      style={{ willChange: 'transform' }}
    >
      {/* Sun glow layers */}
      <div 
        ref={sunRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, #FFD700 0%, #FFA500 40%, #FF6B00 70%, transparent 100%)',
          boxShadow: '0 0 60px #FFD700, 0 0 100px rgba(255,165,0,0.5), 0 0 150px rgba(255,215,0,0.3)',
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        }}
      />
      
      {/* Lens flare */}
      <div 
        ref={flareRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,200,0.5) 30%, transparent 70%)',
          mixBlendMode: 'screen',
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />

      {/* Subtle flare streaks */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-1"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 70%, transparent 100%)',
          transform: `rotate(-30deg) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,200,100,0.4) 30%, rgba(255,200,100,0.6) 50%, rgba(255,200,100,0.4) 70%, transparent 100%)',
          transform: `rotate(45deg) translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
        }}
      />
    </div>
  );
}

function CloudLayer({ layer }) {
  const cloudsRef = useRef(null);
  
  useGSAP(() => {
    if (!cloudsRef.current) return;
    
    const clouds = cloudsRef.current.querySelectorAll('.cloud-item');
    clouds.forEach((cloud, i) => {
      const duration = 20 + layer * 10 + i * 5;
      const startX = -200 + i * 400;
      
      gsap.fromTo(cloud, 
        { x: startX },
        { 
          x: startX + 600,
          duration: duration,
          repeat: -1,
          ease: 'none',
          delay: i * 3,
        }
      );
    });
  }, [layer]);

  const cloudShapes = [
    { width: 150, height: 50, top: '10%', opacity: 0.4 },
    { width: 200, height: 60, top: '25%', opacity: 0.6 },
    { width: 120, height: 40, top: '40%', opacity: 0.35 },
    { width: 180, height: 55, top: '60%', opacity: 0.5 },
  ];

  return (
    <div ref={cloudsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          className="cloud-item absolute bg-white rounded-full"
          style={{
            width: cloudShapes[i].width,
            height: cloudShapes[i].height,
            top: cloudShapes[i].top,
            left: `${i * 25}%`,
            opacity: cloudShapes[i].opacity,
            filter: 'blur(8px)',
          }}
        />
      ))}
    </div>
  );
}

function FallingLeaves() {
  const leavesRef = useRef(null);
  const [leaves] = useState(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 8 + Math.random() * 6,
      rotation: Math.random() * 360,
    }))
  );

  useGSAP(() => {
    if (!leavesRef.current) return;
    
    const leafElements = leavesRef.current.querySelectorAll('.leaf-particle');
    leafElements.forEach((leaf, i) => {
      gsap.fromTo(leaf, 
        { y: -20, x: 0, rotation: 0 },
        { 
          y: '100vh',
          x: 'random(-50, 50)',
          rotation: 360,
          duration: leaves[i].duration,
          repeat: -1,
          ease: 'none',
          delay: leaves[i].delay,
        }
      );
    });
  }, []);

  return (
    <div ref={leavesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="leaf-particle absolute"
          style={{
            left: `${leaf.left}%`,
            width: leaf.size,
            height: leaf.size,
            borderRadius: '0 50% 0 50%',
            background: 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)',
            opacity: 0.7,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
}

function HeatHazeText() {
  const textRef = useRef(null);

  useGSAP(() => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      filter: 'url(#heatHaze)',
      duration: 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="heatHaze">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>
    </svg>
  );
}

function SkyGradient() {
  return (
    <div 
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 40%, #E0F7FA 70%, #F0FFFF 100%)',
      }}
    />
  );
}

export function NatureEnvironment({ active }) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <SkyGradient />
      
      {/* Multi-layer clouds */}
      <CloudLayer layer={1} />
      <CloudLayer layer={2} />
      <CloudLayer layer={3} />
      
      {/* Sun and lens flare */}
      <SunWithLensFlare />
      
      {/* Falling leaves */}
      <FallingLeaves />
      
      {/* Heat haze filter */}
      <HeatHazeText />
    </div>
  );
}

export default NatureEnvironment;