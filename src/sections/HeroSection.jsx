import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { contentData } from '../data/portfolioData';

function SplitText({ text, className = "" }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span 
            className="inline-block gsap-split-word"
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export function HeroSection({ onOpenCV }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || !titleRef.current) return;

    const words = titleRef.current.querySelectorAll('.gsap-split-word');
    
    gsap.fromTo(words, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.3
      }
    );

    gsap.fromTo('.gsap-hero-content',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: "power3.out" }
    );

  }, [mounted]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)' }} />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto relative z-10 text-center"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}} className="mb-6">
          <span 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium tracking-wide"
            style={{ borderColor: 'var(--accent-glow)', background: 'var(--accent-glow)', color: 'var(--accent-primary)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            {contentData.hero.badge}
          </span>
        </motion.div>
        
        <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
          <SplitText text={contentData.hero.title} />
          <br />
            <SplitText text={contentData.hero.subtitle} />

        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="gsap-hero-content text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {contentData.hero.description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="gsap-hero-content flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={onOpenCV}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all shadow-glow cursor-hover"
            style={{ background: 'var(--accent-primary)', color: 'var(--bg-main)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            View My Full CV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium border transition-all cursor-hover"
            style={{ 
              borderColor: 'var(--border-light)', 
              color: 'var(--text-secondary)',
              background: 'transparent'
            }}
          >
            Explore My Work
          </motion.button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="gsap-hero-content grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {contentData.hero.stats.map((stat) => (
            <div key={stat.label} className="glass-card p-4 rounded-xl">
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}