import StatusBadge from "./StatusBadge.jsx";

export default function ExperimentCard({ experiment, className = "" }) {
  return (
    <div className={`retro-box flex flex-col ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-lg leading-tight">{experiment.name}</h3>
        {experiment.status && <StatusBadge status={experiment.status} />}
      </div>
      <p className="text-dim text-xs uppercase tracking-wider mt-1">
        [{experiment.category.join(" / ")}]
      </p>
      <p className="text-base flex-1 mt-2">{experiment.summary}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {experiment.stack.map((s) => (
          <span key={s} className="retro-tag dim text-xs">{s}</span>
        ))}
      </div>
      {experiment.repository && (
        <a
          href={experiment.repository}
          target="_blank"
          rel="noreferrer"
          className="retro-btn text-sm mt-3 w-fit"
        >
          Repo
        </a>
      )}
    </div>
  );
}