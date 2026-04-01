import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Eye, 
  ExternalLink,
  ChevronDown,
  Code2,
  Database,
  Layout,
  Server
} from 'lucide-react';

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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const CV_LINK = "https://github.com/tientm2610/CV/blob/main/TranManhTien_CV.pdf";

export default function App() {
  return (
    <div className="min-h-screen bg-dark text-gray-200 font-sans selection:bg-cyan-500/30">
      
      {/* 🚀 Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center border-b-0 border-white/5">
        <h1 className="text-xl font-bold tracking-tight text-white border-l-2 border-cyan-400 pl-3">
          TMT<span className="text-cyan-400">.</span>
        </h1>
        <div className="flex gap-4">
          <a href="#about" className="hover:text-cyan-400 transition-colors text-sm font-medium">About</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors text-sm font-medium">Experience</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors text-sm font-medium">Projects</a>
        </div>
      </nav>

      {/* 🟢 HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl w-full mx-auto relative z-10 text-center"
        >
          <motion.div variants={fadeInUp} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-sm font-medium tracking-wide">
            FULLSTACK DEVELOPER
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Architecting <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Scalable Solutions.
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Hi, I'm <span className="text-white font-semibold">TRAN MANH TIEN</span>. 
            I build enterprise-grade web applications with ReactJS & Java Spring Boot.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={CV_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-dark px-8 py-3.5 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <Eye size={20} />
              View my CV
            </a>
            <a href="#projects" className="flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium border border-gray-600 hover:border-cyan-400 hover:text-cyan-400 transition-all">
              View My Work
            </a>
          </motion.div>
          
          {/* Floating UI element */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mt-20 flex justify-center text-gray-500"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* 🧠 ABOUT & SKILLS SECTION */}
      <section id="about" className="py-24 px-4 bg-charcoal/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="w-10 h-[2px] bg-cyan-400 inline-block"></span>
                About Me
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed text-lg">
                <p>
                  I'm a passionate developer based in Ho Chi Minh City with over <strong className="text-white">2+ years of experience</strong> building enterprise-level systems for domains like Banking & Education (including ABBANK, VUS, and Dai-ichi Life).
                </p>
                <p>
                  Having successfully transitioned from a <strong className="text-cyan-400">Frontend Expert</strong> to a comprehensive <strong className="text-cyan-400">Fullstack Developer</strong>, I specialize in bridging the gap between highly interactive user interfaces and robust, secure backend architectures.
                </p>
                <div className="pt-4 flex gap-6">
                  <div className="glass-card p-4 rounded-xl border-l-4 border-l-cyan-400">
                    <p className="text-3xl font-bold text-white mb-1">3.13</p>
                    <p className="text-sm">GPA | Gia Dinh University</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl border-l-4 border-l-blue-500">
                    <p className="text-3xl font-bold text-white mb-1">2+</p>
                    <p className="text-sm">Years Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skill Cloud */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid gap-4"
            >
              <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl hover:border-cyan-400/50 transition-colors group">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="text-cyan-400" />
                  <h3 className="text-xl font-bold text-white">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'JavaScript', 'TypeScript', 'SQL'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm group-hover:border-cyan-400/30 transition-colors">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl hover:border-blue-400/50 transition-colors group">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Backend Arch</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Spring Boot', 'Spring Security', 'OAuth2', 'RESTful APIs', 'Microservices'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm group-hover:border-blue-400/30 transition-colors">{skill}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="glass-card p-6 rounded-2xl hover:border-purple-400/50 transition-colors group">
                <div className="flex items-center gap-3 mb-4">
                  <Layout className="text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Frontend Ecosystem</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['ReactJS', 'Redux Toolkit', 'Tailwind CSS', 'Ant Design', 'Framer Motion'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm group-hover:border-purple-400/30 transition-colors">{skill}</span>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ⏳ EXPERIENCE TIMELINE */}
      <section id="experience" className="py-24 px-4 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-900/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-16 text-center text-white"
          >
            Professional Experience
          </motion.h2>

          <div className="space-y-12 border-l-2 border-cyan-400/30 ml-4 md:ml-0 md:pl-0">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative md:pl-10 pl-6"
            >
              <div className="absolute w-4 h-4 bg-cyan-400 rounded-full -left-[9px] top-2 shadow-[0_0_10px_rgba(6,182,212,0.8)] border-2 border-dark"></div>
              <div className="glass-card p-8 rounded-2xl neon-border hover:bg-white/[0.02] transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">I TECHCO</h3>
                    <p className="text-cyan-400 font-medium">Fullstack Developer</p>
                  </div>
                  <span className="text-gray-500 text-sm mt-2 md:mt-0 bg-dark px-3 py-1 rounded-full border border-gray-800">Present</span>
                </div>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Spearheaded the <strong>Technical Leadership</strong> for critical frontend architectures, transitioning complex monolithic patterns to modern, scalable React paradigms.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Led massive <strong>Optimization</strong> efforts, introducing robust Code Splitting, dynamic imports, and WebSockets to drastically reduce LCP and TTI across enterprise portals.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    <span>Architected end-to-end features integrating secure Java Spring Boot microservices with high-performance React user interfaces.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 💻 FEATURED PROJECTS */}
      <section id="projects" className="py-24 px-4 bg-charcoal/30 relative">
        <div className="max-w-6xl mx-auto z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Project 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className="h-48 bg-gray-800/50 flex items-center justify-center p-6 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors"></div>
                <Database className="w-20 h-20 text-cyan-400/50 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">E-learning Platform</h3>
                  <ExternalLink className="text-gray-500 hover:text-white cursor-pointer" size={20} />
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  A comprehensive educational platform featuring an <strong>Advanced Examination System</strong>. Implemented strict anti-cheating mechanisms using browser API heuristics and secure WebSocket feeds to ensure integrity during remote evaluations.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="text-xs font-mono px-2 py-1 bg-dark rounded border border-cyan-400/20 text-cyan-400">ReactJS</span>
                  <span className="text-xs font-mono px-2 py-1 bg-dark rounded border border-cyan-400/20 text-cyan-400">Spring Boot</span>
                  <span className="text-xs font-mono px-2 py-1 bg-dark rounded border border-cyan-400/20 text-cyan-400">WebSockets</span>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className="h-48 bg-gray-800/50 flex items-center justify-center p-6 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"></div>
                <Layout className="w-20 h-20 text-blue-400/50 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Mentor & Coaching System</h3>
                  <ExternalLink className="text-gray-500 hover:text-white cursor-pointer" size={20} />
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  A high-availability portal connecting mentors with mentees. Drove the <strong>Fullstack Implementation</strong> integrating robust <strong>OAuth2 Security</strong> flows to manage permissions cleanly across varying user roles and organizations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-mono px-2 py-1 bg-dark rounded border border-blue-400/20 text-blue-400">OAuth2</span>
                  <span className="text-xs font-mono px-2 py-1 bg-dark rounded border border-blue-400/20 text-blue-400">Java</span>
                  <span className="text-xs font-mono px-2 py-1 bg-dark rounded border border-blue-400/20 text-blue-400">REST APIs</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 📬 FOOTER / CONTACT */}
      <footer className="py-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 bg-cyan-500/10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl font-bold text-white mb-8">Let's Connect</h2>
          
          <div className="flex justify-center gap-6 mb-8 text-gray-400">
            <a href="https://github.com/tientm2610" target="_blank" rel="noreferrer" className="hover:text-cyan-400 hover:scale-110 transition-all">
              <Github size={28} />
            </a>
            <a href="https://www.linkedin.com/in/manh-tien-tran-462956292/" target="_blank" rel="noreferrer" className="hover:text-blue-500 hover:scale-110 transition-all">
              <Linkedin size={28} />
            </a>
            <a href="https://www.facebook.com/butmapiachay567/" target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:scale-110 transition-all">
              <Facebook size={28} />
            </a>
            <a href="https://www.instagram.com/tientm_" target="_blank" rel="noreferrer" className="hover:text-pink-500 hover:scale-110 transition-all">
              <Instagram size={28} />
            </a>
            <a href="mailto:t.manh.tien2610@gmail.com" className="hover:text-cyan-400 hover:scale-110 transition-all">
              <Mail size={28} />
            </a>
          </div>
          
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Tran Manh Tien. Architecting Scalable Solutions.
          </p>
        </div>
      </footer>

    </div>
  );
}
