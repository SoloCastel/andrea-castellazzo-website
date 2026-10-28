import ArtemisProjectPage from "../../../components/portfolio/project-pages/ArtemisProjectPage";
import ReFrameProjectPage from "../../../components/portfolio/project-pages/ReFrameProjectPage";
import PlaceholderProjectPage from "../../../components/portfolio/project-pages/PlaceholderProjectPage";

const projects = {
  "artemis-ii": {
    title: "Artemis II | Portfolio | Exploring Space",
    description:
      "Visualizzazione 3D e presentazione interattiva della missione Artemis II.",
    component: ArtemisProjectPage,
  },
  "reframe-showreel-the-movie": {
    title: "ReFrame Showreel — The Movie | Portfolio | Exploring Space",
    description:
      "Pagina progetto dedicata allo showreel narrativo realizzato in collaborazione con ReFrame.",
    component: ReFrameProjectPage,
  },
};

function normalizeSlug(slug) {
  if (!slug) return "";

  if (Array.isArray(slug)) {
    return slug.join("/");
  }

  return String(slug);
}

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = normalizeSlug(resolvedParams?.slug);
  const project = projects[slug];

  if (!project) {
    return {
      title: "Progetto portfolio | Exploring Space",
      description:
        "Pagina progetto del portfolio Exploring Space di Andrea Castellazzo.",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const slug = normalizeSlug(resolvedParams?.slug);
  const project = projects[slug];

  if (!project) {
    return <PlaceholderProjectPage slug={slug} />;
  }

  const ProjectComponent = project.component;

  return <ProjectComponent />;
}