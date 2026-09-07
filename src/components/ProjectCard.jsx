import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";
import Icon from "./icons.jsx";

export default function ProjectCard({ project }) {
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
      <hr className="retro-rule" />
      <p className="text-base flex-1">{project.summary}</p>
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