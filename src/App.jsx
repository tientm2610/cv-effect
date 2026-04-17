import React, { useState, useEffect, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './context/ThemeContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Header } from './components/Header';
import { MagneticCursor } from './components/MagneticCursor';
import SettingsPanel from './components/SettingsPanel';
import CVCModal from './components/CVCModal';
import { ThemeEngine } from './components/ThemeEngine';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { ContactSection } from './sections/ContactSection';
import { Sparkles } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

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

function BackgroundEffect() {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
}

import { Canvas } from '@react-three/fiber';

function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 relative overflow-hidden" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Tran Manh Tien. Built with React, Tailwind CSS & Framer Motion.
        </p>
      </div>
    </footer>
  );
}

function SmoothScrollProvider({ children }) {
  useSmoothScroll();
  return children;
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCV = () => setShowCV(true);
  const closeCV = () => setShowCV(false);

  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <div 
          className="min-h-screen font-sans"
          style={{ 
            background: 'var(--bg-main)',
            color: 'var(--text-primary)',
          }}
        >
          <ThemeEngine />
          
          {!isMobile && <MagneticCursor />}
          
          {/* <div className="fixed inset-0 pointer-events-none z-0" style={{ background: '#0A0A0F' }}>
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
            >
              <color attach="background" args={['#0A0A0F']} />
              <fog attach="fog" args={['#0A0A0F', 5, 20]} />
              <Scene />
            </Canvas>
          </div> */}

          {/* <div className="fixed inset-0 pointer-events-none z-0" style={{ background: '#f8f8ff' }}>
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
            >
              <color attach="background" args={['#ffffff']} />
              <fog attach="fog" args={['#ffe589', 5, 20]} />
              <Scene />
            </Canvas>
          </div> */}

          <SettingsPanel />
          
          <Header scrolled={scrolled} onOpenCV={openCV} />

          <main>
            <HeroSection onOpenCV={openCV} />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </main>

          <Footer />

          <CVCModal show={showCV} onClose={closeCV} />
        </div>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}

export default App;