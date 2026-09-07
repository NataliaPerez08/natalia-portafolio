import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ExperimentCard from "../components/ExperimentCard.jsx";
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
            <ExperimentCard key={e.slug} experiment={e} />
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}