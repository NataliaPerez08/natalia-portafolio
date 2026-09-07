import { createBrowserRouter } from "react-router-dom";
import TerminalLayout from "../layouts/TerminalLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import ProjectDetailPage from "../pages/ProjectDetailPage.jsx";
import HomelabPage from "../pages/HomelabPage.jsx";
import ExperimentsPage from "../pages/ExperimentsPage.jsx";
import OpenSourcePage from "../pages/OpenSourcePage.jsx";
import ArchivePage from "../pages/ArchivePage.jsx";
import ExperiencePage from "../pages/ExperiencePage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <TerminalLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "projects", element: <ProjectsPage /> },
        { path: "projects/:slug", element: <ProjectDetailPage /> },
        { path: "homelab", element: <HomelabPage /> },
        { path: "experiments", element: <ExperimentsPage /> },
        { path: "open-source", element: <OpenSourcePage /> },
        { path: "archive", element: <ArchivePage /> },
        { path: "experience", element: <ExperiencePage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

export default router;