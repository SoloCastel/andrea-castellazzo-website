import Link from "next/link";

const projectTitles = {
  "artemis-ii": "Visualizzazione 3D Artemis II",
  "reframe-showreel-the-movie": "ReFrame Showreel — The Movie",
  "gestionale-fotografia-matrimoniale":
    "Gestionale Business Fotografia Matrimoniale",
  "barcolana-57": "Diario fotografico Barcolana 57",
  "ristorante-estivo-food-truck":
    "Ristorante estivo con Food Truck a rotazione",
  "francesco-gennari-teatro-borsoni": "Francesco Gennari — Live integrale",
  "concerti-in-cripta-alchemist-quartet":
    "Concerti in Cripta — Alchemist Quartet",
  "lido-street-food-restaurant": "Lido Street Food Restaurant",
  "welovecastello-marketing-gestione-ristorante":
    "WeLoveCastello — Marketing e gestione ristorante",
};

const placeholderPoints = [
  {
    title: "Struttura narrativa",
    text: "La pagina verrà costruita come racconto del progetto, non come semplice archivio.",
    accent: "yellow",
  },
  {
    title: "Materiali visivi",
    text: "Immagini, video, render, grafiche o contenuti utili a mostrare il lavoro svolto.",
    accent: "blue",
  },
  {
    title: "Ruolo e processo",
    text: "Obiettivo, contesto, contributo personale, scelte visive e risultato finale.",
    accent: "red",
  },
];

function accentColor(color = "red") {
  if (color === "red") return "bg-red-600";
  if (color === "blue") return "bg-blue-600";
  return "bg-yellow-400";
}

function accentText(color = "red") {
  if (color === "red") return "text-red-400";
  if (color === "blue") return "text-blue-400";
  return "text-yellow-300";
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

function PlaceholderCard({ item }) {
  return (
    <article className="bg-[#11100d] p-5 md:p-6">
      <div className="mb-6 flex items-center justify-between gap-5">
        <span className={`h-2 w-2 ${accentColor(item.accent)}`} />

        <p
          className={`text-[10px] uppercase tracking-[0.28em] ${accentText(
            item.accent
          )}`}
        >
          Preview
        </p>
      </div>

      <h2 className="text-xl font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/88 md:text-2xl">
        {item.title}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-[#e8e3d6]/52 md:text-base">
        {item.text}
      </p>
    </article>
  );
}

function formatSlug(slug) {
  if (!slug) return "Progetto";

  return String(slug)
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function PlaceholderProjectPage({ slug }) {
  const title = projectTitles[slug] || formatSlug(slug);

  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[#11100d] px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-[calc(6.5rem+env(safe-area-inset-top))] text-[#e8e3d6] sm:px-5 md:px-10 md:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pt-[calc(8rem+env(safe-area-inset-top))] lg:px-16">
      <section className="mx-auto w-full max-w-7xl">
        {/* HERO */}
        <section className="border-b border-[#e8e3d6]/10 pb-10 md:pb-12">
          <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
            <div>
              <SectionLabel color="red">Portfolio / Progetto</SectionLabel>

              <h1 className="max-w-5xl break-words text-[clamp(3rem,14vw,6rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
                {title}
              </h1>
            </div>

            <div className="border border-[#e8e3d6]/10 bg-[#e8e3d6]/[0.025] p-5 md:p-7">
              <p className="text-xl font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/82 md:text-3xl">
                Pagina progetto in preparazione.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#e8e3d6]/55 md:text-base">
                Questo progetto è già presente nel portfolio, ma la pagina
                dedicata non è ancora stata costruita. Intanto puoi tornare alla
                selezione generale o scrivermi per parlarne direttamente.
              </p>
            </div>
          </div>
        </section>

        {/* STATUS */}
        <section className="mt-10 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 md:grid-cols-3">
          {placeholderPoints.map((item) => (
            <PlaceholderCard key={item.title} item={item} />
          ))}
        </section>

        {/* MESSAGE */}
        <section className="mt-12 border border-[#e8e3d6]/10 bg-[#e8e3d6]/[0.025] p-5 md:p-8 lg:p-10">
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <div>
              <SectionLabel color="blue">In costruzione</SectionLabel>

              <h2 className="max-w-3xl text-[clamp(2rem,8vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
                Non è una pagina vuota.
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-sm leading-relaxed text-[#e8e3d6]/58 md:text-base lg:text-lg">
                Qui verrà costruita una presentazione dedicata, con contenuti
                scelti e una struttura coerente con il resto del sito: pochi
                elementi inutili, più chiarezza, più ritmo, più valore reale del
                progetto.
              </p>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#e8e3d6]/46 md:text-base">
                La navigazione resta comunque completa: il portfolio, i servizi
                e il contatto sono sempre accessibili anche da mobile, da reti
                lente o se questa pagina viene raggiunta direttamente da un link
                esterno.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/portfolio"
                  className="inline-block w-full border border-[#e8e3d6]/25 px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#e8e3d6]/72 transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/70 sm:w-auto"
                >
                  Torna al portfolio
                </Link>

                <Link
                  href="/servizi"
                  className="inline-block w-full border border-[#e8e3d6]/12 px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#e8e3d6]/50 transition hover:border-[#e8e3d6]/40 hover:text-[#e8e3d6]/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/50 sm:w-auto"
                >
                  Servizi
                </Link>

                <a
                  href="mailto:andreacastellazzo@gmail.com"
                  className="inline-block w-full border border-[#e8e3d6]/12 px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#e8e3d6]/50 transition hover:border-[#e8e3d6]/40 hover:text-[#e8e3d6]/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/50 sm:w-auto"
                >
                  Parliamone
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-12 border border-[#e8e3d6]/10 bg-[#e8e3d6] p-6 text-[#11100d] md:p-8 lg:p-10">
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#11100d]/42">
                Progetto non ancora pubblicato
              </p>

              <h2 className="mt-7 text-[clamp(2.4rem,10vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
                La pagina arriverà.
              </h2>
            </div>

            <div>
              <p className="mb-7 text-sm leading-relaxed text-[#11100d]/62 md:text-base">
                Nel frattempo puoi vedere gli altri progetti disponibili o
                contattarmi se vuoi informazioni su questo lavoro specifico.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/portfolio"
                  className="inline-block w-full border border-[#11100d] px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#11100d] transition hover:bg-[#11100d] hover:text-[#e8e3d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/40 sm:w-auto"
                >
                  Portfolio
                </Link>

                <a
                  href="mailto:andreacastellazzo@gmail.com"
                  className="inline-block w-full border border-[#11100d]/20 px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#11100d]/65 transition hover:border-[#11100d] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/30 sm:w-auto"
                >
                  Contatto
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}