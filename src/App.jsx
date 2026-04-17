import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Mail, 
  Phone, 
  Eye, 
  ExternalLink,
  ChevronDown,
  Code2,
  Database,
  Layout,
  Server,
  Settings,
  GitBranch,
  Layers,
  Zap,
  GraduationCap,
  MapPin
} from 'lucide-react';
import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import CVPDF from './assets/TranManhTien_CV.pdf';

gsap.registerPlugin(ScrollTrigger);

function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  useEffect(() => {
    const unsubscribeX = cursorX.on('change', (v) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${v}px, ${cursorY.get()}px)`;
    });
    const unsubscribeY = cursorY.on('change', (v) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${cursorX.get()}px, ${v}px)`;
    });

    const unsubscribeSpringX = mouseX.on('change', (v) => cursorX.set(v - 20));
    const unsubscribeSpringY = mouseY.on('change', (v) => cursorY.set(v - 20));

    return () => {
      unsubscribeX();
      unsubscribeY();
      unsubscribeSpringX();
      unsubscribeSpringY();
    };
  }, [cursorX, cursorY, mouseX, mouseY]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover');
      
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  if (typeof window === 'undefined' || !isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          willChange: 'transform',
          background: isHovering ? 'transparent' : 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.5)',
          backdropFilter: 'blur(2px)',
          transform: 'translate(-20px, -20px)',
          transition: 'width 0.3s, height 0.3s, background 0.3s',
          width: isHovering ? '60px' : '20px',
          height: isHovering ? '60px' : '20px',
          opacity: isVisible ? 1 : 0
        }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          willChange: 'transform',
          transform: `translate(${mouseX.get() - 4}px, ${mouseY.get() - 4}px)`
        }}
      />
    </>
  );
}

const Github = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

function Particles() {
  return (
    <Sparkles
      count={200}
      scale={12}
      size={4}
      speed={0.5}
      color="#A78BFA"
      opacity={0.8}
    />
  )
}

function GradientBlobs() {
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
        delay
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
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[150px] will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)' }}
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-[120px] will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)' }}
      />
      <div
        ref={blob3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)' }}
      />
    </div>
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
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)' }}
      />
    </div>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#A78BFA" />
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

const backgroundEffect = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0A0A0F"]} />
      <fog attach="fog" args={["#0A0A0F", 5, 20]} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

const contentData = {
  hero: {
    badge: "Fullstack Developer",
    title: "Engineering Scalable",
    subtitle: "Solutions for Leading Enterprises.",
    description: "Specializing in ReactJS Expert-level architecture & Java Spring Boot backends for enterprise-level applications.",
    stats: [
      { label: 'Years Exp.', value: '2+' },
      { label: 'Enterprises', value: '4+' },
      { label: 'Systems', value: '2+' },
      { label: 'GPA', value: '3.13' }
    ]
  },
  about: {
    title: "About Me",
    paragraphs: [
      "I'm a Fullstack Developer with 2+ years of experience building enterprise-level applications for Banking, Education, and Corporate sectors.",
      "My technical philosophy focuses on clean code, system-wide perspective, and high-performance server-side solutions.",
      "Currently seeking opportunities to architect scalable solutions for leading enterprises."
    ],
    info: [
      { icon: GraduationCap, label: "Gia Dinh University", sublabel: "GPA: 3.13" },
      { icon: MapPin, label: "Ho Chi Minh City, Vietnam", sublabel: "Available for relocation" },
      { icon: Mail, label: "t.manh.tien2610@gmail.com", sublabel: "0785174058" }
    ]
  },
  experience: {
    title: "Professional Experience",
    subtitle: "Building enterprise solutions for leading organizations in Vietnam",
    jobs: [
      {
        company: "I TECHCO - VIETNAM",
        role: "Frontend Developer",
        period: "Aug 2024 - Feb 2026",
        points: [
          "Starting as a Frontend Developer I continuously learned and sharpened my technical skills, eventually taking on team lead responsibilities in company projects.",
          "Designed and developed administrative dashboards featuring complex charts and reporting systems.",
          "Optimized performance with Code Splitting & Lazy Loading for 40% faster load times.",
          "Acted as a bridge between UI/UX and Backend teams to ensure seamless API integration and optimized data flow for production-grade applications."
        ],
        clients: ["ABBANK", "VUS", "HOASEN GROUP", "Dai-ichi Life"]
      },
      {
        company: "Currently seeking for new opportunities and more challenges.",
        role: "Fullstack Developer",
        period: "???",
        points: []
      }
    ]
  },
  projects: [
    {
      title: 'Learning Management System',
      subtitle: 'Role: Frontend Developer',
      description: 'Comprehensive e-learning platform with dynamic course engine, anti-cheating mechanisms, and SCORM support for enterprise education.',
      fe: ['ReactJS', 'JavaScript', 'Redux Toolkit', 'Ant Design', 'Axios'],
      be: ['PHP (Laravel)', 'SQL Server', 'RESTful APIs'],
      gradient: 'from-cyan-500 to-blue-600',
      accent: 'cyan'
    },
    {
      title: 'Mentor & Coaching System',
      subtitle: 'Role: Fullstack Developer',
      description: 'Fullstack ownership platform with OAuth2/RBAC security and intelligent mentor-student matching logic for career development.',
      fe: ['ReactJS', 'JavaScript', 'Redux Toolkit', 'Ant Design', 'Axios'],
      be: ['Java', 'Spring Boot', 'Spring Security (OAuth2)', 'RESTful APIs', 'DTOs Pattern', 'MySQL'],
      gradient: 'from-purple-500 to-pink-600',
      accent: 'purple'
    }
  ],
  skills: {
    frontend: ['ReactJS', 'HTML', 'CSS', 'JavaScript (ES6+)', 'Redux Toolkit', 'Ant Design', 'Bootstrap'],
    backend: ['RESTful API', 'Servlet & JSP', 'Java Core', 'Spring Framework', 'Spring Security', 'Spring Data JPA', 'JWT Authentication', 'ExpressJS'],
    tools: ['Git', 'Postman', 'Figma', 'Webpack', 'Maven']
  },
  socialLinks: [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/manh-tien-tran-462956292/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/tientm2610', label: 'GitHub' },
    { icon: Mail, href: 'mailto:t.manh.tien2610@gmail.com', label: 'Email' }
  ]
};

function SplitText({ text, className = "", delay = 0 }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          {/* <span 
            className="inline-block gsap-split-word"
            style={{ 
              display: 'inline-block',
              willChange: 'transform, opacity'
            }}
          >
          </span> */}
            {word}

        </span>
      ))}
    </span>
  );
}

function HeroSection({ onOpenCV }) {
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto relative z-10 text-center"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm font-medium tracking-wide">
            <Zap size={14} />
            {contentData.hero.badge}
          </span>
        </motion.div>
        
        <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
          <SplitText text={contentData.hero.title} />
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500">
            <SplitText text={contentData.hero.subtitle} />
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="gsap-hero-content text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
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
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-dark px-8 py-3.5 rounded-xl font-bold transition-all shadow-glow"
          >
            <Eye size={20} />
            View My Full CV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium border border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-all"
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
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16"
        >
          <ChevronDown className="mx-auto text-gray-500" size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
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
      <div className="absolute inset-0 bg-charcoal/30" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div ref={contentRef} className="max-w-4xl mx-auto relative z-10 w-full">
        <div className="text-center mb-12">
          <h2 className="text-8xl sm:text-9xl font-black text-white/5 tracking-tighter uppercase leading-none">
            About
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-[-1rem]">{contentData.about.title}</h2>
        </div>

        <div className="glass-card p-8 sm:p-12 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-gray-300">
              {contentData.about.paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <div className="space-y-6">
              {contentData.about.info.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <item.icon className="text-cyan-400" size={22} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          <stop offset="0%" stopColor="rgba(6,182,212,0.5)" />
          <stop offset="50%" stopColor="rgba(168,85,247,0.5)" />
          <stop offset="100%" stopColor="rgba(6,182,212,0.3)" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d="M 0 0 L 0 1000"
        stroke="url(#timelineGradient)"
        strokeWidth="2"
        fill="none"
        className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
      />
    </svg>
  );
}

function ExperienceSection() {
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
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <AnimatedBlobSection />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-8xl sm:text-9xl font-black text-white/5 tracking-tighter uppercase leading-none">
            Experience
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-[-1rem]">{contentData.experience.title}</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">{contentData.experience.subtitle}</p>
        </div>

        <div ref={timelineRef} className="relative">
          <TimelineConnector />

          {contentData.experience.jobs.map((job, index) => (
            <div 
              key={index} 
              className={`job-item relative mb-16 ${index === 1 ? 'md:ml-auto md:w-1/2' : 'md:mr-auto md:w-1/2'}`}
            >
              <div className="md:absolute md:top-0 hidden md:block" style={{ [index === 0 ? 'right' : 'left']: 'calc(50% + 2rem)' }}>
                <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-glow ring-4 ring-dark" />
              </div>
              
              <div className={`glass-card p-6 sm:p-8 rounded-2xl ${index === 1 ? '' : 'md:mr-8'}`}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{job.company}</h3>
                    <p className="text-cyan-400 font-medium">{job.role}</p>
                  </div>
                  <span className="text-gray-500 text-sm bg-dark/50 px-3 py-1 rounded-full border border-white/10 self-start">
                    {job.period}
                  </span>
                </div>
                
                {job.points.length > 0 && (
                  <ul className="space-y-3 text-gray-400 mb-4">
                    {job.points.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {job.clients && job.clients.length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-gray-500 mb-2">Key Clients:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.clients.map((client) => (
                        <span key={client} className="text-xs font-medium px-3 py-1 bg-dark rounded-full border border-white/10 text-gray-300">
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05)_0%,transparent_70%)" />
      <AnimatedBlobSection />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-7xl sm:text-8xl font-black text-white/[0.08] tracking-tighter uppercase leading-none">
            Projects
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-[-0.5rem]">Projects Showcase</h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4">
            Enterprise-grade applications built with modern technologies and best practices
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {contentData.projects.map((project, index) => (
            <TiltCard key={project.title} className="project-card group">
              <div className="project-card-glass rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:shadow-glow">
                <div className="project-image-wrapper h-56 overflow-hidden relative">
                  <div className={`project-image absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-1">{project.subtitle}</p>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    </div>
                  </div>
                  <ExternalLink className="absolute top-6 right-6 text-white/60 group-hover:text-white transition-colors" size={24} />
                </div>
                
                <div className="p-6 sm:p-8">
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <h4 className="text-lg font-bold text-white mb-3">Tech stack</h4>
                  <div className="mb-4">
                    <p className="text-cyan-400 text-sm mb-2">Frontend</p>
                    <div className="flex flex-wrap gap-2">
                      {project.fe.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs font-mono px-3 py-1.5 bg-dark rounded-lg border border-white/10 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-cyan-400 text-sm mb-2">Backend</p>
                    <div className="flex flex-wrap gap-2">
                      {project.be.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs font-mono px-3 py-1.5 bg-dark rounded-lg border border-white/10 text-gray-300"
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

function SkillsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const categories = [
      { title: 'Frontend', icon: Layout, skills: contentData.skills.frontend },
      { title: 'Backend', icon: Server, skills: contentData.skills.backend },
      { title: 'Tools & Others', icon: Settings, skills: contentData.skills.tools }
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
    { title: 'Frontend', icon: Layout, skills: contentData.skills.frontend, color: 'cyan' },
    { title: 'Backend', icon: Server, skills: contentData.skills.backend, color: 'orange' },
    { title: 'Tools & Others', icon: Settings, skills: contentData.skills.tools, color: 'purple' }
  ];

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-7xl sm:text-8xl font-black text-white/[0.08] tracking-tighter uppercase">
            Skills
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-[-0.5rem]">Technical Skill Vault</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="skill-card glass-card p-6 rounded-2xl hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-${category.color}-500/20 flex items-center justify-center`}>
                  <category.icon className={`text-${category.color}-400`} size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="text-sm px-3 py-1.5 bg-dark/50 rounded-lg border border-white/10 text-gray-300 hover:border-white/20 transition-colors"
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

function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(sectionRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen py-24 px-4 relative flex items-center justify-center">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-40 bg-cyan-500/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Let's Connect</h2>
        <p className="text-gray-400 mb-10">
          Open to new opportunities and collaborations
        </p>
        
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {contentData.socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 glass-card rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
              title={social.label}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500">
          <a href="mailto:t.manh.tien2610@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
            <Mail size={18} />
            t.manh.tien2610@gmail.com
          </a>
          <a href="tel:0785174058" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
            <Phone size={18} />
            0785174058
          </a>
        </div>
      </div>
    </section>
  );
}

function Navbar({ scrolled, onOpenCV }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-nav bg-dark/80 backdrop-blur-lg border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="text-xl font-bold tracking-tight text-white cursor-pointer"
            onClick={() => window.scrollTo({top: 0,behavior: 'smooth'})}
          >
            <span className="text-cyan-400">Tien</span>tm<span className="text-cyan-400">.</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
              </button>
            ))}
            <motion.button
              onClick={onOpenCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-dark px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-glow"
            >
              <Eye size={16} />
              View CV
            </motion.button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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
                {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left text-gray-300 hover:text-cyan-400 py-2"
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={onOpenCV}
                  className="flex items-center gap-2 bg-cyan-500 text-dark px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <Eye size={16} />
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
    <div className="min-h-screen bg-dark text-gray-200 font-sans selection:bg-cyan-500/30">
      {!isMobile && <CustomCursor />}
      <div className="fixed inset-0 pointer-events-none z-0">
        {backgroundEffect()}
      </div>

      <Navbar scrolled={scrolled} onOpenCV={openCV} />

      <HeroSection onOpenCV={openCV} />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />

      <footer className="py-8 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Tran Manh Tien. Built with React, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showCV && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeCV}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl h-[90vh] bg-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-charcoal/80">
                <h3 className="text-lg font-bold text-white">Tran Manh Tien - CV</h3>
                <div className="flex items-center gap-3">
                  <a
                    href={CVPDF}
                    download="TranManhTien_CV.pdf"
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Download
                  </a>
                  <button
                    onClick={closeCV}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[calc(100%-65px)]">
                <iframe
                  src={`${CVPDF}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full"
                  title="CV Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;