import React from "react";
import nat from "./nat.png";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certs", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/natalia-abigail-perez-romero-napr08/" },
  { label: "GitHub", href: "https://github.com/NataliaPerez08" },
  { label: "Email", href: "mailto:nataliapr08@gmail.com" },
];

const skills = {
  technical: [
    { title: "Programming Languages", items: ["Python", "C++", "Java", "JavaScript", "TypeScript", "Rust", "Go"] },
    { title: "Cloud Platforms", items: ["Huawei Cloud", "AWS", "GCP", "Azure"] },
    { title: "Networking & Security", items: ["Protocol design", "VPNs (WireGuard, IPsec)", "Cloud security", "Firewalls", "Cryptography", "Network protocols"] },
    { title: "System Architecture", items: ["Distributed systems", "Cloud computing", "Microservices"] },
    { title: "Version Control", items: ["Git", "GitLab", "GitHub"] },
    { title: "DevOps", items: ["Docker", "Kubernetes", "Terraform"] },
    { title: "Databases", items: ["SQL", "PostgreSQL", "MySQL", "MongoDB"] },
    { title: "Operating Systems", items: ["Linux", "Windows"] },
    { title: "Libraries & Frameworks", items: ["Spring", "TensorFlow", "Keras", "PyTorch", "NumPy", "Pandas", "Scikit-learn"] },
  ],
  soft: ["Problem-Solving", "Collaboration & Teamwork", "Adaptability", "Resilience", "Time Management", "Critical Thinking", "Leadership", "Attention to Detail"],
};

const experience = [
  { role: "Technical Account Manager", org: "Huawei Cloud", location: "CDMX, México", date: "Jun 2024 – Present", bullets: [
    "Own technical relationship with customers using Huawei Cloud services.",
    "Provide guidance on design/implementation of cloud solutions and troubleshoot issues.",
    "Drive customer satisfaction and successful outcomes.",
  ]},
  { role: "Teaching Assistant – Discrete Structures", org: "Facultad de Ciencias, UNAM", location: "CDMX, México", date: "Aug 2024 – Nov 2024", bullets: [
    "Led workshops and tutoring sessions on discrete mathematics.",
    "Graded assignments/exams and created supplementary materials.",
  ]},
  { role: "Teaching Assistant – Operating Systems", org: "Facultad de Ciencias, UNAM", location: "CDMX, México", date: "Feb 2024 – Jul 2024", bullets: [
    "Taught system-level programming and OS design concepts.",
    "Supported students in applying theory to problem‑solving.",
  ]},
];

const projects = [
  { title: "Thesis: Minimalist Orchestrator Using WireGuard", stack: "Python, WireGuard, Linux networking, Docker", desc: "Minimalist orchestrator to manage VPN peers and automate WireGuard in distributed environments.", link: "https://github.com/NataliaPerez08/docsTesis" },
  { title: "Electromagnetic Spectrum Classifier (FORS)", stack: "Python, NumPy, Scikit-learn, Pandas, Matplotlib, PyQt", desc: "Classifier for hyperspectral images of Mexico’s cultural heritage using supervised learning.", link: "https://github.com/NataliaPerez08/servicio-social" },
  { title: "Veterinary Clinic Database Design", stack: "HTML, CSS, JS, PHP, MariaDB, XAMPP", desc: "Modeled and implemented a small clinic database and web front-end.", link: "https://github.com/NataliaPerez08/proyectoETE" },
];

const education = [
  { title: "Bachelor’s Degree in Computer Science", org: "Facultad de Ciencias, UNAM", location: "CDMX, México", date: "2020 – 2024" },
  { title: "Technical Studies in Computing", org: "ENP 6 ‘Antonio Caso’", location: "CDMX, México", date: "2018 – 2020" },
];

const certs = [
  { issuer: "Cisco", name: "Introduction to Cybersecurity", date: "03/29/2021" },
  { issuer: "Cisco", name: "Junior Cybersecurity Analyst Career Path", date: "06/08/2024" },
  { issuer: "Cisco", name: "Networking Academy Learn‑A‑Thon 2024", date: "06/17/2024" },
  { issuer: "Cisco", name: "Ethical Hacker", date: "03/24/2025" },
  { issuer: "Cisco", name: "Network Technician Career Path", date: "05/03/2025" },
  { issuer: "Cisco", name: "Networking Academy Learn‑A‑Thon 2025", date: "06/27/2025" },
  { issuer: "Google Cloud Skills Boost", name: "Google Cloud Computing Foundations Certificate", date: "07/22/2024" },
  { issuer: "Google Cloud Skills Boost", name: "Prompt Design in Vertex AI", date: "08/25/2024" },
  { issuer: "Google Cloud Skills Boost", name: "Digital Transformation with Google Cloud", date: "07/28/2024" },
  { issuer: "Google Cloud Skills Boost", name: "Introduction to Security Principles in Cloud Computing", date: "07/22/2024" },
  { issuer: "Google Cloud Skills Boost", name: "Manage Kubernetes in Google Cloud", date: "10/02/2023" },
  { issuer: "Google Cloud Skills Boost", name: "Foundations: Data, ML, and AI in Google Cloud", date: "09/25/2023" },
  { issuer: "Google Cloud Skills Boost", name: "Foundations: Networking & Security in Google Cloud", date: "09/20/2023" },
  { issuer: "Google Cloud Skills Boost", name: "Foundations: Infrastructure in Google Cloud", date: "09/20/2023" },
  { issuer: "Google Cloud Skills Boost", name: "Responsible AI (Applying Principles)", date: "09/13/2023" },
  { issuer: "Google Cloud Skills Boost", name: "Generative AI Fundamentals", date: "09/12/2023" },
  { issuer: "Google Cloud Skills Boost", name: "Introduction to Responsible AI", date: "09/09/2023" },
  { issuer: "Google Cloud Skills Boost", name: "Introduction to Large Language Models", date: "09/09/2023" },
  { issuer: "Linux Foundation", name: "LFS158: Introduction to Kubernetes", date: "05/02/2025" },
  { issuer: "Microsoft", name: "Introduction to Version Control with Git", date: "10/17/2024" },
  { issuer: "Microsoft", name: "Azure Fundamentals: Cloud Concepts", date: "10/17/2024" },
];

const ICONS = {
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M8 7l-4 5 4 5M16 7l4 5-4 5M11 4l2 16" /></svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="6" y="6" width="12" height="12" rx="1" /><path d="M9 6V3M15 6V3M9 18v3M15 18v3M6 9H3M6 15H3M18 9h3M18 15h3" /></svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="3" y="6" width="18" height="13" rx="1" /><path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M12 11v4" /></svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M4 5h6l2 3h8a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" /></svg>
  ),
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 4l10 5-10 5L2 9l10-5z" /><path d="M6 11v4l6 3 6-3v-4" /><path d="M19 13v4" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="9" r="6" /><path d="M9 15l-1 7 4-3 4 3-1-7" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 6l9 6 9-6" /></svg>
  ),
};

function Icon({ name }) {
  return ICONS[name] || null;
}

function Window({ title, children, className = "", variant = "default", icon }) {
  return (
    <div className={`retro-window ${className}`}>
      <div className={`retro-title-bar ${variant === "inverse" ? "inverse" : ""} ${variant === "plain" ? "plain" : ""}`}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-3 h-3 border-2 border-current shrink-0" aria-hidden="true" />
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="font-bold tracking-widest uppercase text-sm md:text-base truncate">{title}</span>
        </div>
        <div className="w-3 h-3 border-2 border-current shrink-0" aria-hidden="true" />
      </div>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}

function SystemMenu({ time }) {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-crt-fg bg-crt-bg">
      <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between text-base md:text-lg">
        <div className="flex items-center gap-1 overflow-hidden">
          <span className="font-bold tracking-wider px-2 shrink-0" aria-hidden="true">&gt;_</span>
          <nav className="hidden md:flex gap-1 overflow-x-auto">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="px-2 hover:bg-crt-fg hover:text-crt-bg whitespace-nowrap">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden lg:inline text-dim">640K OK</span>
          <span className="hidden sm:inline">{time}</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-crt-fg animate-pulse" aria-hidden="true" />
            ONLINE
          </span>
        </div>
      </div>
    </header>
  );
}

function Banner() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-3">
      <div className="retro-window p-3 text-center overflow-x-auto">
        <pre className="text-[10px] sm:text-xs md:text-sm leading-none whitespace-pre font-mono text-crt-fg">
{`╔══════════════════════════════════════════════════════════════════╗
║  PERSONAL TERMINAL v1.0.3 — PROFILE VIEWER                       ║
║  COPYRIGHT (C) 1983 NATALIA PÉREZ · ALL RIGHTS RESERVED          ║
╚══════════════════════════════════════════════════════════════════╝`}
        </pre>
      </div>
    </div>
  );
}

function MobileNav() {
  return (
    <div className="md:hidden max-w-7xl mx-auto px-4 pt-3">
      <Window title="SECTIONS" variant="plain">
        <div className="flex flex-wrap gap-2">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="retro-btn text-sm">{n.label}</a>
          ))}
        </div>
      </Window>
    </div>
  );
}

function ProfileWindow() {
  return (
    <Window title="USER_PROFILE.EXE" variant="inverse" className="mt-3 md:mt-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold leading-none uppercase tracking-tight">
            Natalia Abigail<br />Pérez Romero
          </h2>
          <p className="text-dim text-lg">Computer Scientist // Cloud & Network Security Specialist</p>
          <hr className="retro-rule" />
          <p className="text-lg max-w-2xl">
            Building scalable, secure, and elegant systems. I’m a computer scientist with experience in software engineering, cloud, networking & security, and data/AI—focused on delivering reliable and impactful solutions.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} className="retro-btn" target="_blank" rel="noreferrer">{s.label}</a>
            ))}
            <a href="/cv_Natalia_Perez.pdf" className="retro-btn">Download CV (PDF)</a>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="retro-window p-1">
            <div className="relative">
              <img
                src={nat}
                alt="Natalia Abigail Pérez Romero"
                className="w-full aspect-square object-cover bitmap-portrait"
              />
              <div className="absolute bottom-0 left-0 right-0 border-t-2 border-crt-fg bg-crt-bg px-2 py-1 text-xs">PHOTO_001.BMP</div>
            </div>
            <div className="mt-2 text-xs text-dim flex justify-between">
              <span>128×128 px</span>
              <span>1-BIT DITHERED</span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

function AboutWindow() {
  return (
    <Window title="ABOUT.TXT" icon={<Icon name="user" />}>
      <p className="text-lg leading-relaxed max-w-3xl">
        Highly skilled and driven computer scientist with expertise in software development, algorithm design, cloud computing, and operating systems.
        Passionate about innovation and applying strong CS fundamentals across network security, distributed systems, data science, and AI to design scalable, efficient, and secure systems.
      </p>
    </Window>
  );
}

function SkillsWindow() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Window title="TECHNICAL.DAT" icon={<Icon name="code" />}>
        <div className="space-y-4">
          {skills.technical.map((group) => (
            <div key={group.title}>
              <p className="text-dim text-sm mb-2 uppercase tracking-wider">[{group.title}]</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="retro-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Window>
      <Window title="SOFT.DAT" icon={<Icon name="chip" />}>
        <div className="flex flex-wrap gap-2">
          {skills.soft.map((s) => (
            <span key={s} className="retro-tag dim">{s}</span>
          ))}
        </div>
      </Window>
    </div>
  );
}

function ExperienceWindow() {
  return (
    <Window title="EXPERIENCE.LOG" icon={<Icon name="briefcase" />}>
      <div className="space-y-4">
        {experience.map((job) => (
          <div key={job.role + job.org} className="retro-box">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold">{job.role}</h3>
                <p className="text-dim">{job.org} • {job.location}</p>
              </div>
              <p className="text-dim md:text-right shrink-0">{job.date}</p>
            </div>
            <hr className="retro-rule" />
            <ul className="retro-list space-y-1 text-base">
              {job.bullets.map((b, i) => (<li key={i}>{b}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </Window>
  );
}

function ProjectsWindow() {
  return (
    <Window title="PROJECTS.DIR" icon={<Icon name="folder" />}>
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.title} className="retro-box flex flex-col">
            <h3 className="text-lg font-bold leading-tight">{p.title}</h3>
            <p className="text-dim text-sm mt-1">{p.stack}</p>
            <hr className="retro-rule" />
            <p className="text-base flex-1">{p.desc}</p>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="retro-btn mt-3 w-fit text-sm">View on GitHub</a>
            )}
          </div>
        ))}
      </div>
    </Window>
  );
}

function EducationWindow() {
  return (
    <Window title="EDUCATION.REC" icon={<Icon name="graduation" />}>
      <div className="space-y-4">
        {education.map((e) => (
          <div key={e.title} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 retro-box">
            <div>
              <h3 className="text-lg font-bold">{e.title}</h3>
              <p className="text-dim">{e.org} • {e.location}</p>
            </div>
            <p className="text-dim md:text-right shrink-0">{e.date}</p>
          </div>
        ))}
      </div>
    </Window>
  );
}

function CertificationsWindow() {
  return (
    <Window title="CERTIFICATIONS.DB" icon={<Icon name="award" />}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {certs.map((c, idx) => (
          <div key={idx} className="retro-box flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-base leading-tight">{c.name}</h4>
              <p className="text-dim text-sm mt-1">{c.issuer}</p>
            </div>
            <p className="text-xs text-dim mt-3">ISSUED: {c.date}</p>
          </div>
        ))}
      </div>
    </Window>
  );
}

function ContactWindow() {
  return (
    <Window title="CONTACT.ADDR" icon={<Icon name="mail" />}>
      <div className="grid md:grid-cols-3 gap-4">
        {socialLinks.map((s) => (
          <div key={s.label} className="retro-box">
            <p className="text-sm text-dim mb-2 uppercase tracking-wider">[{s.label}]</p>
            <a href={s.href} target="_blank" rel="noreferrer" className="break-all text-sm">{s.href}</a>
          </div>
        ))}
      </div>
      <p className="text-sm text-dim mt-6">Prefer WhatsApp? Add: +52 55 85 75 16 53</p>
    </Window>
  );
}

function StatusBar() {
  return (
    <footer className="border-t-2 border-crt-fg bg-crt-bg mt-8 py-2 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Natalia Pérez · Built with ♥</p>
        <div className="flex items-center gap-4 text-dim">
          <span>640K RAM OK</span>
          <span>CONN: 2400 BAUD</span>
          <span>TERMINAL: VT-100</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <main className="min-h-screen bg-crt-bg text-crt-fg crt-turn-on">
      <SystemMenu time={time} />
      <Banner />
      <MobileNav />
      <div className="max-w-7xl mx-auto px-4 pb-8 space-y-6">
        <ProfileWindow />
        <div id="about"><AboutWindow /></div>
        <div id="skills"><SkillsWindow /></div>
        <div id="experience"><ExperienceWindow /></div>
        <div id="projects"><ProjectsWindow /></div>
        <div id="education"><EducationWindow /></div>
        <div id="certs"><CertificationsWindow /></div>
        <div id="contact"><ContactWindow /></div>
      </div>
      <StatusBar />
    </main>
  );
}
