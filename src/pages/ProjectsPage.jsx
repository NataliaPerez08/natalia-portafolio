import { useState } from "react";
import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Icon from "../components/icons.jsx";
import { projects } from "../data/index.js";

const CATEGORIES = [
  { key: "systems", label: "Systems" },
  { key: "networking", label: "Networking" },
  { key: "ai", label: "AI" },
  { key: "security", label: "Security" },
  { key: "data", label: "Data" },
];

export default function ProjectsPage() {
  const [sort, setSort] = useState("relevance");
  const featured = projects.filter((p) => p.featured);
  const standard = projects.filter((p) => !p.featured);
  const sorted =
    sort === "activity"
      ? [...standard].sort((a, b) =>
          (b.updatedAt || "").localeCompare(a.updatedAt || "")
        )
      : standard;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Projects"
        file="projects.dir"
        icon={<Icon name="folder" />}
        description="A catalogue of the systems, networks and tools I build."
      />

      <TerminalWindow title="FEATURED.BIN" icon="code">
        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </TerminalWindow>

      <TerminalWindow title="BY CATEGORY" icon="folder">
        <div className="flex flex-wrap gap-3 mb-4">
          {CATEGORIES.map((c) => {
            const count = projects.filter((p) => p.category.includes(c.key)).length;
            return (
              <span key={c.key} className="retro-tag">
                {c.label.toUpperCase()} ({count})
              </span>
            );
          })}
        </div>
      </TerminalWindow>

      <TerminalWindow title="PROJECTS.DIR" icon="folder">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`retro-btn text-sm ${sort === "relevance" ? "bg-crt-fg text-crt-bg" : "text-crt-dim border-crt-dim"}`}
            onClick={() => setSort("relevance")}
          >
            Relevance
          </button>
          <button
            className={`retro-btn text-sm ${sort === "activity" ? "bg-crt-fg text-crt-bg" : "text-crt-dim border-crt-dim"}`}
            onClick={() => setSort("activity")}
          >
            Activity
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {sorted.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}