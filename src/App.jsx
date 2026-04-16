import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FileCode,
  Layers,
  Zap,
  Shield,
  Terminal,
  Package,
  Cpu,
  HardDrive,
  Globe,
  Users,
  BookOpen,
  Award,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import CVPDF from './assets/TranManhTien_CV.pdf';

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

const Facebook = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const floatAnimation = {
  y: [-10, 10, -10],
  transition: {
    repeat: Infinity,
    duration: 3,
    ease: "easeInOut"
  }
};

const glowAnimation = {
  boxShadow: ['0 0 20px rgba(6,182,212,0.3)', '0 0 40px rgba(6,182,212,0.6)', '0 0 20px rgba(6,182,212,0.3)'],
  transition: {
    repeat: Infinity,
    duration: 2,
    ease: "easeInOut"
  }
};

const techIcons = [
  { icon: Code2, label: 'ReactJS', color: 'text-cyan-400' },
  { icon: Server, label: 'Java', color: 'text-orange-500' },
  { icon: Layers, label: 'Spring', color: 'text-green-500' },
  { icon: Database, label: 'MySQL', color: 'text-blue-500' }
];

const skills = {
  frontend: ['ReactJS', 'HTML', 'CSS', 'JavaScript (ES6+)', 'Redux Toolkit', 'Ant Design', 'Bootstrap'],
  backend: ['RESTful API', 'Servlet & JSP', 'Java Core', 'Spring Framework', 'Spring Security', 'Spring Data JPA', 'JWT Authentication' , 'ExpressJS'],
  tools: ['Git', 'Postman', 'Figma', 'Webpack', 'Maven',]
};

const projects = [
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
];

const clients = [
  { name: 'ABBANK', color: 'bg-green-500' },
  { name: 'VUS', color: 'bg-cyan-500' },
  { name: 'HOASEN GROUP', color: 'bg-amber-500' },
  { name: 'Dai-ichi Life', color: 'bg-blue-500' }
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/manh-tien-tran-462956292/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/tientm2610', label: 'GitHub' },
  { icon: Mail, href: 'mailto:t.manh.tien2610@gmail.com', label: 'Email' }
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCV = () => setShowCV(true);
  const closeCV = () => setShowCV(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-gray-200 font-sans selection:bg-cyan-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {backgroundEffect()}
      </div>

      {/* Sticky Navigation */}
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

            {/* Desktop Nav */}
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
                onClick={openCV}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-dark px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-glow"
              >
                <Eye size={16} />
                View CV
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
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
        </div>

        {/* Mobile Menu */}
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
                  onClick={openCV}
                  className="flex items-center gap-2 bg-cyan-500 text-dark px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  <Eye size={16} />
                  View Full CV
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {techIcons.map((tech, index) => (
            <motion.div
              key={tech.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
              className={`absolute ${[
                'left-[10%] top-[20%]',
                'right-[15%] top-[25%]',
                'left-[20%] bottom-[25%]',
                'right-[10%] bottom-[20%]'
              ][index]}`}
            >
              <tech.icon className={`${tech.color}`} size={48} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto relative z-10 text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm font-medium tracking-wide">
              <Zap size={14} />
              Fullstack Developer
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            Engineering Scalable
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500">
              Solutions for Leading Enterprises.
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Specializing in <span className="text-cyan-400 font-medium">ReactJS Expert-level architecture</span> & 
            <span className="text-cyan-400 font-medium"> Java Spring Boot backends</span> for enterprise-level applications.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.button
              onClick={openCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-dark px-8 py-3.5 rounded-xl font-bold transition-all shadow-glow"
            >
              <Eye size={20} />
              View My Full CV
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('experience')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium border border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              Explore My Work
            </motion.button>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {[
              { label: 'Years Exp.', value: '2+' },
              { label: 'Enterprises', value: '4+' },
              { label: 'Systems', value: '2+' },
              { label: 'GPA', value: '3.13' }
            ].map((stat, i) => (
              <div key={stat.label} className="glass-card p-4 rounded-xl">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-16"
          >
            <ChevronDown className="mx-auto text-gray-500" size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-charcoal/30 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-gray-400">
                <p>
                  I'm a <span className="text-white font-semibold">Fullstack Developer</span> with 2+ years of experience building enterprise-level applications for Banking, Education, and Corporate sectors.
                </p>
                <p>
                  My technical philosophy focuses on <span className="text-cyan-400">clean code</span>, <span className="text-cyan-400">system-wide perspective</span>, and <span className="text-cyan-400">high-performance server-side solutions</span>.
                </p>
                <p>
                  Currently seeking opportunities to architect scalable solutions for leading enterprises.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <GraduationCap className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-white font-medium">Gia Dinh University</p>
                    <p className="text-sm">GPA: 3.13</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-white font-medium">Ho Chi Minh City, Vietnam</p>
                    <p className="text-sm">Available for relocation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-white font-medium">t.manh.tien2610@gmail.com</p>
                    <p className="text-sm">0785174058</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 relative">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4 text-center text-white"
          >
            Professional Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-center mb-16 max-w-xl mx-auto"
          >
            Building enterprise solutions for leading organizations in Vietnam
          </motion.p>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

            {/* I Techco */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-10 sm:pl-0 mb-12"
            >
              <div className="sm:absolute sm:left-1/2 sm:-translate-x-2 sm:mt-3">
                <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-glow ring-4 ring-dark" />
              </div>
              <div className="glass-card p-6 sm:p-8 rounded-2xl sm:mr-8 hover:border-cyan-400/30 transition-colors group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      I TECHCO - VIETNAM
                    </h3>
                    <p className="text-cyan-400 font-medium">Frontend Developer</p>
                  </div>
                  <span className="text-gray-500 text-sm bg-dark/50 px-3 py-1 rounded-full border border-white/10 self-start">
                    Aug 2024 - Feb 2026
                  </span>
                </div>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                    <span>Starting as a <strong className="text-white">Frontend Developer</strong> I continuously learned and sharpened my technical skills, eventually taking on team lead
responsibilities in company projects.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                    <span>Designed and developed <strong className="text-white">administrative dashboards</strong> featuring <strong className="text-white">complex charts</strong> and reporting systems.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                    <span>Optimized performance with <strong className="text-white">Code Splitting</strong> & <strong className="text-white">Lazy Loading</strong> for 40% faster load times.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                    <span>Acted as a bridge between UI/UX and Backend teams to ensure seamless API integration and
optimized data flow for production-grade applications.</span>
                  </li>
                  
                </ul>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-xs text-gray-500 mb-2">Key Clients:</p>
                  <div className="flex flex-wrap gap-2">
                    {clients.map((client) => (
                      <span key={client.name} className="text-xs font-medium px-3 py-1 bg-dark rounded-full border border-white/10 text-gray-300">
                        {client.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Earlier Experience */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-10 sm:pl-0"
            >
              <div className="sm:absolute sm:left-1/2 sm:-translate-x-2 sm:mt-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full shadow-glow ring-4 ring-dark" />
              </div>
              <div className="glass-card p-6 sm:p-8 rounded-2xl sm:ml-8 hover:border-blue-500/30 transition-colors group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      Currently seeking for new opportunities and more challenges.
                    </h3>
                    <p className="text-blue-400 font-medium">Fullstack Developer</p>
                  </div>
                  <span className="text-gray-500 text-sm bg-dark/50 px-3 py-1 rounded-full border border-white/10 self-start">
                    ???
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-16 text-center text-white"
          >
            Technical Skill Vault
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Frontend', icon: Layout, skills: skills.frontend, color: 'cyan', gradient: 'from-cyan-500/20 to-transparent' },
              { title: 'Backend', icon: Server, skills: skills.backend, color: 'orange', gradient: 'from-orange-500/20 to-transparent' },
              { title: 'Tools & Others', icon: Settings, skills: skills.tools, color: 'purple', gradient: 'from-purple-500/20 to-transparent' }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl hover:border-white/20 transition-colors group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-charcoal/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Projects Showcase</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Enterprise-grade applications built with modern technologies and best practices
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-card rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:shadow-glow">
                  {/* Project Header */}
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} relative p-8 flex items-end`}>
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative z-10">
                      <p className="text-white/80 text-sm font-medium mb-1">{project.subtitle}</p>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    </div>
                    <ExternalLink className="absolute top-6 right-6 text-white/60 group-hover:text-white transition-colors" size={24} />
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6 sm:p-8">
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                              <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-cyan-400 font-medium mb-4">Tech stack</h2>
          </motion.div>
                    <h5 className="text-1xl sm:text-2xl font-bold text-white my-4">Frontend</h5>
                    <div className="flex flex-wrap gap-2">
                      {project.fe.map((tag) => (
                        <span 
                          key={tag} 
                          className={`text-xs font-mono px-3 py-1.5 bg-dark rounded-lg border border-${project.accent}-400/20 text-${project.accent}-400`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h5 className="text-1xl sm:text-2xl font-bold text-white my-4">Backend</h5>
                    <div className="flex flex-wrap gap-2">
                      {project.be.map((tag) => (
                        <span 
                          key={tag} 
                          className={`text-xs font-mono px-3 py-1.5 bg-dark rounded-lg border border-${project.accent}-400/20 text-${project.accent}-400`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-40 bg-cyan-500/5 blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-6 text-white"
          >
            Let's Connect
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-10"
          >
            Open to new opportunities and collaborations
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center flex-wrap gap-4 mb-12"
          >
            {socialLinks.map((social) => (
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500"
          >
            <a href="mailto:t.manh.tien2610@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Mail size={18} />
              t.manh.tien2610@gmail.com
            </a>
            <a href="tel:0785174058" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Phone size={18} />
              0785174058
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Tran Manh Tien. Built with React, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </footer>

      {/* CV Modal Popup */}
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
              {/* Modal Header */}
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
              
              {/* PDF Viewer */}
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