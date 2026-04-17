import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { contentData } from '../data/portfolioData';

function TimelineConnector() {
  const pathRef = useRef(null);

  useGSAP(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        end: "bottom 80%",
        scrub: 1
      }
    });
  }, []);

  return (
    <svg className="absolute left-1/2 top-0 bottom-0 w-1 hidden md:block pointer-events-none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="var(--accent-secondary)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d="M 0 0 L 0 1000"
        stroke="url(#timelineGradient)"
        strokeWidth="2"
        fill="none"
        style={{ filter: 'drop-shadow(0 0 8px var(--accent-glow))' }}
      />
    </svg>
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

export function ExperienceSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current) return;

    gsap.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
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

    const jobs = timelineRef.current.querySelectorAll('.job-item');
    jobs.forEach((job, i) => {
      gsap.fromTo(job,
        { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: job,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  return (
    <section id="experience" ref={sectionRef} className="min-h-screen py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'var(--accent-glow)' }} />
      <AnimatedBlobSection />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-8xl sm:text-9xl font-black tracking-tighter uppercase leading-none" style={{ color: 'var(--text-primary)', opacity: 0.05 }}>
            Experience
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)', marginTop: '-1rem' }}>{contentData.experience.title}</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }} className="max-w-xl mx-auto">{contentData.experience.subtitle}</p>
        </div>

        <div ref={timelineRef} className="relative">
          <TimelineConnector />

          {contentData.experience.jobs.map((job, index) => (
            <div 
              key={index} 
              className={`job-item relative mb-16 ${index === 1 ? 'md:ml-auto md:w-1/2' : 'md:mr-auto md:w-1/2'}`}
            >
              <div className="md:absolute md:top-0 hidden md:block" style={{ [index === 0 ? 'right' : 'left']: 'calc(50% + 2rem)' }}>
                <div className="w-4 h-4 rounded-full shadow-glow ring-4 ring-dark" style={{ background: 'var(--accent-primary)' }} />
              </div>
              
              <div className={`glass-card p-6 sm:p-8 rounded-2xl ${index === 1 ? '' : 'md:mr-8'}`}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{job.company}</h3>
                    <p className="font-medium" style={{ color: 'var(--accent-primary)' }}>{job.role}</p>
                  </div>
                  <span 
                    className="text-sm px-3 py-1 rounded-full border self-start" 
                    style={{ 
                      background: 'var(--bg-surface)', 
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {job.period}
                  </span>
                </div>
                
                {job.points.length > 0 && (
                  <ul className="space-y-3 mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {job.points.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-1 flex-shrink-0" style={{ color: 'var(--accent-primary)' }}>▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {job.clients && job.clients.length > 0 && (
                  <div className="pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Key Clients:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.clients.map((client) => (
                        <span 
                          key={client} 
                          className="text-xs font-medium px-3 py-1 rounded-full border"
                          style={{ 
                            background: 'var(--bg-surface)', 
                            borderColor: 'var(--border-subtle)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}