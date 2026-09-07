import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ArchiveCard from "../components/ArchiveCard.jsx";
import Icon from "../components/icons.jsx";
import { archive } from "../data/index.js";

export default function ArchivePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Academic Archive"
        file="archive.dir"
        icon={<Icon name="graduation" />}
        description="University work — kept for reference, not as a headline."
      />

      <TerminalWindow title="ARCHIVE.DIR" icon="folder">
        <div className="grid md:grid-cols-2 gap-3">
          {archive.map((a) => (
            <ArchiveCard key={a.name} entry={a} />
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}