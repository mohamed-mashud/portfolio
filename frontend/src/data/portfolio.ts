export type NavItem = { id: string; label: string };

export const nav: NavItem[] = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "work", label: "work" },
  { id: "skills", label: "skills" },
  { id: "awards", label: "awards" },
  { id: "contact", label: "contact" },
];

export const profile = {
  name: "Mohamed Masood N",
  role: "Software Developer",
  company: "Zoho Corporation",
  location: "Chennai, India",
  homeBase: "Pondicherry, India",
  email: "mohamedmasoodn@gmail.com",
  phone: "+91 8438809388",
  phoneHref: "+918438809388",
  github: "https://github.com/mohamed-mashud",
  githubHandle: "mohamed-mashud",
  linkedin: "https://linkedin.com/in/mohamedmasoodn",
  linkedinHandle: "mohamedmasoodn",
  available: true,
  // Short, human-written tagline shown in the hero
  tagline: [
    "I build the parts of products people never see but always feel —",
    "backend systems, mapping pipelines, and data-driven features.",
  ],
};

export const about = {
  paragraphs: [
    "I'm a software developer at Zoho Corporation, where I work close to the metal of production systems — writing backend logic in Java, JavaScript, and SQL, and shipping features that real customers rely on every day.",
    "Lately a lot of my time goes into vector-tile and Mapbox-based mapping systems, tightening up how maps render and behave. I like problems where correctness, performance, and a good developer experience all have to coexist.",
    "I came up through an ECE degree, a pile of hackathon weekends, and side projects spanning the MERN stack to machine learning. I care about clean fundamentals, readable code, and shipping things that hold up under load.",
  ],
  facts: [
    { label: "role", value: "Software Developer @ Zoho" },
    { label: "based", value: "Chennai, India" },
    { label: "focus", value: "Backend · Maps · ML" },
    { label: "status", value: "Open to opportunities" },
  ],
};

export const education = [
  {
    degree: "B.Tech — Electronics & Communication Engineering",
    institute: "Sri Manakula Vinayagar Engineering College",
    score: "8.4 CGPA",
    period: "2021 — 2025",
  },
  {
    degree: "Higher Secondary",
    institute: "Alpha English Higher Secondary School",
    score: "91.03%",
    period: "2021",
  },
  {
    degree: "Secondary",
    institute: "Alpha English Higher Secondary School",
    score: "91.8%",
    period: "2019",
  },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Zoho Corporation",
    role: "Software Developer",
    location: "Chennai, India",
    period: "July 2025 — Present",
    current: true,
    bullets: [
      "Develop backend features using Java, JavaScript, and SQL within live production systems.",
      "Build components for vector tiles and Mapbox-based mapping, improving map rendering and functionality.",
      "Implement backend logic supporting prediction algorithms for data-driven features.",
      "Use Apache Ant for build automation and compilation across large Java codebases.",
      "Collaborate with engineering teams to design and release new product features.",
      "Translate customer technical issues and feature requests into concrete product improvements.",
    ],
    stack: ["Java", "JavaScript", "SQL", "Mapbox", "Apache Ant"],
  },
];

export type Project = {
  name: string;
  year: string;
  blurb: string;
  highlight?: string;
  bullets: string[];
  stack: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "AI Resume Screening System",
    year: "2025",
    blurb: "An NLP tool that ranks candidates against a job description.",
    highlight: "Recruiter-facing",
    bullets: [
      "Built an AI resume-screening tool that matches candidate profiles to job descriptions.",
      "Used TF-IDF vectorization and cosine similarity to rank candidates automatically.",
      "Shipped a recruiter dashboard surfacing the strongest candidate matches.",
    ],
    stack: ["Python", "Machine Learning", "NLP", "TF-IDF"],
    links: [],
    featured: true,
  },
  {
    name: "Full Stack Banking Application",
    year: "2024",
    blurb: "A secure MERN banking platform with real auth and REST APIs.",
    bullets: [
      "Developed a secure banking platform on MongoDB, Express, React, and Node.",
      "Implemented authentication, authorization, and password hashing for financial data.",
      "Designed REST APIs for scalable client–server communication.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    links: [
      { label: "GitHub", href: "https://github.com/mohamed-mashud" },
    ],
  },
  {
    name: "Regenerative Dual Charging System for EVs",
    year: "2025",
    blurb: "A hybrid renewable charging prototype for electric vehicles.",
    bullets: [
      "Designed an EV charging system integrating solar energy with air-pressure regeneration.",
      "Improved vehicle efficiency by reducing dependence on external charging infrastructure.",
      "Built a working prototype demonstrating hybrid renewable energy harvesting.",
    ],
    stack: ["Hardware", "Renewable Energy", "Prototyping"],
    links: [
      { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11100012" },
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "languages", items: ["Java", "Python", "JavaScript", "SQL"] },
  { label: "web", items: ["React.js", "Node.js", "Express.js"] },
  { label: "databases", items: ["MySQL", "MongoDB"] },
  {
    label: "technologies",
    items: ["Machine Learning", "MERN Stack", "REST APIs", "Git", "Mapbox"],
  },
  { label: "tools", items: ["Apache Ant"] },
  {
    label: "strengths",
    items: ["Problem Solving", "Teamwork", "Analytical Thinking"],
  },
];

export type Achievement = { title: string; result: string };

export const achievements: Achievement[] = [
  { title: "CII Innovation Competition", result: "Finalist" },
  { title: "Blind Coding Competition (PTU)", result: "Winner" },
  { title: "Robo Sumo Competition", result: "Winner" },
  { title: "Line Follower Competition — RGCET", result: "Runner Up" },
  { title: "Intra-College Smart India Hackathon", result: "Winner" },
  { title: "Intra-College Kavaach Hackathon", result: "Winner" },
];

export const workshops = [
  "MATLAB Workshop — IIT Madras",
  "Web Development Workshop — IIT Madras",
];

export type Publication = {
  title: string;
  summary: string;
  venue: string;
  href: string;
};

export const publications: Publication[] = [
  {
    title: "Regenerative Dual Charging System for Electric Vehicles",
    summary:
      "A dual regenerative EV charging system integrating solar power and energy-recovery mechanisms to extend range and cut dependence on external charging.",
    venue: "IEEE Xplore",
    href: "https://ieeexplore.ieee.org/",
  },
];
