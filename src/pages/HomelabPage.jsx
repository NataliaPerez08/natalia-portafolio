import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import Icon from "../components/icons.jsx";
import { homelab } from "../data/index.js";

const AREAS = [
  { key: "compute", label: "Compute", icon: "chip" },
  { key: "networking", label: "Networking", icon: "server" },
  { key: "containers", label: "Containers", icon: "code" },
  { key: "storage", label: "Storage", icon: "folder" },
  { key: "observability", label: "Observability", icon: "award" },
  { key: "ai", label: "AI Infrastructure", icon: "chip" },
  { key: "iac", label: "Infrastructure as Code", icon: "code" },
];

export default function HomelabPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Homelab"
        file="homelab.map"
        icon={<Icon name="server" />}
        description="The real infrastructure I run, self-host and experiment with."
      />

      <div className="grid gap-4">
        {AREAS.map((area) => (
          <TerminalWindow key={area.key} title={`${area.label.toUpperCase()} // ${area.key}`} icon={area.icon}>
            <div className="grid md:grid-cols-2 gap-3">
              {homelab[area.key].map((node) => (
                <div key={node.name} className="retro-box">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-lg">{node.name}</h3>
                    <StatusBadge status={node.status} />
                  </div>
                  <p className="text-dim text-sm uppercase tracking-wider">{node.role}</p>
                  <p className="text-base mt-1">{node.detail}</p>
                </div>
              ))}
            </div>
          </TerminalWindow>
        ))}
      </div>
    </div>
  );
}