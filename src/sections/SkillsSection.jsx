import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { contentData } from '../data/portfolioData';

const icons = {
  Layout: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
    </svg>
  ),
  Server: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  )
};

function SkillsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const categories = [
      { title: 'Frontend', icon: icons.Layout, skills: contentData.skills.frontend },
      { title: 'Backend', icon: icons.Server, skills: contentData.skills.backend },
      { title: 'Tools & Others', icon: icons.Settings, skills: contentData.skills.tools }
    ];

    categories.forEach((_, i) => {
      const card = sectionRef.current.querySelectorAll('.skill-card')[i];
      if (card) {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

  }, []);

  const categories = [
    { title: 'Frontend', icon: icons.Layout, skills: contentData.skills.frontend },
    { title: 'Backend', icon: icons.Server, skills: contentData.skills.backend },
    { title: 'Tools & Others', icon: icons.Settings, skills: contentData.skills.tools }
  ];

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-7xl sm:text-8xl font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)', opacity: 0.08 }}>
            Skills
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)', marginTop: '-0.5rem' }}>Technical Skill Vault</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="skill-card glass-card p-6 rounded-2xl transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-glow)' }}>
                  <category.icon style={{ color: 'var(--accent-primary)' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="text-sm px-3 py-1.5 rounded-lg border transition-colors"
                    style={{ 
                      background: 'var(--bg-surface)', 
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { SkillsSection };