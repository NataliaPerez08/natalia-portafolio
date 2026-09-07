import { Link, useParams, Navigate } from "react-router-dom";
import TerminalWindow from "../components/TerminalWindow.jsx";
import { projects } from "../data/index.js";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="space-y-6">
      <div className="mt-3 md:mt-6">
        <Link to="/projects" className="retro-btn text-sm">← BACK TO PROJECTS</Link>
      </div>
      <TerminalWindow title={`CASE_STUDY // ${project.name}`} variant="inverse">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">{project.name}</h1>
        <p className="text-dim text-sm uppercase tracking-wider mt-2">
          [{project.category.join(" / ")}]
        </p>
        <hr className="retro-rule" />
        <p className="text-lg">{project.summary}</p>
        <div className="mt-3">
          <p className="text-dim text-sm uppercase tracking-wider mb-2">STACK</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="retro-tag">{s}</span>
            ))}
          </div>
        </div>
        {project.repository && (
          <a
            href={project.repository}
            target="_blank"
            rel="noreferrer"
            className="retro-btn mt-6 inline-flex"
          >
            View repository
          </a>
        )}
      </TerminalWindow>
    </div>
  );
}