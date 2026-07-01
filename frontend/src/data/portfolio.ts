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
  website: "https://mohamedmasood.in",
  resume: "https://drive.google.com/file/d/1mTqFlRT0rsiuhhLLCQgigkHUlFDwmOmE/view?usp=sharing",
  available: true,
  tagline: [
    "I build the parts of products people never see but always feel —",
    "geospatial systems, backend APIs, and localization features for millions of users.",
  ],
};

export const about = {
  paragraphs: [
    "I'm a software developer at Zoho Corporation, where I build geospatial mapping features for a platform serving 4M+ users — writing backend logic in Java, JavaScript, and SQL, and shipping features that real customers rely on every day.",
    "My recent work focuses on native language support, map UI improvements, and backend APIs that power localization and mapping workflows. I like solving complex problems.",
    "I came up through an ECE degree, 450+ LeetCode problems, hackathon wins, and 23+ GitHub repositories spanning full-stack applications to machine learning. I care about clean fundamentals, readable code, and shipping things that hold up under load.",
  ],
  facts: [
    { label: "role", value: "Software Developer @ Zoho" },
    { label: "based", value: "Chennai, India" },
    { label: "focus", value: "Geospatial · Backend · Localization" },
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
      "Developed and delivered 4+ geospatial mapping features, including native-language support, for a platform serving 4M+ users.",
      "Revamped the map user interface and resolved 5+ critical mapping issues, improving usability and localization capabilities.",
      "Developed and integrated 2 backend APIs using Java, JavaScript, SQL, and MySQL to support localization and mapping workflows.",
      "Contributed to 5 production releases in collaboration with a 3-member engineering team.",
      "Participated in code reviews, feature planning, and deployment activities to maintain code quality and release reliability.",
    ],
    stack: ["Java", "JavaScript", "SQL", "MySQL", "Mapbox", "Apache Ant", "Git"],
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
    name: "Full Stack Banking Application",
    year: "2024",
    blurb: "A secure MERN banking platform with JWT auth, 12 REST APIs, supporting 300 concurrent users.",
    highlight: "MERN Stack",
    bullets: [
      "Developed a full-stack banking application with 5 user-facing pages and 12 REST APIs using MongoDB, Express.js, React, and Node.js.",
      "Implemented JWT-based authentication and authorization to secure user accounts and financial transactions.",
      "Designed and managed 3 database collections supporting account management, authentication, and transaction workflows.",
      "Built scalable client-server architecture capable of supporting approximately 300 concurrent users.",
    ],
    stack: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
    links: [
      { label: "GitHub", href: "https://github.com/mohamed-mashud" },
    ],
    featured: true,
  },
  {
    name: "Regenerative Dual Charging System for EVs",
    year: "2025",
    blurb: "A hybrid renewable EV charging prototype integrating solar and wind-assisted regenerative charging.",
    highlight: "IEEE Published",
    bullets: [
      "Designed and built a working prototype of a hybrid EV charging system integrating solar energy and wind-assisted regenerative charging.",
      "Collaborated within a 3-member team to develop renewable energy harvesting and storage mechanisms.",
      "Generated approximately 10 Wh of supplemental energy through prototype testing.",
      "Published research findings in an IEEE Conference Paper co-authored by 4 researchers.",
    ],
    stack: ["Hardware", "Renewable Energy", "Solar", "Prototyping"],
    links: [
      { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11100012" },
    ],
    featured: true,
  },
  {
    name: "AI Resume Screening System",
    year: "2025",
    blurb: "An NLP tool that ranks candidates against job descriptions using TF-IDF and cosine similarity.",
    highlight: "ML/NLP",
    bullets: [
      "Developed an AI-based resume screening tool matching candidate profiles with job descriptions.",
      "Used TF-IDF vectorization and cosine similarity to rank candidates automatically.",
      "Built a recruiter dashboard highlighting best candidate matches.",
    ],
    stack: ["Python", "Machine Learning", "NLP", "TF-IDF"],
    links: [],
    featured: true,
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "programming", items: ["Java", "JavaScript", "Python"] },
  { label: "databases", items: ["MySQL", "MongoDB"] },
  { label: "web", items: ["React.js", "Node.js", "Express.js"] },
  { label: "tools & platforms", items: ["Git", "Apache Ant", "Mapbox"] },
  {
    label: "concepts",
    items: ["REST APIs", "Machine Learning", "MERN Stack", "Backend Development", "Localization", "Geospatial Systems"],
  },
  {
    label: "soft skills",
    items: ["Problem Solving", "Teamwork", "Analytical Thinking"],
  },
];

export type Achievement = { title: string; result: string };

export const achievements: Achievement[] = [
  { title: "LeetCode Problems Solved", result: "450+" },
  { title: "GitHub Repositories", result: "23+" },
  { title: "CII Innovation Competition 2024", result: "Finalist" },
  { title: "Smart India Hackathon (Intra-College)", result: "Winner — 120+ teams" },
  { title: "Kavaach Hackathon (Intra-College)", result: "Winner — 100+ teams" },
  { title: "Blind Coding Competition (PTU)", result: "Winner — 20+ participants" },
  { title: "Robo Sumo Competition", result: "Winner — 20+ competitors" },
  { title: "Line Follower Competition — RGCET", result: "Runner Up" },
];

export const workshops = [
  "MATLAB Workshop — Indian Institute of Technology Madras",
  "Web Development Workshop — Indian Institute of Technology Madras",
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
      "A hybrid EV charging system integrating solar energy and wind-assisted regenerative charging mechanisms, co-authored by 4 researchers and generating ~10 Wh of supplemental energy in prototype testing.",
    venue: "IEEE Conference Paper",
    href: "https://ieeexplore.ieee.org/document/11100012",
  },
];

export const personal = {
  hobbies: [
    "Watching anime",
    "Reading manga and manhwa",
    "Playing carrom",
    "Running",
    "Working out",
  ],
  favorites: {
    anime: "One Piece",
    movie: "Ford v Ferrari",
    tech: "Java",
  },
  goals: "Wants to grow as a software engineer and keep building impactful products.",
  currentlyLearning: [
    "RAG (Retrieval-Augmented Generation)",
    "Chunking strategies for knowledge bases",
    "Vector embeddings",
    "Semantic search and similarity",
  ],
};
