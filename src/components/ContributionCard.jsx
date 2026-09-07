export default function ContributionCard({ contribution }) {
  return (
    <div className="retro-box">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
        <div>
          <h3 className="font-bold text-lg">{contribution.project}</h3>
          <p className="text-dim text-sm uppercase tracking-wider">
            {contribution.upstream} · PR #{contribution.pullRequest}
          </p>
        </div>
        <a
          href={contribution.pullRequestUrl}
          target="_blank"
          rel="noreferrer"
          className="retro-btn text-sm shrink-0"
        >
          View PR
        </a>
      </div>
      <hr className="retro-rule" />
      <p className="text-base">{contribution.summary}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {contribution.stack.map((s) => (
          <span key={s} className="retro-tag dim text-xs">{s}</span>
        ))}
      </div>
    </div>
  );
}