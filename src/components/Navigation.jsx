import { NavLink } from "react-router-dom";

export const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/homelab", label: "Lab" },
  { to: "/experiments", label: "Experiments" },
  { to: "/open-source", label: "OSS" },
  { to: "/about", label: "About" },
];

const linkClass = ({ isActive }) =>
  `px-2 whitespace-nowrap uppercase tracking-wider ${isActive ? "bg-crt-fg text-crt-bg" : "hover:bg-crt-fg hover:text-crt-bg"}`;

export function Navigation({ className = "" }) {
  return (
    <nav className={className} aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === "/"} className={linkClass}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function MobileNavigation() {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            `retro-btn text-sm uppercase ${isActive ? "bg-crt-fg text-crt-bg" : ""}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;