import Link from "next/link";

export const metadata = {
  title: "Servizi | Exploring Space",
  description:
    "Servizi visuali di Andrea Castellazzo: 3D, foto, video, branding, web, social, presentazioni e direzione visiva.",
};

const services = [
  {
    title: "3D",
    text: "Render, animazioni, prodotti, spazi, concept e visualizzazioni tecniche.",
    icon: "cube",
    accent: "red",
  },
  {
    title: "Foto",
    text: "Immagini per brand, eventi, prodotti, luoghi, persone e contenuti digitali.",
    icon: "camera",
    accent: "blue",
  },
  {
    title: "Video",
    text: "Riprese, montaggio, showreel, contenuti social, eventi e racconti di progetto.",
    icon: "play",
    accent: "yellow",
  },
  {
    title: "Brand",
    text: "Identità visiva, loghi, sistemi grafici, menù, materiali e comunicazione.",
    icon: "brand",
    accent: "red",
  },
  {
    title: "Web",
    text: "Siti, landing page, portfolio, pagine progetto e presentazioni interattive.",
    icon: "web",
    accent: "blue",
  },
  {
    title: "Social",
    text: "Contenuti, grafiche, piani visivi, campagne e presenza digitale coerente.",
    icon: "grid",
    accent: "yellow",
  },
  {
    title: "Presentazioni",
    text: "Deck, impaginati, visual storytelling e materiali commerciali chiari.",
    icon: "slides",
    accent: "red",
  },
  {
    title: "Direzione visiva",
    text: "Scelte estetiche, tono, coerenza, priorità e struttura del racconto.",
    icon: "direction",
    accent: "blue",
  },
];

const projectSystem = [
  "Identità visiva",
  "Logo",
  "Menù",
  "Foto",
  "Video",
  "Social",
  "Sito web",
  "Google Business",
  "Campagne",
  "Materiali stampa",
  "Render",
  "Organizzazione",
];

const formats = [
  "Prodotti",
  "Spazi",
  "Eventi",
  "Ristorazione",
  "Brand",
  "Portfolio",
  "Lanci",
  "Campagne",
  "Social",
  "Presentazioni",
  "Render",
  "Video",
];

const tools = [
  "Adobe Creative Suite",
  "Blender",
  "Cinema 4D",
  "V-Ray",
  "Meta Ads",
  "Google Business",
  "AI tools",
  "Web design",
];

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

function TagList({ items, dark = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={
            dark
              ? "max-w-full border border-[#11100d]/12 bg-[#11100d]/[0.035] px-3 py-2 text-[9px] uppercase leading-none tracking-[0.14em] text-[#11100d]/62 md:px-4 md:text-[10px] md:tracking-[0.16em]"
              : "max-w-full border border-[#e8e3d6]/12 bg-[#e8e3d6]/[0.025] px-3 py-2 text-[9px] uppercase leading-none tracking-[0.14em] text-[#e8e3d6]/62 md:px-4 md:text-[10px] md:tracking-[0.16em]"
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ServiceIcon({ type }) {
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

  if (type === "brand") {
    return (
      <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 6 38 14v20l-14 8-14-8V14l14-8Z" />
        <path d="M18 17h12v14H18z" />
        <path d="M18 24h12" />
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

  if (type === "grid") {
    return (
      <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M9 9h12v12H9V9Z" />
        <path d="M27 9h12v12H27V9Z" />
        <path d="M9 27h12v12H9V27Z" />
        <path d="M27 27h12v12H27V27Z" />
      </svg>
    );
  }

  if (type === "slides") {
    return (
      <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M8 10h32v22H8V10Z" />
        <path d="M16 39h16" />
        <path d="M24 32v7" />
        <path d="M15 18h18" />
        <path d="M15 24h11" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 24h32" />
      <path d="M30 14 40 24 30 34" />
      <path d="M8 14v20" />
    </svg>
  );
}

function ServiceCard({ service, index }) {
  return (
    <article className="group flex min-h-[235px] flex-col justify-between bg-[#11100d] p-5 transition duration-300 hover:bg-[#e8e3d6] hover:text-[#11100d] md:min-h-[260px] md:p-6">
      <div>
        <div className="flex items-start justify-between gap-5">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#e8e3d6]/28 transition group-hover:text-[#11100d]/38">
            {String(index + 1).padStart(2, "0")}
          </p>

          <div
            className={`${accentText(
              service.accent
            )} transition group-hover:text-[#11100d]`}
          >
            <ServiceIcon type={service.icon} />
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-5">
          <h2 className="text-[clamp(1.85rem,8vw,2.25rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
            {service.title}
          </h2>

          <span className={`h-2 w-2 shrink-0 ${accentColor(service.accent)}`} />
        </div>
      </div>

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#e8e3d6]/52 transition group-hover:text-[#11100d]/62">
        {service.text}
      </p>
    </article>
  );
}

function MiniSystemCard({ label, index }) {
  const colors = ["bg-red-600", "bg-blue-600", "bg-yellow-400"];
  const color = colors[index % colors.length];

  return (
    <div className="group flex min-h-[52px] items-center justify-between gap-4 border border-[#e8e3d6]/10 bg-[#11100d] px-4 py-3 transition hover:border-[#e8e3d6]/22 hover:bg-[#e8e3d6] hover:text-[#11100d]">
      <span className="text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[#e8e3d6]/62 transition group-hover:text-[#11100d]/70 md:tracking-[0.2em]">
        {label}
      </span>

      <span className={`h-2 w-2 shrink-0 ${color}`} />
    </div>
  );
}

export default function ServiziPage() {
  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[#11100d] px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-[calc(6.5rem+env(safe-area-inset-top))] text-[#e8e3d6] sm:px-5 md:px-10 md:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pt-[calc(8rem+env(safe-area-inset-top))] lg:px-16">
      <section className="mx-auto w-full max-w-7xl">
        {/* HERO */}
        <section className="border-b border-[#e8e3d6]/10 pb-10 md:pb-12">
          <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
            <div>
              <SectionLabel color="red">Servizi</SectionLabel>

              <h1 className="text-[clamp(3rem,14vw,6rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
                Immagini, contenuti e sistemi visivi.
              </h1>
            </div>

            <div className="border border-[#e8e3d6]/10 bg-[#e8e3d6]/[0.025] p-5 md:p-7">
              <p className="text-xl font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/82 md:text-3xl">
                Dal singolo contenuto a un progetto completo.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#e8e3d6]/55 md:text-base">
                3D, foto, video, identità, web e comunicazione. Il punto è
                costruire materiali chiari, riconoscibili e utili a vendere,
                spiegare o far percepire meglio un progetto.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICE GRID */}
        <section className="mt-10 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </section>

        {/* PROJECT SYSTEM */}
        <section className="mt-12 border-b border-[#e8e3d6]/10 pb-12">
          <div className="grid gap-8 md:grid-cols-[0.86fr_1.14fr] md:items-start">
            <div>
              <SectionLabel color="yellow">Progetti integrati</SectionLabel>

              <h2 className="max-w-3xl text-[clamp(2rem,8vw,3rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
                Non solo “un logo” o “un video”.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#e8e3d6]/55 md:text-base">
                Posso seguire un progetto anche in modo più ampio: identità,
                materiali, contenuti, sito, comunicazione e presenza reale.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 xs:grid-cols-2 sm:grid-cols-3">
              {projectSystem.map((item, index) => (
                <MiniSystemCard key={item} label={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* FORMATS + TOOLS */}
        <section className="grid gap-8 border-b border-[#e8e3d6]/10 py-12 md:grid-cols-2">
          <div>
            <SectionLabel color="blue">Ambiti</SectionLabel>

            <h2 className="max-w-2xl text-[clamp(2rem,8vw,3rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              Dove posso entrare.
            </h2>

            <div className="mt-7">
              <TagList items={formats} />
            </div>
          </div>

          <div>
            <SectionLabel color="red">Strumenti</SectionLabel>

            <h2 className="max-w-2xl text-[clamp(2rem,8vw,3rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              Con cosa lavoro.
            </h2>

            <div className="mt-7">
              <TagList items={tools} />
            </div>
          </div>
        </section>

        {/* COMPACT VALUE STRIP */}
        <section className="grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 md:grid-cols-3">
          <article className="bg-[#11100d] p-5 md:p-7">
            <p className="text-[10px] uppercase tracking-[0.32em] text-red-400">
              01
            </p>

            <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.045em]">
              Chiarezza
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#e8e3d6]/52">
              Far capire subito cosa fai, cosa vendi e perché conta.
            </p>
          </article>

          <article className="bg-[#11100d] p-5 md:p-7">
            <p className="text-[10px] uppercase tracking-[0.32em] text-blue-400">
              02
            </p>

            <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.045em]">
              Percezione
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#e8e3d6]/52">
              Rendere il progetto più solido, curato e riconoscibile.
            </p>
          </article>

          <article className="bg-[#11100d] p-5 md:p-7">
            <p className="text-[10px] uppercase tracking-[0.32em] text-yellow-300">
              03
            </p>

            <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.045em]">
              Uso reale
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#e8e3d6]/52">
              Contenuti pronti per sito, social, presentazioni e vendita.
            </p>
          </article>
        </section>

        {/* TRUST NETWORK */}
        <section className="mt-12 border border-[#e8e3d6]/10 bg-[#e8e3d6]/[0.025] px-5 py-10 text-center md:px-10 md:py-14">
          <div className="mx-auto mb-6 flex w-fit max-w-full items-center gap-3 sm:gap-4">
            <span className="h-2 w-2 shrink-0 bg-red-600" />
            <span className="h-px w-8 bg-[#e8e3d6]/16 sm:w-12" />
            <span className="h-2 w-2 shrink-0 bg-blue-600" />
            <span className="h-px w-8 bg-[#e8e3d6]/16 sm:w-12" />
            <span className="h-2 w-2 shrink-0 bg-yellow-400" />
          </div>

          <p className="mx-auto max-w-4xl text-[clamp(1.75rem,8vw,3rem)] font-semibold leading-tight tracking-[-0.045em] text-[#e8e3d6]/88">
            dove non arrivo da solo, arrivano i miei contatti di fiducia
            sviluppati negli anni.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 border border-[#e8e3d6]/10 bg-[#e8e3d6] p-6 text-[#11100d] md:p-8 lg:p-10">
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#11100d]/42">
                Nuovo progetto
              </p>

              <h2 className="mt-7 text-[clamp(2.4rem,10vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
                Hai bisogno di immagini più chiare?
              </h2>
            </div>

            <div>
              <p className="mb-7 text-sm leading-relaxed text-[#11100d]/62 md:text-base">
                Prodotto, servizio, spazio, evento, brand o idea: possiamo
                costruire il formato giusto per raccontarlo meglio.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="mailto:andreacastellazzo@gmail.com"
                  className="inline-block w-full border border-[#11100d] px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#11100d] transition hover:bg-[#11100d] hover:text-[#e8e3d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/40 sm:w-auto"
                >
                  Scrivimi
                </a>

                <Link
                  href="/portfolio"
                  className="inline-block w-full border border-[#11100d]/20 px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#11100d]/65 transition hover:border-[#11100d] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/30 sm:w-auto"
                >
                  Guarda il portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}