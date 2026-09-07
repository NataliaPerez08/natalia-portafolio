import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import Icon from "../components/icons.jsx";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/natalia-abigail-perez-romero-napr08/" },
  { label: "GitHub", href: "https://github.com/NataliaPerez08" },
  { label: "Email", href: "mailto:nataliapr08@gmail.com" },
];

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Contact"
        file="contact.addr"
        icon={<Icon name="mail" />}
        description="Ways to reach me."
      />

      <TerminalWindow title="CONTACT.ADDR" icon="mail">
        <div className="grid md:grid-cols-3 gap-4">
          {socialLinks.map((s) => (
            <div key={s.label} className="retro-box">
              <p className="text-sm text-dim mb-2 uppercase tracking-wider">[{s.label}]</p>
              <a href={s.href} target="_blank" rel="noreferrer" className="break-all text-sm">
                {s.href}
              </a>
            </div>
          ))}
        </div>
        <p className="text-sm text-dim mt-6">Prefer WhatsApp? Add: +52 55 85 75 16 53</p>
      </TerminalWindow>
    </div>
  );
}