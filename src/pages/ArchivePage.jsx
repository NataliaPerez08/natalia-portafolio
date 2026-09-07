import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
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
            <div key={a.name} className="retro-box">
              <h3 className="font-bold text-base break-all">{a.name}</h3>
              <p className="text-dim text-xs uppercase tracking-wider mt-1">
                [{a.category.join(" / ")}]
              </p>
              <p className="text-sm mt-1">{a.summary}</p>
              <a
                href={a.repository}
                target="_blank"
                rel="noreferrer"
                className="retro-btn text-xs mt-3 w-fit"
              >
                Repo
              </a>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}