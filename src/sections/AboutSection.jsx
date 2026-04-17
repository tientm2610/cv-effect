import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { contentData } from '../data/portfolioData';

const icons = {
  GraduationCap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 6 3 9 0v-5"/>
    </svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  )
};

export function AboutSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(contentRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center justify-center py-24 px-4 relative">
      <div className="absolute inset-0" style={{ background: 'var(--bg-surface)', opacity: 0.3 }} />
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: 'var(--accent-glow)' }} />
      
      <div ref={contentRef} className="max-w-4xl mx-auto relative z-10 w-full">
        <div className="text-center mb-12">
          <h2 className="text-8xl sm:text-9xl font-black tracking-tighter uppercase leading-none" style={{ color: 'var(--text-primary)', opacity: 0.05 }}>
            About
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)', marginTop: '-1rem' }}>{contentData.about.title}</h2>
        </div>

        <div className="glass-card p-8 sm:p-12 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6" style={{ color: 'var(--text-secondary)' }}>
              {contentData.about.paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <div className="space-y-6">
              {contentData.about.info.map((item, i) => {
                const IconComponent = icons[item.icon];
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-glow)' }}>
                      <IconComponent style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.sublabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}