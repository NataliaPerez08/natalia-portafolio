import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ContributionCard from "../components/ContributionCard.jsx";
import ExplorationCard from "../components/ExplorationCard.jsx";
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
            <ContributionCard key={i} contribution={c} />
          ))}
        </div>
      </TerminalWindow>

      <TerminalWindow title="EXPLORATIONS" icon="folder">
        <p className="text-dim mb-4 text-lg">
          Software and projects I've cloned, studied, tested or modified while learning.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {explorations.map((e) => (
            <ExplorationCard key={e.name} exploration={e} />
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}