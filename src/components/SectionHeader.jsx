export default function SectionHeader({ title, file, icon, description }) {
  return (
    <div className="mt-3 md:mt-6 mb-4">
      <p className="text-dim text-sm tracking-widest uppercase">
        {file ? `> ${file}` : "> SECTION"}
      </p>
      <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight flex items-center gap-3">
        {icon && <span aria-hidden="true">{icon}</span>}
        {title}
      </h1>
      {description && <p className="text-dim text-lg mt-2 max-w-3xl">{description}</p>}
      <div className="retro-rule-solid mt-3 mb-0" />
    </div>
  );
}