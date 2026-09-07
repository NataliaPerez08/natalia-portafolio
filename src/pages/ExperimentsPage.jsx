import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import Icon from "../components/icons.jsx";
import { experiments } from "../data/index.js";

export default function ExperimentsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Experiments"
        file="experiments.log"
        icon={<Icon name="flask" />}
        description="Science, simulations and things I explore outside work. Not all of it works."
      />

      <TerminalWindow title="EXPERIMENTS.DIR" icon="flask">
        <div className="grid md:grid-cols-2 gap-4">
          {experiments.map((e) => (
            <div key={e.slug} className="retro-box flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-lg leading-tight">{e.name}</h3>
                <StatusBadge status={e.status} />
              </div>
              <p className="text-dim text-xs uppercase tracking-wider mt-1">
                [{e.category.join(" / ")}]
              </p>
              <p className="text-base flex-1 mt-2">{e.summary}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {e.stack.map((s) => (
                  <span key={s} className="retro-tag dim text-xs">{s}</span>
                ))}
              </div>
              {e.repository && (
                <a
                  href={e.repository}
                  target="_blank"
                  rel="noreferrer"
                  className="retro-btn text-sm mt-3 w-fit"
                >
                  Repo
                </a>
              )}
            </div>
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}