
import React from "react";
import photo from "./IMG_20230208_171645530.jpg";

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

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">{title}</h2>
      {children}
    </section>
  );
}
function Badge({ children }) {
  return <span className="inline-block rounded-full border px-3 py-1 text-sm leading-6">{children}</span>;
}
function Card({ children }) {
  return <div className="rounded-2xl border bg-white/5 dark:bg-black/20 backdrop-blur p-5 shadow-sm hover:shadow transition-shadow">{children}</div>;
}

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b bg-white/60 dark:bg-black/40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#about" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 grid place-items-center text-white font-bold">NP</div>
          <div>
            <h1 className="text-lg font-semibold">Natalia Abigail Pérez Romero</h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">Computer Scientist</p>
          </div>
        </a>
        <nav className="hidden md:flex gap-3">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-sm px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">{n.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100 via-transparent to-transparent dark:from-purple-900/20" />
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Building scalable, secure, and elegant systems</h2>
            <p className="mt-4 text-neutral-700 dark:text-neutral-200 max-w-2xl">
              I’m a computer scientist with experience in software engineering, cloud, networking & security, and data/AI—focused on delivering reliable and impactful solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10" target="_blank" rel="noreferrer">{s.label}</a>
              ))}
              <a href="/cv_Natalia_Perez.pdf" className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">Download CV (PDF)</a>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
              <img
                src={photo}
                alt="Natalia Abigail Pérez Romero"
                className="w-full h-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" title="About">
      <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-3xl">
        Highly skilled and driven computer scientist with expertise in software development, algorithm design, cloud computing, and operating systems.
        Passionate about innovation and applying strong CS fundamentals across network security, distributed systems, data science, and AI to design scalable, efficient, and secure systems.
      </p>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-3">Technical</h3>
          <div className="flex flex-wrap gap-2">
            {skills.technical.map((group) => (
              <div key={group.title} className="w-full">
                <p className="text-sm font-medium mt-3 mb-2 opacity-80">{group.title}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (<Badge key={item}>{item}</Badge>))}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Soft</h3>
          <div className="flex flex-wrap gap-2">
            {skills.soft.map((s) => (<Badge key={s}>{s}</Badge>))}
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="grid gap-4">
        {experience.map((job) => (
          <Card key={job.role + job.org}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{job.role}</h3>
                <p className="text-sm opacity-80">{job.org} • {job.location}</p>
              </div>
              <p className="text-sm opacity-80">{job.date}</p>
            </div>
            <ul className="list-disc ml-6 mt-3 space-y-1 text-sm leading-6">
              {job.bullets.map((b, i) => (<li key={i}>{b}</li>))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Card key={p.title}>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm opacity-80 mt-1">{p.stack}</p>
            <p className="mt-2 text-sm">{p.desc}</p>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm underline">View on GitHub</a>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid gap-4">
        {education.map((e) => (
          <Card key={e.title}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <p className="text-sm opacity-80">{e.org} • {e.location}</p>
              </div>
              <p className="text-sm opacity-80">{e.date}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certs" title="Certifications">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((c, idx) => (
          <Card key={idx}>
            <h4 className="font-semibold">{c.name}</h4>
            <p className="text-sm opacity-80">{c.issuer}</p>
            <p className="text-xs opacity-70 mt-1">Issued: {c.date}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="grid md:grid-cols-3 gap-4">
        {socialLinks.map((s) => (
          <Card key={s.label}>
            <p className="text-sm opacity-80 mb-2">{s.label}</p>
            <a href={s.href} target="_blank" rel="noreferrer" className="underline break-all">{s.href}</a>
          </Card>
        ))}
      </div>
      <p className="text-xs opacity-60 mt-6">Prefer WhatsApp? Add: +52 55 85 75 16 53</p>
    </Section>
  );
}

function Footer() {
  return <footer className="py-10 text-center text-sm opacity-70">© {new Date().getFullYear()} Natalia Pérez · Built with ♥</footer>;
}

export default function App() {
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
    <main className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white">
      <Header />
      <Hero />
      <div className="max-w-6xl mx-auto px-4">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
