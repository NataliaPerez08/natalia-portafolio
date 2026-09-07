import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import Icon from "../components/icons.jsx";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <SectionHeader title="About" file="about.txt" icon={<Icon name="user" />} />
      <TerminalWindow title="ABOUT.TXT" icon="user">
        <p className="text-lg leading-relaxed max-w-3xl">
          Highly skilled and driven computer scientist with expertise in software development, algorithm design,
          cloud computing, and operating systems. Passionate about innovation and applying strong CS fundamentals
          across network security, distributed systems, data science, and AI to design scalable, efficient, and
          secure systems.
        </p>
      </TerminalWindow>
    </div>
  );
}