import Link from "next/link";

export const metadata = {
  title: "Portfolio | Exploring Space",
  description:
    "Portfolio di Andrea Castellazzo: progetti visuali, 3D, video, fotografia, branding, web e comunicazione.",
};

const mediaTechniques = [
  {
    label: "3D",
    href: "/portfolio/media/3d",
    text: "Render, animazioni, visualizzazioni tecniche.",
    icon: "cube",
    accent: "red",
  },
  {
    label: "Fotografia",
    href: "/portfolio/media/fotografia",
    text: "Reportage, prodotti, eventi, luoghi.",
    icon: "camera",
    accent: "blue",
  },
  {
    label: "Video",
    href: "/portfolio/media/video",
    text: "Showreel, eventi, live, contenuti narrativi.",
    icon: "play",
    accent: "yellow",
  },
  {
    label: "Web interattivo",
    href: "/portfolio/media/visualizzazioni-web-interattive",
    text: "Pagine progetto, portfolio, esperienze scroll.",
    icon: "web",
    accent: "blue",
  },
];

const projects = [
  {
    date: "2026",
    title: "Visualizzazione 3D Artemis II",
    slug: "artemis-ii",
    client: "Exploring Space",
    role: "3D · Animazione · Web experience",
    summary: "Una visualizzazione narrativa della missione Artemis II.",
    tags: ["3D", "Spazio", "Animazione", "Web"],
    accent: "red",
    icon: "orbit",
    isReady: true,
    featured: true,
  },
  {
    date: "2026",
    title: "ReFrame Showreel — The Movie",
    slug: "reframe-showreel-the-movie",
    collaboration: "In collaborazione con ReFrame",
    client: "ReFrame",
    role: "Video · Produzione · Regia",
    summary: "Uno showreel costruito come un piccolo film aziendale.",
    tags: ["Video", "Brand", "Team", "Showreel"],
    accent: "blue",
    icon: "play",
    isReady: true,
    featured: true,
  },
  {
    date: "2025",
    title: "Diario fotografico Barcolana 57",
    slug: "barcolana-57",
    client: "Ippocampo / progetto personale",
    role: "Fotografia · Reportage · Vela",
    summary: "Un racconto fotografico da bordo, tra regata e diario personale.",
    tags: ["Foto", "Vela", "Reportage"],
    accent: "red",
    icon: "camera",
  },
  {
    date: "2025",
    title: "Ristorante estivo con Food Truck",
    slug: "ristorante-estivo-food-truck",
    client: "Ristorante estivo",
    role: "Gestione · Comunicazione · Contenuti",
    summary: "Comunicazione, operatività, contenuti e organizzazione sul campo.",
    tags: ["Food", "Social", "Gestione"],
    accent: "blue",
    icon: "grid",
  },
  {
    date: "2025",
    title: "Francesco Gennari — Live integrale",
    slug: "francesco-gennari-teatro-borsoni",
    client: "Francesco Gennari / Teatro Borsoni",
    role: "Video live · Ripresa · Montaggio",
    summary: "Registrazione integrale di un evento live teatrale.",
    tags: ["Video", "Live", "Musica"],
    accent: "yellow",
    icon: "play",
  },
  {
    date: "2025",
    title: "Concerti in Cripta — Alchemist Quartet",
    slug: "concerti-in-cripta-alchemist-quartet",
    client: "Associazione Arnaldo da Brescia",
    role: "Video live · Evento · Montaggio",
    summary: "Ripresa video in un contesto architettonico e musicale particolare.",
    tags: ["Video", "Evento", "Cultura"],
    accent: "red",
    icon: "play",
  },
  {
    date: "2024",
    title: "Lido Street Food Restaurant",
    slug: "lido-street-food-restaurant",
    collaboration: "In collaborazione con Kitchen srl",
    client: "Lido Street Food Restaurant",
    role: "Branding · Grafica · Comunicazione",
    summary: "Identità visiva, materiali grafici e comunicazione food.",
    tags: ["Brand", "Food", "Grafica"],
    accent: "blue",
    icon: "brand",
  },
  {
    date: "2020—2024",
    title: "WeLoveCastello",
    slug: "welovecastello-marketing-gestione-ristorante",
    collaboration: "In collaborazione con Kitchen srl",
    client: "WeLoveCastello / Brescia",
    role: "Marketing · Gestione · Contenuti",
    summary: "Gestione e comunicazione continuativa di un progetto ristorativo.",
    tags: ["Food", "Marketing", "Gestione"],
    accent: "yellow",
    icon: "grid",
  },
];

const featuredProjects = projects.filter((project) => project.featured);
const archiveProjects = projects.filter((project) => !project.featured);

function accentColor(color) {
  if (color === "red") return "bg-red-600";
  if (color === "blue") return "bg-blue-600";
  if (color === "yellow") return "bg-yellow-400";
  return "bg-[#e8e3d6]";
}

function accentText(color) {
  if (color === "red") return "text-red-400";
  if (color === "blue") return "text-blue-400";
  if (color === "yellow") return "text-yellow-300";
  return "text-[#e8e3d6]";
}

function AccentMark({ color = "red", dark = false }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-px w-10 ${dark ? "bg-[#11100d]/20" : "bg-[#e8e3d6]/18"}`}
      />
      <span className={`h-2 w-2 ${accentColor(color)}`} />
    </div>
  );
}

function SectionLabel({ children, color = "red" }) {
  return (
    <div className="mb-4 flex items-center gap-5">
      <p className="text-[10px] uppercase tracking-[0.35em] text-[#e8e3d6]/35 md:text-xs">
        {children}
      </p>

      <AccentMark color={color} />
    </div>
  );
}

function TagList({ items, compact = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`max-w-full border border-[#e8e3d6]/12 bg-[#e8e3d6]/[0.025] uppercase leading-none text-[#e8e3d6]/58 ${
            compact
              ? "px-2.5 py-1.5 text-[8px] tracking-[0.14em] sm:tracking-[0.16em]"
              : "px-3 py-2 text-[9px] tracking-[0.16em] md:px-4 md:text-[10px] md:tracking-[0.18em]"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function PortfolioIcon({ type }) {
  const common =
    "h-8 w-8 stroke-current stroke-[1.7] transition duration-300 group-hover:scale-110 md:h-9 md:w-9";

  if (type === "cube") {
    return (
      <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 5 41 14.5v19L24 43 7 33.5v-19L24 5Z" />
        <path d="M7 14.5 24 24l17-9.5" />
        <path d="M24 24v19" />
      </svg>
    );
  }

  if (type === "camera") {
    return (
      <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M8 16h8l3-5h10l3 5h8v22H8V16Z" />
        <path d="M24 33a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
      </svg>
    );
  }

  if (type === "play") {
    return (
      <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M10 9h28v30H10V9Z" />
        <path d="M21 18v12l10-6-10-6Z" />
      </svg>
    );
  }

  if (type === "web") {
    return (
      <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M7 11h34v26H7V11Z" />
        <path d="M7 18h34" />
        <path d="M15 25h10" />
        <path d="M15 31h18" />
      </svg>
    );
  }

  if (type === "brand") {
    return (
      <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 6 38 14v20l-14 8-14-8V14l14-8Z" />
        <path d="M18 17h12v14H18z" />
        <path d="M18 24h12" />
      </svg>
    );
  }

  if (type === "orbit") {
    return (
      <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 29a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path d="M7 25c5.5-9 17-15 27-12 7 2 8.5 8.5 3 14.5S20.5 40 10.5 35c-5-2.5-5.8-6.6-3.5-10Z" />
        <path d="M13 12c9 1 20 9 24 18" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M9 9h12v12H9V9Z" />
      <path d="M27 9h12v12H27V9Z" />
      <path d="M9 27h12v12H9V27Z" />
      <path d="M27 27h12v12H27V27Z" />
    </svg>
  );
}

function TechniqueCard({ technique }) {
  return (
    <Link
      href={technique.href}
      aria-label={`Apri sezione ${technique.label}`}
      className="group block bg-[#11100d] p-5 transition duration-300 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60 md:p-6"
    >
      <div className="flex items-start justify-between gap-5">
        <div
          className={`${accentText(
            technique.accent
          )} transition group-hover:text-[#11100d]`}
        >
          <PortfolioIcon type={technique.icon} />
        </div>

        <span className={`h-2 w-2 shrink-0 ${accentColor(technique.accent)}`} />
      </div>

      <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.045em] md:text-3xl">
        {technique.label}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#e8e3d6]/50 transition group-hover:text-[#11100d]/62">
        {technique.text}
      </p>
    </Link>
  );
}

function FeaturedProjectCard({ project, index }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      aria-label={`Apri progetto ${project.title}`}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
    >
      <article className="grid h-full gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 transition group-hover:border-[#e8e3d6]/25 md:grid-cols-[0.72fr_1.28fr]">
        <div className="flex min-h-[150px] flex-col justify-between bg-[#11100d] p-5 transition duration-300 group-hover:bg-[#e8e3d6] group-hover:text-[#11100d] sm:min-h-[180px] md:min-h-[230px] md:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#e8e3d6]/30 transition group-hover:text-[#11100d]/38">
                {String(index + 1).padStart(2, "0")}
              </p>

              <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-[#e8e3d6]/42 transition group-hover:text-[#11100d]/50">
                {project.date}
              </p>
            </div>

            <div
              className={`${accentText(
                project.accent
              )} transition group-hover:text-[#11100d]`}
            >
              <PortfolioIcon type={project.icon} />
            </div>
          </div>

          <div className="mt-8 md:mt-0">
            <p className="mb-3 text-[9px] uppercase tracking-[0.24em] text-[#e8e3d6]/36 transition group-hover:text-[#11100d]/42">
              Progetto aperto
            </p>

            <span className={`block h-2 w-2 ${accentColor(project.accent)}`} />
          </div>
        </div>

        <div className="bg-[#11100d] p-5 transition duration-300 group-hover:bg-[#e8e3d6] group-hover:text-[#11100d] md:p-7">
          {project.collaboration && (
            <p className="mb-4 inline-flex max-w-full border border-blue-400/35 bg-blue-400/10 px-3 py-1.5 text-[9px] uppercase leading-relaxed tracking-[0.18em] text-blue-300/85 transition group-hover:border-[#11100d]/18 group-hover:bg-[#11100d]/[0.04] group-hover:text-[#11100d]/56 sm:tracking-[0.22em]">
              {project.collaboration}
            </p>
          )}

          <p className="text-[10px] uppercase leading-relaxed tracking-[0.24em] text-[#e8e3d6]/35 transition group-hover:text-[#11100d]/42 sm:tracking-[0.28em]">
            {project.client}
          </p>

          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,9vw,3rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
            {project.title}
          </h2>

          <p className="mt-5 text-sm font-semibold leading-relaxed text-[#e8e3d6]/74 transition group-hover:text-[#11100d]/76 md:text-base">
            {project.role}
          </p>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#e8e3d6]/50 transition group-hover:text-[#11100d]/60">
            {project.summary}
          </p>

          <div className="mt-6">
            <TagList items={project.tags} compact />
          </div>
        </div>
      </article>
    </Link>
  );
}

function ArchiveProjectCard({ project, index }) {
  const inner = (
    <article className="group flex h-full min-h-[260px] flex-col justify-between bg-[#11100d] p-5 transition duration-300 hover:bg-[#e8e3d6] hover:text-[#11100d] md:min-h-[300px] md:p-6">
      <div>
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#e8e3d6]/28 transition group-hover:text-[#11100d]/38">
              {String(index + 1).padStart(2, "0")}
            </p>

            <p className="mt-3 text-[10px] uppercase leading-relaxed tracking-[0.22em] text-[#e8e3d6]/42 transition group-hover:text-[#11100d]/48 sm:tracking-[0.24em]">
              {project.date}
            </p>
          </div>

          <div
            className={`${accentText(
              project.accent
            )} transition group-hover:text-[#11100d]`}
          >
            <PortfolioIcon type={project.icon} />
          </div>
        </div>

        <p className="mt-7 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#e8e3d6]/34 transition group-hover:text-[#11100d]/42 sm:tracking-[0.24em]">
          {project.client}
        </p>

        <h3 className="mt-4 text-[clamp(1.65rem,7vw,2rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
          {project.title}
        </h3>

        <p className="mt-4 text-sm font-semibold leading-relaxed text-[#e8e3d6]/70 transition group-hover:text-[#11100d]/74">
          {project.role}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-[#e8e3d6]/48 transition group-hover:text-[#11100d]/60">
          {project.summary}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-5">
        <TagList items={project.tags} compact />

        <span className={`h-2 w-2 shrink-0 ${accentColor(project.accent)}`} />
      </div>
    </article>
  );

  if (project.isReady) {
    return (
      <Link
        href={`/portfolio/${project.slug}`}
        aria-label={`Apri progetto ${project.title}`}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
      >
        {inner}
      </Link>
    );
  }

  return <div className="h-full">{inner}</div>;
}

export default function PortfolioPage() {
  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[#11100d] px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-[calc(6.5rem+env(safe-area-inset-top))] text-[#e8e3d6] sm:px-5 md:px-10 md:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pt-[calc(8rem+env(safe-area-inset-top))] lg:px-16">
      <section className="mx-auto w-full max-w-7xl">
        {/* HERO */}
        <section className="border-b border-[#e8e3d6]/10 pb-10 md:pb-12">
          <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
            <div>
              <SectionLabel color="yellow">Portfolio</SectionLabel>

              <h1 className="text-[clamp(3rem,14vw,6rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
                Progetti, immagini e sistemi visivi.
              </h1>
            </div>

            <div className="border border-[#e8e3d6]/10 bg-[#e8e3d6]/[0.025] p-5 md:p-7">
              <p className="text-xl font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/82 md:text-3xl">
                Una selezione breve, leggibile e diretta.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#e8e3d6]/55 md:text-base">
                3D, video, fotografia, branding, web e comunicazione. Qui trovi
                lavori diversi, ma uniti dallo stesso obiettivo: rendere un
                progetto più chiaro, forte e riconoscibile.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="mt-10">
          <SectionLabel color="red">In evidenza</SectionLabel>

          <div className="grid gap-4 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* MEDIA SHORTCUTS */}
        <section className="mt-12 border-b border-[#e8e3d6]/10 pb-12">
          <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel color="blue">Media</SectionLabel>

              <h2 className="max-w-3xl text-[clamp(2rem,8vw,3rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
                Esplora per linguaggio.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[#e8e3d6]/50 md:text-base">
              Una lettura trasversale: non per progetto, ma per tipo di
              contenuto.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 sm:grid-cols-2 lg:grid-cols-4">
            {mediaTechniques.map((technique) => (
              <TechniqueCard key={technique.href} technique={technique} />
            ))}
          </div>
        </section>

        {/* ARCHIVE */}
        <section className="mt-12">
          <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel color="yellow">Archivio</SectionLabel>

              <h2 className="max-w-3xl text-[clamp(2rem,8vw,3rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
                Altri progetti.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[#e8e3d6]/50 md:text-base">
              Alcuni sono già navigabili, altri diventeranno pagine progetto
              dedicate.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 md:grid-cols-2 xl:grid-cols-3">
            {archiveProjects.map((project, index) => (
              <ArchiveProjectCard
                key={project.slug}
                project={project}
                index={index + featuredProjects.length}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 border border-[#e8e3d6]/10 bg-[#e8e3d6] p-6 text-[#11100d] md:p-8 lg:p-10">
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#11100d]/42">
                Prossimo progetto
              </p>

              <h2 className="mt-7 text-[clamp(2.4rem,10vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
                Hai qualcosa da raccontare meglio?
              </h2>
            </div>

            <div>
              <p className="mb-7 text-sm leading-relaxed text-[#11100d]/62 md:text-base">
                Prodotto, servizio, evento, spazio, brand o idea: possiamo
                costruire immagini e contenuti capaci di renderlo più chiaro.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="mailto:andreacastellazzo@gmail.com"
                  className="inline-block w-full border border-[#11100d] px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#11100d] transition hover:bg-[#11100d] hover:text-[#e8e3d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/40 sm:w-auto"
                >
                  Scrivimi
                </a>

                <Link
                  href="/servizi"
                  className="inline-block w-full border border-[#11100d]/20 px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#11100d]/65 transition hover:border-[#11100d] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/30 sm:w-auto"
                >
                  Servizi
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}