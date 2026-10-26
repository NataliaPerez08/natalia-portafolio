import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";
import Icon from "./icons.jsx";

export default function ProjectCard({ project }) {
  const meta = [
    project.language,
    project.stars != null ? `★ ${project.stars}` : null,
    project.updatedAt ? `updated ${project.updatedAt.slice(0, 10)}` : null,
  ].filter(Boolean);
  const topics = (project.topics || []).filter((t) => t !== "portfolio");

  return (
    <div className="retro-box flex flex-col">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-bold leading-tight">{project.name}</h3>
        {project.status && <StatusBadge status={project.status} />}
      </div>
      {project.category && (
        <p className="text-dim text-xs uppercase tracking-wider mt-1">
          [{project.category.join(" / ")}]
        </p>
      )}
      <p className="text-dim text-sm mt-1">{project.stack?.join(", ")}</p>
      {meta.length > 0 && (
        <p className="text-dim text-xs mt-1">{meta.join(" · ")}</p>
      )}
      {project.source === "github" && (
        <span className="retro-tag dim text-xs w-fit mt-1">SYNCED</span>
      )}
      <hr className="retro-rule" />
      <p className="text-base flex-1">{project.summary}</p>
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {topics.map((t) => (
            <span key={t} className="retro-tag dim text-xs">{t}</span>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-3">
        {project.caseStudy && (
          <Link to={`/projects/${project.slug}`} className="retro-btn text-sm">
            Case study
          </Link>
        )}
        {project.repository && (
          <a
            href={project.repository}
            target="_blank"
            rel="noreferrer"
            className="retro-btn text-sm"
          >
            <Icon name="github" className="inline-flex" /> Repo
          </a>
        )}
      </div>
    </div>
  );
}