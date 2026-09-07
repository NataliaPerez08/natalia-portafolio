import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mt-6">
      <div className="retro-window p-6 md:p-8">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">404</h1>
        <p className="text-dim text-lg mt-2">SEGMENTATION FAULT — page not found.</p>
        <hr className="retro-rule" />
        <p className="text-base">
          The requested address does not exist. The system has been restored.
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          <Link to="/" className="retro-btn">RETURN TO HOME</Link>
        </div>
      </div>
    </div>
  );
}