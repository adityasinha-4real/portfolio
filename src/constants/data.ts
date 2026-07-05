export const IDENTITY = {
  name: "Aditya Sinha",
  role: "AI · Machine Learning · Data Science",
  location: "Hyderabad, India",
  email: "adisinha1008@gmail.com",
  github: "https://github.com/adityasinha-4real",
  linkedin: "https://www.linkedin.com/in/aditya-1008-sinha/",
  twitter: "https://x.com/adityas_4real",
} as const;

export const HERO = {
  eyebrow: "REF-01 · Portfolio · MMXXVI",
  wordmark: "ADITYA SINHA",
  headline: ["Models", "that learn.", "Systems", "that scale."],
  subline:
    "I build applied AI, back-end systems and interactive visualizations — from retrieval pipelines to real-time telemetry.",
  cta: "Enter the archive",
} as const;

export const ABOUT = {
  section: "REF-02 · About",
  title: "Building intelligent systems\nfrom model to interface.",
  paragraphs: [
    "I enjoy working across the AI stack: designing models, building backend systems, and creating interfaces that make complex technology accessible.",
  ],
  pillars: [
    { code: "01", label: "AI Systems", copy: "RAG • Agents • LLM Evaluation • Fine-tuning" },
    { code: "02", label: "Backend Engineering", copy: "APIs • Distributed Services • Data Pipelines" },
    { code: "03", label: "Data Visualization", copy: "Dashboards • Analytics • Three.js • Real-time UI" },
    { code: "04", label: "Machine Learning", copy: "ML • Computer Vision • NLP • Experimentation" },
  ],
} as const;

export const PROJECTS = [
  {
    index: "01",
    slug: "ai-project-auditor",
    title: "AI Project Auditor",
    tagline: "Repository intelligence, powered by coordinated AI agents.",
    year: "2026",
    role: "Architecture · AI Engineering",
    stack: ["FastAPI", "Next.js", "Claude", "PostgreSQL", "Redis", "Docker"],
    metrics: [
      { label: "AI Agents", value: "4" },
      { label: "CI Jobs", value: "6" },
      { label: "Career Assets", value: "4" },
    ],
    description:
      "An AI-powered platform that analyzes GitHub repositories and transforms a single codebase into four production-ready career assets — resume bullets, technical documentation, interview preparation, and comprehensive code review reports — through a coordinated multi-agent workflow.",
    architecture: ["GitHub Repo", "Planner", ["Resume", "Docs", "Interview"], "Review", "Report"],
    href: "",
    repo: "https://github.com/adityasinha-4real/ai-project-auditor",
  },
  {
    index: "02",
    slug: "drdl-telemetry",
    title: "Missile Telemetry Data Analysis Engine",
    tagline: "Anomaly detection for high-volume missile telemetry.",
    year: "2026",
    role: "DRDL Internship",
    stack: ["Python", "Streamlit", "Plotly", "Pandas", "Scikit-learn"],
    metrics: [],
    description:
      "A Streamlit application for ingesting, profiling, and visualizing high-volume missile telemetry data at DRDO-DRDL, built to automate signal validation and flag anomalous behaviour. Combines statistical methods (Z-Score, IQR) with ML-based detection (Isolation Forest, DBSCAN) for multivariate anomaly analysis, alongside a benchmarking framework to compare detection methods and export analytical reports.",
    architecture: [
      "Ingest",
      "Decode",
      ["Filter", "Validate"],
      "Feature Gen",
      ["Stats", "ML Detect"],
      "Visualize",
      "Export",
    ],
    href: "",
    repo: "",
  },
  {
    index: "03",
    slug: "ats-checker",
    title: "ATS Resume Checker",
    tagline: "Get past the filter, not just the reader.",
    year: "2026",
    role: "AI Engineering · NLP",
    stack: ["FastAPI", "Next.js", "spaCy", "MiniLM", "scikit-learn", "SQLite"],
    metrics: [
      { label: "Tech Skills", value: "200+" },
      { label: "Scoring Dimensions", value: "5" },
      { label: "Analysis Time", value: "2-5s" },
    ],
    description:
      "An AI-powered ATS analysis platform, deployable locally or in the cloud, that parses resumes, extracts structured information, and performs weighted ATS and semantic matching against job descriptions. Identifies missing keywords and skill gaps, then generates actionable reports and candidate rankings.",
    architecture: [
      "Resume",
      "Parse",
      ["Extract", "Job Desc"],
      "ATS Engine",
      ["Keywords", "Semantic", "Skills"],
      "Report & Ranking",
    ],
    href: "https://ats-checker-personal.vercel.app/",
    repo: "https://github.com/adityasinha-4real/ats-checker-personal",
  },
  {
    index: "04",
    slug: "diabetic-retinopathy",
    title: "Diabetic Retinopathy Detection",
    tagline: "Computer vision for medical AI.",
    year: "2025",
    role: "Research · Development",
    stack: ["Python", "TensorFlow", "Keras", "EfficientNetB4", "Grad-CAM", "Streamlit"],
    metrics: [],
    description:
      "Deep learning system for automated diabetic retinopathy grading from retinal fundus images. Built using EfficientNetB4 transfer learning with class balancing, Grad-CAM explainability, comprehensive evaluation metrics, and a Streamlit inference dashboard.",
    architecture: ["Fundus Image", "Preprocess", "EfficientNetB4", ["Grad-CAM", "Metrics"], "Dashboard"],
    href: "",
    repo: "https://github.com/adityasinha-4real/dr_detection",
  },
  {
    index: "05",
    slug: "data-analytics-projects",
    title: "Data Analytics Projects",
    tagline: "Data analytics across diverse datasets.",
    year: "2025",
    role: "Data Analysis · Research",
    stack: ["Python", "Pandas", "NumPy", "SciPy", "scikit-learn", "Matplotlib", "Jupyter"],
    metrics: [],
    description:
      "A curated collection of Python data analytics projects covering COVID-19, real estate, global terrorism, fitness, and trading datasets. Features reproducible data pipelines, exploratory data analysis, statistical modeling, and interactive visualizations using Jupyter notebooks.",
    architecture: ["Acquire", "Clean", "Analyze", "Visualize", "Insights"],
    href: "",
    repo: "",
  },
] as const;

export const TECH = [
  { name: "Python", group: "Language", weight: 1.0 },
  { name: "TypeScript", group: "Language", weight: 0.95 },
  { name: "JavaScript", group: "Language", weight: 0.9 },
  { name: "Java", group: "Language", weight: 0.6 },
  { name: "Rust", group: "Language", weight: 0.5 },
  { name: "PyTorch", group: "ML", weight: 0.95 },
  { name: "Transformers", group: "ML", weight: 0.9 },
  { name: "LangGraph", group: "ML", weight: 0.85 },
  { name: "TensorFlow", group: "ML", weight: 0.75 },
  { name: "vLLM", group: "ML", weight: 0.7 },
  { name: "Next.js", group: "Web", weight: 0.95 },
  { name: "React", group: "Web", weight: 0.95 },
  { name: "Tailwind CSS", group: "Web", weight: 0.9 },
  { name: "HTML5", group: "Web", weight: 0.9 },
  { name: "CSS3", group: "Web", weight: 0.85 },
  { name: "Three.js", group: "Web", weight: 0.75 },
  { name: "GSAP", group: "Web", weight: 0.7 },
  { name: "FastAPI", group: "Backend", weight: 0.9 },
  { name: "Node.js", group: "Backend", weight: 0.85 },
  { name: "Postgres", group: "Backend", weight: 0.85 },
  { name: "Express", group: "Backend", weight: 0.7 },
  { name: "Redis", group: "Backend", weight: 0.75 },
  { name: "MongoDB", group: "Backend", weight: 0.65 },
  { name: "Qdrant", group: "Backend", weight: 0.7 },
  { name: "MySQL", group: "Backend", weight: 0.6 },
  { name: "Docker", group: "Infra", weight: 0.85 },
  { name: "AWS", group: "Infra", weight: 0.75 },
  { name: "Vercel", group: "Infra", weight: 0.85 },
  { name: "Firebase", group: "Infra", weight: 0.65 },
  { name: "Git", group: "Tools", weight: 0.95 },
  { name: "Linux", group: "Tools", weight: 0.8 },
  { name: "Figma", group: "Tools", weight: 0.7 },
] as const;

export const EXPERIENCE = [
  {
    year: "2026",
    org: "DRDL — DRDO",
    role: "AI/ML Research Intern",
    copy: "Built AI-driven missile telemetry analysis and anomaly-detection tooling, automating signal validation for defence subsystems at **DRDL-DRDO Hyderabad**.",
  },
  {
    year: "2025",
    org: "C.S.E.D",
    role: "Core · PR & Outreach",
    copy: "Led PR and outreach for the **Centre for Social Entrepreneurship and Development at VIT**.",
  },
  {
    year: "2024",
    org: "roboVITics",
    role: "Core Member",
    copy: "Core member of VIT's official robotics club i.e. **roboVITics** — builds, competitions and outreach.",
  },
  {
    year: "2023",
    org: "United Motorsports Academy",
    role: "Student Ambassador",
    copy: "Represented **UMA**'s motorsport engineering programs across student communities, remote.",
  },
  {
    year: "→",
    org: "Next",
    role: "Open to collaboration",
    copy: "Actively looking for full-time roles in AI/ML and software engineering — open to teams building real products.",
  },
] as const;

export const EDUCATION = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Vellore Institute of Technology, Vellore",
    years: "2023 — 2027 (Currently Pursuing)",
    detail: "CGPA: 8.52/10",
  },
  {
    degree: "Higher Secondary (PCM)",
    institution: "Sri Chaitanya",
    years: "2021 — 2023",
  },
  {
    degree: "Secondary Education (CBSE)",
    institution: "Delhi Public School, Hyderabad",
    years: "Completed 2021",
  },
] as const;

export const CERTIFICATIONS = [
  {
    index: "01",
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    date: "Mar 2026",
    href: "https://verify.skilljar.com/c/u2nhwjrxdocq",
  },
  {
    index: "02",
    title: "AI Fluency Framework & Foundations",
    issuer: "Anthropic",
    date: "Mar 2026",
    href: "https://verify.skilljar.com/c/haddzbjrbpyc",
  },
  {
    index: "03",
    title: "Gen AI Using IBM Watsonx",
    issuer: "IBM",
    date: "Jun 2025",
    href: "https://courses.vit.skillsnetwork.site/certificates/a76b60c9e92f437d9e6363faab493627",
  },
  {
    index: "04",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    date: "Jun 2025",
    href: "https://www.coursera.org/account/accomplishments/verify/DWHH2PV5UZZ6",
  },
  {
    index: "05",
    title: "Ultimate Fusion 360 Course",
    issuer: "Udemy",
    date: "Aug 2024",
    href: "https://www.udemy.com/certificate/UC-881fdd2f-385a-4864-8b9b-8067c46fc4c2/",
  },
] as const;

export const BEYOND = {
  label: "Beyond Engineering",
  lines: [
    "When I'm not building AI systems,",
    "I'm studying football tactics,",
    "watching Barcelona,",
    "or analyzing Messi's movement off the ball.",
    "",
    "The same curiosity I apply to models,",
    "I apply to the game.",
  ],
} as const;

export const CONTACT = {
  eyebrow: "REF-06 · Contact Me",
  headline: ["Let's build", "something rare."],
  copy: "For collaborations, research or a serious conversation.",
} as const;
