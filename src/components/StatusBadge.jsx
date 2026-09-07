const VARIANTS = {
  ACTIVE: "text-crt-bg",
  BUILDING: "",
  EXPLORING: "",
  PLANNED: "",
  ARCHIVED: "text-dim",
};

export default function StatusBadge({ status }) {
  const normalized = String(status || "").toUpperCase();
  const dim = ["ARCHIVED", "PLANNED"].includes(normalized);
  return (
    <span className={`retro-tag text-xs tracking-widest ${dim ? "dim" : ""} ${VARIANTS[normalized] || ""}`}>
      {normalized}
    </span>
  );
}