import Icon from "./icons.jsx";

export default function TerminalWindow({ title, children, className = "", variant = "default", icon }) {
  const variantClass =
    variant === "inverse" ? "inverse" : variant === "plain" ? "plain" : "";
  return (
    <div className={`retro-window ${className}`}>
      <div className={`retro-title-bar ${variantClass}`}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-3 h-3 border-2 border-current shrink-0" aria-hidden="true" />
          {icon && <span className="shrink-0"><Icon name={icon} /></span>}
          <span className="font-bold tracking-widest uppercase text-sm md:text-base truncate">{title}</span>
        </div>
        <div className="w-3 h-3 border-2 border-current shrink-0" aria-hidden="true" />
      </div>
      <div className="p-4 md:p-5">{children}</div>
    </div>
  );
}