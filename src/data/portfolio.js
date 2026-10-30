export const portfolio = {
  name: 'Vinishaa K R',
  title: 'Software Development Engineer',
  email: 'vinishaakr@gmail.com',
  phone: '+91 9092683907',
  location: 'Vellore, TN',
  summary:
    'Software Development Engineer with 2+ years of experience building Android and full-stack applications using Java, React, and Ruby on Rails. Hands-on experience in AI agent-driven product development, performance optimization, and native Android integration, with a focus on delivering reliable, production-ready solutions.',
  intro:
    'I build end-to-end software solutions across full-stack systems, Android applications, and AI-powered workflows, taking ideas from implementation to production.',
  coreStrengths: ['Android engineering', 'Full-stack product delivery', 'AI agent workflows', 'Performance optimization'],
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    // { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    // { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ],
  mySkills: [
    'Android Engineering', 'Full Stack Development', 'AI-enabled workflows'
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/vinishaa-k-r-ba36121a3',
    github: 'https://github.com/Vinishaa-ramesh',
    resume: '/resume.pdf',
  },
  about: {
    description: 'Software engineer focused on building reliable, real-world products while continuously growing and expanding technical expertise.',
    paragraphOne:
      'I\'m a Software Development Engineer with 2+ years of experience building Android and full-stack applications, with a focus on creating reliable, scalable, and production-ready products. My experience spans Java, React, Ruby on Rails, and native Android development, along with performance optimization, system integration, and AI agent-driven product development.',
    paragraphTwo:
      'I enjoy solving practical engineering problems, improving application performance, and turning ideas into meaningful user experiences. I\'m always looking to deepen my technical expertise, explore new technologies, and build products that make a real-world impact.'
    },
  experience: [
    {
      title: 'Software Development Engineer - Full Stack',
      company: 'Vegrow',
      website: 'https://www.vegrow.in/',
      period: 'June 2024 - August 2026',
      location: 'Chennai, TN',
      description:
        'Delivered Android and full-stack product work across mobile app engineering, data pipelines, and performance improvements in a high-impact agritech environment.',
      bullets: [
        'Led a 4-member team to deliver a native Android application from scratch, partnering with Product to translate requirements into a plan and ship within the expected timeline.',
        'Improved on-device video processing by 40% by introducing concurrency and worker-based processing in the Android pipeline, improving overall processing efficiency.',
        'Reduced page load time from 12 seconds to 2 seconds (about 83%) by optimizing API calls and data-fetching workflows, significantly improving responsiveness and user experience.',
        'Resolved a critical production startup crash caused by a corrupted module by refactoring app initialization, adding safeguards, and implementing pre-deployment tests.',
        'Implemented Firebase-based monitoring and remote debugging for data-processing workflows, enabling real-time status tracking and faster diagnosis and resolution of production issues.',
        'Designed and implemented a reusable Android in-app update module, creating a standard architecture for integration across multiple applications.',
        'Owned the end-to-end implementation of ARCore-based functionality within an existing Android application, integrating and successfully publishing the application to Google Play Store.',
        'Shipped an enterprise React Capacitor mobile application from scratch to production, independently implementing custom native Android plugins to expose native functionality.',
        'Strengthened Android application security using encryption and code obfuscation to protect application logic and user data against reverse engineering and unauthorized extraction.',
        'Engineered a video pipeline connecting the Android application, Jetson Nano, and Intel RealSense using socket-based communication and GStreamer for video capture and processing.',
        'Implemented a GPS-based activity logger to track user movement during data collection, helping validate the accuracy and reliability of generated results.',
      ],
      technologies: ['Java', 'React', 'Ruby on Rails', 'Android', 'Firebase', 'Capacitor', 'ARCore', 'GStreamer', 'Docker', 'MySQL', 'AWS', 'Git', 'Jenkins', 'Mixpanel'],
    },
  ],
  projects: [
    
  ],
  skills: {
    languages: ['Java', 'JavaScript', 'Ruby', 'Kotlin', 'C/C++', 'Python'],
    frontend: ['React', 'Capacitor', 'JavaScript'],
    backend: ['Ruby on Rails', 'REST APIs', 'Redis'],
    databases: ['MySQL', 'PostgreSQL'],
    cloud: ['AWS (ECR, SageMaker)', 'Firebase', 'Docker'],
    // AI: ['AI agent-driven product development', 'Generative AI product workflows'],
    tools: ['Git', 'Jenkins', 'Mixpanel', 'ARCore', 'GStreamer'],
  },
  certifications: [],
  education: {
    degree: 'B.E. Computer Science Engineering',
    institution: 'Madras Institute of Technology, Anna University',
    period: '2020 - 2024',
    detail: 'CGPA: 8.9/10.0',
  },
};

export const projectTemplate = {
  id: '',
  name: '',
  image: '',
  imageAlt: '',
  description: '',
  link: '',
  impact: '',
  skills: [],
  sections: [],
};
