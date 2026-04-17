export const contentData = {
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
      { icon: 'GraduationCap', label: "Gia Dinh University", sublabel: "GPA: 3.13" },
      { icon: 'MapPin', label: "Ho Chi Minh City, Vietnam", sublabel: "Available for relocation" },
      { icon: 'Mail', label: "t.manh.tien2610@gmail.com", sublabel: "0785174058" }
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
    { name: 'Linkedin', href: 'https://www.linkedin.com/in/manh-tien-tran-462956292/', label: 'LinkedIn' },
    { name: 'Github', href: 'https://github.com/tientm2610', label: 'GitHub' },
    { name: 'Mail', href: 'mailto:t.manh.tien2610@gmail.com', label: 'Email' }
  ]
};

export const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export const iconComponents = {
  GraduationCap: null,
  MapPin: null,
  Mail: null,
  LinkedIn: null,
  Github: null
};