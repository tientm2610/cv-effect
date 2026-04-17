import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { contentData } from '../data/portfolioData';

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform({ rotateX, rotateY, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function AnimatedBlobSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const blob = sectionRef.current.querySelector('.section-blob');
    gsap.fromTo(blob,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 0.4,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="section-blob-container relative">
      <div
        className="section-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none transition-colors duration-1000"
        style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }}
      />
    </div>
  );
}

function ProjectsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current || !headerRef.current) return;

    gsap.fromTo(headerRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    const projects = sectionRef.current.querySelectorAll('.project-card');
    projects.forEach((project, i) => {
      const imageWrapper = project.querySelector('.project-image-wrapper');
      const image = project.querySelector('.project-image');
      
      if (imageWrapper && image) {
        gsap.fromTo(image,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      gsap.fromTo(project,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen py-24 px-4 relative">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, var(--accent-glow) 0%, transparent 70%)' }} />
      <AnimatedBlobSection />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-7xl sm:text-8xl font-black tracking-tighter uppercase leading-none" style={{ color: 'var(--text-primary)', opacity: 0.08 }}>
            Projects
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)', marginTop: '-0.5rem' }}>Projects Showcase</h2>
          <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto mt-4">
            Enterprise-grade applications built with modern technologies and best practices
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {contentData.projects.map((project) => (
            <TiltCard key={project.title} className="project-card group">
              <div className="project-card-glass rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:shadow-glow">
                <div className="project-image-wrapper h-56 overflow-hidden relative">
                  <div className={`project-image absolute inset-0 ${project.gradient}`} style={{ background: project.gradient }} />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>{project.subtitle}</p>
                      <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute top-6 right-6 transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
                
                <div className="p-6 sm:p-8">
                  <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  
                  <h4 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Tech stack</h4>
                  <div className="mb-4">
                    <p className="text-sm mb-2" style={{ color: 'var(--accent-primary)' }}>Frontend</p>
                    <div className="flex flex-wrap gap-2">
                      {project.fe.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs font-mono px-3 py-1.5 rounded-lg border"
                          style={{ 
                            background: 'var(--bg-surface)', 
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm mb-2" style={{ color: 'var(--accent-primary)' }}>Backend</p>
                    <div className="flex flex-wrap gap-2">
                      {project.be.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs font-mono px-3 py-1.5 rounded-lg border"
                          style={{ 
                            background: 'var(--bg-surface)', 
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ProjectsSection };