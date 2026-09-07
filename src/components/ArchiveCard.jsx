export default function ArchiveCard({ entry }) {
  return (
    <div className="retro-box text-dim">
      <h3 className="font-bold text-base text-crt-fg break-all">{entry.name}</h3>
      <p className="text-xs uppercase tracking-wider mt-1">
        [{entry.category.join(" / ")}]
      </p>
      <p className="text-sm mt-1">{entry.summary}</p>
      <a
        href={entry.repository}
        target="_blank"
        rel="noreferrer"
        className="retro-btn text-xs mt-3 w-fit"
      >
        Repo
      </a>
    </div>
  );
}