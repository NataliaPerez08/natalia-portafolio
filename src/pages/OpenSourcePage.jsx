import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import Icon from "../components/icons.jsx";
import { contributions, explorations } from "../data/index.js";

export default function OpenSourcePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Open Source"
        file="oss.dir"
        icon={<Icon name="github" />}
        description="Upstream work with verifiable contributions — and forks I only studied."
      />

      <TerminalWindow title="CONTRIBUTIONS.LOG" icon="code">
        <div className="space-y-3">
          {contributions.map((c, i) => (
            <div key={i} className="retro-box">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="font-bold text-lg">{c.project}</h3>
                  <p className="text-dim text-sm uppercase tracking-wider">
                    {c.upstream} · PR #{c.pullRequest}
                  </p>
                </div>
                <a
                  href={c.pullRequestUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="retro-btn text-sm shrink-0"
                >
                  View PR
                </a>
              </div>
              <hr className="retro-rule" />
              <p className="text-base">{c.summary}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {c.stack.map((s) => (
                  <span key={s} className="retro-tag dim text-xs">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TerminalWindow>

      <TerminalWindow title="EXPLORATIONS" icon="folder">
        <p className="text-dim mb-4 text-lg">
          Software and projects I've cloned, studied, tested or modified while learning.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {explorations.map((e) => (
            <div key={e.name} className="retro-box">
              <h3 className="font-bold text-base">{e.name}</h3>
              <p className="text-dim text-xs uppercase tracking-wider mt-1">
                [{e.category.join(" / ")}]
              </p>
              <p className="text-sm mt-1">{e.note}</p>
              <a
                href={e.upstream}
                target="_blank"
                rel="noreferrer"
                className="retro-btn text-xs mt-3 w-fit"
              >
                Upstream project
              </a>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}