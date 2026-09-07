import { Link } from "react-router-dom";
import TerminalWindow from "../components/TerminalWindow.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Icon from "../components/icons.jsx";
import { projects } from "../data/index.js";
import nat from "../assets/nat.png";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/natalia-abigail-perez-romero-napr08/" },
  { label: "GitHub", href: "https://github.com/NataliaPerez08" },
  { label: "Email", href: "mailto:nataliapr08@gmail.com" },
];

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-6">
      <TerminalWindow title="USER_PROFILE.EXE" variant="inverse" className="mt-3 md:mt-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold leading-none uppercase tracking-tight">
              Natalia Abigail<br />Pérez Romero
            </h2>
            <p className="text-dim text-lg uppercase tracking-wider">
              Computer Scientist<br />
              SYSTEMS · NETWORKS · AI · INFRASTRUCTURE
            </p>
            <hr className="retro-rule" />
            <p className="text-lg max-w-2xl">
              I build infrastructure, distributed systems, networking tools and AI systems.
            </p>
            <p className="text-dim text-lg">Sometimes I point Python at the universe.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/projects" className="retro-btn">EXPLORE</Link>
              <a
                href="https://github.com/NataliaPerez08"
                target="_blank"
                rel="noreferrer"
                className="retro-btn"
              >
                GITHUB
              </a>
              <a href="/cv_Natalia_Perez.pdf" className="retro-btn">CV</a>
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
      </TerminalWindow>

      <TerminalWindow title="FEATURED.BIN" icon="folder">
        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </TerminalWindow>

      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/projects" className="retro-box hover:bg-crt-fg hover:text-crt-bg">
          <p className="font-bold text-xl uppercase">[ ENGINEERING ]</p>
          <p className="text-xs text-dim uppercase tracking-wider mt-1">Systems · Networking · AI · Security · Data</p>
        </Link>
        <Link to="/homelab" className="retro-box hover:bg-crt-fg hover:text-crt-bg">
          <p className="font-bold text-xl uppercase">[ HOMELAB ]</p>
          <p className="text-xs text-dim uppercase tracking-wider mt-1">Real infrastructure, self-hosted services</p>
        </Link>
        <Link to="/experiments" className="retro-box hover:bg-crt-fg hover:text-crt-bg">
          <p className="font-bold text-xl uppercase">[ EXPERIMENTS ]</p>
          <p className="text-xs text-dim uppercase tracking-wider mt-1">Science · Astrophysics · Simulations · GPU</p>
        </Link>
        <Link to="/open-source" className="retro-box hover:bg-crt-fg hover:text-crt-bg">
          <p className="font-bold text-xl uppercase">[ OPEN SOURCE ]</p>
          <p className="text-xs text-dim uppercase tracking-wider mt-1">Contributions · Explorations</p>
        </Link>
      </div>

      <TerminalWindow title="CONTACT.ADDR" icon="mail">
        <div className="grid md:grid-cols-3 gap-4">
          {socialLinks.map((s) => (
            <div key={s.label} className="retro-box">
              <p className="text-sm text-dim mb-2 uppercase tracking-wider">[{s.label}]</p>
              <a href={s.href} target="_blank" rel="noreferrer" className="break-all text-sm">
                {s.href}
              </a>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}