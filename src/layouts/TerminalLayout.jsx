import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation, MobileNavigation } from "../components/Navigation.jsx";
import TerminalWindow from "../components/TerminalWindow.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Clock() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <span className="hidden sm:inline">{time}</span>;
}

function SystemMenu() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-crt-fg bg-crt-bg">
      <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between text-base md:text-lg">
        <div className="flex items-center gap-1 overflow-hidden">
          <span className="font-bold tracking-wider px-2 shrink-0" aria-hidden="true">&gt;_</span>
          <Navigation className="hidden md:flex gap-1 overflow-x-auto" />
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden lg:inline text-dim">640K OK</span>
          <Clock />
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-crt-fg animate-pulse" aria-hidden="true" />
            ONLINE
          </span>
        </div>
      </div>
    </header>
  );
}

function Banner() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-3">
      <div className="retro-window p-3 text-center overflow-x-auto">
        <pre className="text-[10px] sm:text-xs md:text-sm leading-none whitespace-pre font-mono text-crt-fg">
{`╔══════════════════════════════════════════════════════════════════╗
║  PERSONAL TERMINAL v1.1.0 — PROFILE VIEWER                       ║
║  COPYRIGHT (C) 1983 NATALIA PÉREZ · ALL RIGHTS RESERVED          ║
╚══════════════════════════════════════════════════════════════════╝`}
        </pre>
      </div>
    </div>
  );
}

function MobileNav() {
  return (
    <div className="md:hidden max-w-7xl mx-auto px-4 pt-3">
      <TerminalWindow title="SECTIONS" variant="plain">
        <MobileNavigation />
      </TerminalWindow>
    </div>
  );
}

function StatusBar() {
  return (
    <footer className="border-t-2 border-crt-fg bg-crt-bg mt-8 py-2 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          <p>PERSONAL TERMINAL v1.1.0 — PROFILE VIEWER</p>
          <p>© {new Date().getFullYear()} Natalia Pérez · Built with ♥</p>
        </div>
        <div className="flex items-center gap-4 text-dim">
          <span>640K RAM OK</span>
          <span>CONN: 2400 BAUD</span>
          <span>TERMINAL: VT-100</span>
        </div>
      </div>
    </footer>
  );
}

export default function TerminalLayout() {
  return (
    <div className="min-h-screen bg-crt-bg text-crt-fg crt-turn-on">
      <ScrollToTop />
      <SystemMenu />
      <MobileNav />
      <main className="max-w-7xl mx-auto px-4 pb-8 space-y-6">
        <Outlet />
      </main>
      <Banner />
      <StatusBar />
    </div>
  );
}