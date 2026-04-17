import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './context/ThemeContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Header } from './components/Header';
import { MagneticCursor } from './components/MagneticCursor';
import SettingsPanel from './components/SettingsPanel';
import CVCModal from './components/CVCModal';
import BackgroundManager from './components/BackgroundManager';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { ContactSection } from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  return (
    <footer className="py-8 border-t relative overflow-hidden" style={{ borderColor: 'var(--border-subtle)' }}>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

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
        >
          <BackgroundManager />
          
          {!isMobile && <MagneticCursor />}
          
          <SettingsPanel />
          
          <Header 
            scrolled={scrolled} 
            onOpenCV={openCV} 
            scrollToSection={scrollToSection} 
            mobileMenuOpen={mobileMenuOpen} 
            setMobileMenuOpen={setMobileMenuOpen}
          />

          <main>
            <HeroSection 
              onOpenCV={openCV}
              scrollToSection={scrollToSection} 
              mobileMenuOpen={mobileMenuOpen} 
              setMobileMenuOpen={setMobileMenuOpen}
            />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </main>

          <Footer />

          <CVCModal show={showCV} onClose={closeCV} />
          
          {!isMobile && <MagneticCursor />}
        </div>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}

export default App;