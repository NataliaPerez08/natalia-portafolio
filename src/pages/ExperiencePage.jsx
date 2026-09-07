import TerminalWindow from "../components/TerminalWindow.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import Icon from "../components/icons.jsx";
import { experience, education, skills, certifications } from "../data/index.js";

export default function ExperiencePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Experience"
        file="experience.log"
        icon={<Icon name="briefcase" />}
        description="Where I've worked and what I've taught."
      />

      <TerminalWindow title="EXPERIENCE.LOG" icon="briefcase">
        <div className="space-y-4">
          {experience.map((job) => (
            <div key={job.role + job.org} className="retro-box">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold">{job.role}</h3>
                  <p className="text-dim">{job.org} • {job.location}</p>
                </div>
                <p className="text-dim md:text-right shrink-0">{job.date}</p>
              </div>
              <hr className="retro-rule" />
              <ul className="retro-list space-y-1 text-base">
                {job.bullets.map((b, i) => (<li key={i}>{b}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </TerminalWindow>

      <TerminalWindow title="EDUCATION.REC" icon="graduation">
        <div className="space-y-4">
          {education.map((e) => (
            <div key={e.title} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 retro-box">
              <div>
                <h3 className="text-lg font-bold">{e.title}</h3>
                <p className="text-dim">{e.org} • {e.location}</p>
              </div>
              <p className="text-dim md:text-right shrink-0">{e.date}</p>
            </div>
          ))}
        </div>
      </TerminalWindow>

      <TerminalWindow title="TECHNICAL.DAT" icon="code">
        <div className="space-y-4">
          {skills.technical.map((group) => (
            <div key={group.title}>
              <p className="text-dim text-sm mb-2 uppercase tracking-wider">[{group.title}]</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="retro-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TerminalWindow>

      <TerminalWindow title="CERTIFICATIONS.DB" icon="award">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {certifications.map((c, idx) => (
            <div key={idx} className="retro-box flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base leading-tight">{c.name}</h4>
                <p className="text-dim text-sm mt-1">{c.issuer}</p>
              </div>
              <p className="text-xs text-dim mt-3">ISSUED: {c.date}</p>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}