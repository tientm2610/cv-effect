import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header({ scrolled, onOpenCV }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = ['About', 'Experience', 'Projects',  'Skills', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="text-xl font-bold tracking-tight cursor-pointer"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-accent">Tien</span>tm<span className="text-accent">.</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium transition-colors relative group cursor-hover"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span style={{ color: 'var(--text-secondary)' }} className="hover:text-accent transition-colors">{item}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full" style={{ background: 'var(--accent-primary)' }} />
              </button>
            ))}
            <motion.button
              onClick={onOpenCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg font-semibold text-sm transition-all shadow-glow cursor-hover"
              style={{ background: 'var(--accent-primary)', color: 'var(--bg-main)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              View CV
            </motion.button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 cursor-hover"
            style={{ color: 'var(--text-secondary)' }}
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'currentColor' }} />
              <span className={`block w-6 h-0.5 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} style={{ background: 'currentColor' }} />
              <span className={`block w-6 h-0.5 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'currentColor' }} />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-nav border-t border-white/5"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left py-2 cursor-hover"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={onOpenCV}
                  className="flex items-center gap-2 rounded-lg font-semibold text-sm cursor-hover"
                  style={{ background: 'var(--accent-primary)', color: 'var(--bg-main)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  View Full CV
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}