export default function ExplorationCard({ exploration }) {
  return (
    <div className="retro-box opacity-90">
      <h3 className="font-bold text-base">{exploration.name}</h3>
      <p className="text-dim text-xs uppercase tracking-wider mt-1">
        [{exploration.category.join(" / ")}]
      </p>
      <p className="text-sm mt-1">{exploration.note}</p>
      <a
        href={exploration.upstream}
        target="_blank"
        rel="noreferrer"
        className="retro-btn text-xs mt-3 w-fit"
      >
        Upstream project
      </a>
    </div>
  );
}