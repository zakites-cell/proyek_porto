import type {
  PersonalInfo,
  Skill,
  Project,
  TimelineItem,
  SocialLink,
  SectionConfig,
  NavItem,
} from '@/types';

/* ──────────────────────── Colors ──────────────────────── */

export const COLORS = {
  background: '#050816',
  primary: '#00CFFF',
  secondary: '#7B61FF',
  accent: '#74F9FF',
  text: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.6)',
  surface: 'rgba(255, 255, 255, 0.05)',
  surfaceBorder: 'rgba(255, 255, 255, 0.1)',
} as const;

/* ──────────────────────── Personal Info ──────────────────────── */

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Alex Developer',
  profession: [
    'Full-Stack Developer',
    'UI/UX Designer',
    '3D Enthusiast',
    'Creative Coder',
  ],
  bio: 'Passionate developer who builds immersive digital experiences at the intersection of design and technology. Focused on crafting performant, accessible, and visually stunning web applications.',
  education: 'Bachelor of Computer Science — University of Technology',
  interests: ['3D Web Development', 'Creative Coding', 'Open Source', 'Music Production'],
  careerGoal: 'Building the next generation of immersive web experiences that push the boundaries of what browsers can do.',
  email: 'hello@alexdev.com',
  cvUrl: '/cv.pdf',
  social: {
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username'
  }
};

/* ──────────────────────── Navigation ──────────────────────── */

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'timeline', label: 'Timeline', href: '#timeline' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

/* ──────────────────────── Sections (camera waypoints) ──────────────────────── */

export const SECTIONS: SectionConfig[] = [
  { id: 'hero', label: 'Home', cameraPosition: [0, 2, 8], cameraLookAt: [0, 0, 0] },
  { id: 'about', label: 'About', cameraPosition: [0, 1, -3], cameraLookAt: [0, 0, -10] },
  { id: 'skills', label: 'Skills', cameraPosition: [0, 3, -13], cameraLookAt: [0, 0, -20] },
  { id: 'projects', label: 'Projects', cameraPosition: [0, 2, -23], cameraLookAt: [0, 0, -30] },
  { id: 'timeline', label: 'Timeline', cameraPosition: [0, 1, -32], cameraLookAt: [0, 0, -40] },
  { id: 'contact', label: 'Contact', cameraPosition: [0, 2, -43], cameraLookAt: [0, 0, -50] },
];

/* ──────────────────────── Skills ──────────────────────── */

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', level: 90, experience: '3+ years', category: 'frontend' },
  { name: 'TypeScript', icon: '🔷', level: 85, experience: '2+ years', category: 'frontend' },
  { name: 'Next.js', icon: '▲', level: 80, experience: '2+ years', category: 'frontend' },
  { name: 'TailwindCSS', icon: '🎨', level: 90, experience: '2+ years', category: 'frontend' },
  { name: 'Vue.js', icon: '💚', level: 70, experience: '1+ year', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: '🟢', level: 80, experience: '3+ years', category: 'backend' },
  { name: 'Express', icon: '🚀', level: 75, experience: '2+ years', category: 'backend' },
  { name: 'Python', icon: '🐍', level: 70, experience: '2+ years', category: 'backend' },
  { name: 'GraphQL', icon: '◇', level: 65, experience: '1+ year', category: 'backend' },

  // Database
  { name: 'PostgreSQL', icon: '🐘', level: 75, experience: '2+ years', category: 'database' },
  { name: 'MongoDB', icon: '🍃', level: 80, experience: '2+ years', category: 'database' },
  { name: 'Redis', icon: '🔴', level: 60, experience: '1+ year', category: 'database' },

  // Design
  { name: 'Figma', icon: '🎯', level: 85, experience: '3+ years', category: 'design' },
  { name: 'Adobe XD', icon: '💜', level: 70, experience: '2+ years', category: 'design' },

  // 3D
  { name: 'Three.js', icon: '🌐', level: 75, experience: '1+ year', category: '3d' },
  { name: 'Blender', icon: '🧊', level: 60, experience: '1+ year', category: '3d' },
  { name: 'R3F', icon: '🎮', level: 70, experience: '1+ year', category: '3d' },

  // Tools
  { name: 'Git', icon: '📦', level: 90, experience: '4+ years', category: 'tools' },
  { name: 'Docker', icon: '🐳', level: 65, experience: '1+ year', category: 'tools' },
  { name: 'VS Code', icon: '💻', level: 95, experience: '4+ years', category: 'tools' },
];

/* ──────────────────────── Skill Categories ──────────────────────── */

export const SKILL_CATEGORIES = [
  { id: 'frontend' as const, label: 'Frontend', color: '#00CFFF', orbitRadius: 3.5 },
  { id: 'backend' as const, label: 'Backend', color: '#7B61FF', orbitRadius: 4.5 },
  { id: 'database' as const, label: 'Database', color: '#74F9FF', orbitRadius: 5.5 },
  { id: 'design' as const, label: 'UI Design', color: '#FF6B9D', orbitRadius: 6.0 },
  { id: '3d' as const, label: '3D', color: '#FFD93D', orbitRadius: 6.5 },
  { id: 'tools' as const, label: 'Tools', color: '#6BCB77', orbitRadius: 7.0 },
];

/* ──────────────────────── Projects ──────────────────────── */

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce platform with real-time inventory management, payment integration, and admin dashboard.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'TailwindCSS'],
    githubUrl: 'https://github.com/username/ecommerce',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    screenshotUrl: '/projects/ecommerce.webp',
    color: '#00CFFF',
  },
  {
    id: 'project-2',
    title: 'AI Chat Application',
    description: 'Real-time AI-powered chat application with natural language processing and sentiment analysis.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI', 'WebSocket', 'MongoDB'],
    githubUrl: 'https://github.com/username/ai-chat',
    demoUrl: 'https://ai-chat-demo.vercel.app',
    screenshotUrl: '/projects/ai-chat.webp',
    color: '#7B61FF',
  },
  {
    id: 'project-3',
    title: '3D Data Visualization',
    description: 'Interactive 3D dashboard for visualizing complex datasets with customizable charts and real-time updates.',
    techStack: ['React', 'Three.js', 'D3.js', 'GraphQL', 'Python'],
    githubUrl: 'https://github.com/username/3d-viz',
    demoUrl: 'https://3d-viz-demo.vercel.app',
    screenshotUrl: '/projects/3d-viz.webp',
    color: '#74F9FF',
  },
  {
    id: 'project-4',
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard tracking social media metrics across multiple platforms with automated reporting.',
    techStack: ['Vue.js', 'Express', 'Redis', 'Docker', 'Chart.js'],
    githubUrl: 'https://github.com/username/social-dash',
    demoUrl: 'https://social-dash-demo.vercel.app',
    screenshotUrl: '/projects/social-dash.webp',
    color: '#FF6B9D',
  },
];

/* ──────────────────────── Timeline ──────────────────────── */

export const TIMELINE: TimelineItem[] = [
  {
    id: 'tl-1',
    date: '2020',
    title: 'Started Coding Journey',
    description: 'Wrote my first line of code and fell in love with building things for the web.',
    type: 'achievement',
  },
  {
    id: 'tl-2',
    date: '2021',
    title: 'Computer Science Degree',
    description: 'Enrolled in Computer Science at the University of Technology.',
    type: 'education',
  },
  {
    id: 'tl-3',
    date: '2022',
    title: 'Junior Frontend Developer',
    description: 'First professional role building React applications for a tech startup.',
    type: 'work',
  },
  {
    id: 'tl-4',
    date: '2023',
    title: 'Full-Stack Developer',
    description: 'Promoted to full-stack role. Led the development of key products and mentored junior developers.',
    type: 'work',
  },
  {
    id: 'tl-5',
    date: '2024',
    title: 'Open Source Contributor',
    description: 'Started contributing to major open-source projects and speaking at tech meetups.',
    type: 'achievement',
  },
  {
    id: 'tl-6',
    date: '2025',
    title: 'Senior Developer & 3D Specialist',
    description: 'Expanded into 3D web development, building immersive experiences with Three.js and R3F.',
    type: 'work',
  },
];

/* ──────────────────────── Social Links ──────────────────────── */

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/username', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/username', icon: 'twitter' },
  { name: 'Instagram', url: 'https://instagram.com/username', icon: 'instagram' },
];

/* ──────────────────────── Performance Config ──────────────────────── */

export const PERFORMANCE = {
  maxParticles: { high: 5000, medium: 2000, low: 500 },
  shadowMapSize: { high: 2048, medium: 1024, low: 512 },
  enablePostProcessing: { high: true, medium: true, low: false },
  enableShadows: { high: true, medium: true, low: false },
  dpr: { high: [1, 2] as [number, number], medium: [1, 1.5] as [number, number], low: [0.5, 1] as [number, number] },
} as const;
