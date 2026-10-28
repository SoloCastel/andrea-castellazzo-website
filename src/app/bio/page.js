const highlights = [
  {
    title: "Immagine",
    text: "Grafica, fotografia, video e composizione visiva per dare forma a identità, prodotti e racconti.",
  },
  {
    title: "3D",
    text: "Render, animazioni e visualizzazioni per mostrare ciò che non è facile fotografare, riprendere o spiegare.",
  },
  {
    title: "Contenuti",
    text: "Materiali per siti, social, presentazioni, portfolio, campagne e comunicazione commerciale.",
  },
];

const serviceCards = [
  {
    title: "Brand e comunicazione",
    text: "Identità visive, sistemi grafici, materiali commerciali, presentazioni e contenuti coordinati.",
  },
  {
    title: "Foto e video",
    text: "Produzioni visive per aziende, eventi, prodotti, luoghi e progetti da raccontare meglio.",
  },
  {
    title: "Render e 3D",
    text: "Immagini, animazioni e visualizzazioni 3D per prodotti, spazi, prototipi e contenuti narrativi.",
  },
  {
    title: "Contenuti digitali",
    text: "Materiali per social, siti, campagne, lanci, pagine progetto e comunicazione online.",
  },
];

const bioRoadmap = [
  {
    year: "2018",
    title: "Formazione grafica · palcoscenico",
    text: "Grafica, multimedia e prime esperienze tecniche live.",
    color: "yellow",
  },
  {
    year: "2020",
    title: "Render eventi · ristorazione",
    text: "Visualizzazioni 3D per spazi, allestimenti e contesti commerciali.",
    color: "red",
  },
  {
    year: "2021",
    title: "Video aziendali · 3D tecnico",
    text: "Produzioni video, meccanica, architettura e visualizzazioni.",
    color: "blue",
  },
  {
    year: "2022",
    title: "Ristorante · marketing",
    text: "Strategia, grafica, contenuti e sito web dentro la gestione reale.",
    color: "yellow",
  },
  {
    year: "2023",
    title: "Gestione ristorante · foto · video",
    text: "Operatività, contenuti visivi e comunicazione sul campo.",
    color: "blue",
  },
  {
    year: "2024—25",
    title: "Branding · 3D · video",
    text: "Gestione, identità visiva e produzione multiformato.",
    color: "red",
  },
  {
    year: "2026",
    title: "3D · video · web",
    text: "Esperienze visive più strutturate tra animazione, portfolio e pagine progetto.",
    color: "yellow",
  },
];

const skills = [
  "Visual design",
  "Fotografia",
  "Videomaking",
  "Render 3D",
  "Animazione 3D",
  "Branding",
  "Social content",
  "Siti web",
  "Presentazioni visive",
  "Strategia visiva",
  "Gestione progetto",
];

const tools = [
  "Adobe Creative Suite",
  "Blender",
  "Cinema 4D",
  "V-Ray",
  "Meta Ads",
  "Google Business",
  "Strumenti AI",
  "Web design",
  "Organizzazione",
];

function getAccentClass(color = "red") {
  if (color === "red") return "bg-red-600";
  if (color === "blue") return "bg-blue-600";
  return "bg-yellow-400";
}

function getAccentTextClass(color = "red") {
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
      <span className={`h-2 w-2 ${getAccentClass(color)}`} />
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

function TagList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="whitespace-nowrap border border-[#e8e3d6]/12 bg-[#e8e3d6]/[0.025] px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-[#e8e3d6]/62 md:px-4 md:text-[10px] md:tracking-[0.18em]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function TextBlock({ children }) {
  return (
    <div className="mt-6 grid gap-4 text-sm leading-relaxed text-[#e8e3d6]/58 md:mt-7 md:text-base lg:text-lg">
      {children}
    </div>
  );
}

function SectionBox({ label, color = "red", title, children }) {
  return (
    <section className="border-b border-[#e8e3d6]/10 py-9 md:py-12">
      <div className="mx-auto max-w-5xl">
        <SectionLabel color={color}>{label}</SectionLabel>

        <h2 className="max-w-4xl text-[clamp(2rem,8vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
          {title}
        </h2>

        {children}
      </div>
    </section>
  );
}

function InfoCard({ title, text }) {
  return (
    <article className="bg-[#11100d] p-5 md:p-6">
      <h3 className="text-xl font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/88 md:text-2xl">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#e8e3d6]/52 md:text-base">
        {text}
      </p>
    </article>
  );
}

function BioRoadmap() {
  return (
    <section className="mt-10 overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/[0.025] p-5 md:mt-12 md:p-7 lg:p-8">
      <div className="flex items-center gap-5">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#e8e3d6]/35 md:text-xs">
          Roadmap
        </p>

        <AccentMark color="blue" />
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#e8e3d6]/52 md:text-base">
        Una traccia sintetica del percorso: visual design, gestione reale,
        contenuti, 3D, video e web.
      </p>

      {/* MOBILE + TABLET */}
      <div className="mt-8 lg:hidden">
        <div className="relative border-l border-[#e8e3d6]/12 pl-5">
          {bioRoadmap.map((item) => (
            <article key={item.year} className="relative pb-6 last:pb-0">
              <span
                className={`absolute -left-[27px] top-1.5 h-3 w-3 ${getAccentClass(
                  item.color
                )}`}
              />

              <p
                className={`text-[10px] uppercase tracking-[0.28em] ${getAccentTextClass(
                  item.color
                )}`}
              >
                {item.year}
              </p>

              <h3 className="mt-1.5 text-base font-semibold leading-tight tracking-[-0.035em] text-[#e8e3d6]/88">
                {item.title}
              </h3>

              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#e8e3d6]/48">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="relative mt-10 hidden lg:block">
        <div className="pointer-events-none absolute left-0 right-0 top-[38px] h-px bg-[#e8e3d6]/12" />

        <div className="grid grid-cols-7 gap-3 xl:gap-4">
          {bioRoadmap.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <article
                key={item.year}
                className={`group relative min-h-[170px] ${
                  isEven ? "pt-0" : "pt-14"
                }`}
              >
                <div className="relative z-10 flex h-[78px] flex-col items-center text-center">
                  <span
                    className={`mb-4 h-4 w-4 border border-[#11100d] ${getAccentClass(
                      item.color
                    )} transition duration-300 group-hover:scale-125`}
                  />

                  <p
                    className={`text-[10px] uppercase tracking-[0.28em] ${getAccentTextClass(
                      item.color
                    )}`}
                  >
                    {item.year}
                  </p>
                </div>

                <div className="relative z-10 text-center">
                  <h3 className="mx-auto max-w-[145px] text-[13px] font-semibold leading-tight tracking-[-0.035em] text-[#e8e3d6]/88 transition duration-300 group-hover:text-[#e8e3d6] xl:text-base">
                    {item.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[145px] text-[11px] leading-relaxed text-[#e8e3d6]/44 transition duration-300 group-hover:text-[#e8e3d6]/60 xl:text-xs">
                    {item.text}
                  </p>
                </div>

                <div
                  className={`pointer-events-none absolute left-1/2 top-[38px] h-8 w-px -translate-x-1/2 bg-[#e8e3d6]/10 ${
                    isEven ? "translate-y-2" : "translate-y-[-32px]"
                  }`}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function BioPage() {
  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[#11100d] px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-[calc(6.5rem+env(safe-area-inset-top))] text-[#e8e3d6] sm:px-5 md:px-10 md:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pt-[calc(8rem+env(safe-area-inset-top))] lg:px-16">
      <section className="mx-auto w-full max-w-7xl">
        {/* HERO */}
        <section className="border-b border-[#e8e3d6]/10 pb-9 md:pb-12">
          <div className="mx-auto max-w-5xl">
            <SectionLabel color="yellow">Bio</SectionLabel>

            <h1 className="text-[clamp(3rem,14vw,6rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
              Andrea Castellazzo.
            </h1>

            <p className="mt-5 max-w-2xl text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#e8e3d6]/42 md:text-xs md:tracking-[0.22em] lg:text-sm">
              Visual designer · Fotografo · Videomaker · 3D artist
            </p>

            <p className="mt-8 max-w-4xl text-[clamp(1.55rem,7vw,3rem)] font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/88 md:mt-9">
              Creo contenuti visivi per far capire meglio progetti, prodotti e
              idee.
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#e8e3d6]/58 md:mt-6 md:text-base lg:text-lg">
              Lavoro tra grafica, fotografia, video, 3D e contenuti digitali.
              Aiuto aziende e professionisti a costruire immagini più chiare,
              curate e riconoscibili.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:andreacastellazzo@gmail.com"
                className="inline-block w-full border border-[#e8e3d6]/25 px-5 py-3 text-center text-[10px] uppercase tracking-[0.25em] text-[#e8e3d6]/72 transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/70 sm:w-auto"
              >
                Scrivimi
              </a>

              <a
                href="/portfolio"
                className="inline-block w-full border border-[#e8e3d6]/10 px-5 py-3 text-center text-[10px] uppercase tracking-[0.25em] text-[#e8e3d6]/45 transition hover:border-[#e8e3d6]/35 hover:text-[#e8e3d6]/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/50 sm:w-auto"
              >
                Guarda i progetti
              </a>
            </div>

            <BioRoadmap />

            <div className="mt-10 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 md:grid-cols-3">
              {highlights.map((item) => (
                <InfoCard key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
          </div>
        </section>

        {/* COSA FACCIO */}
        <SectionBox
          label="Cosa faccio"
          color="yellow"
          title="Servizi visivi per comunicare meglio."
        >
          <div className="mt-8 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 md:grid-cols-2">
            {serviceCards.map((item) => (
              <InfoCard key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </SectionBox>

        {/* COMPETENZE */}
        <SectionBox
          label="Competenze"
          color="blue"
          title="Linguaggi e strumenti."
        >
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-[#e8e3d6]/35">
                Skill
              </p>

              <TagList items={skills} />
            </div>

            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-[#e8e3d6]/35">
                Software e strumenti
              </p>

              <TagList items={tools} />
            </div>
          </div>
        </SectionBox>

        {/* REFRAME */}
        <SectionBox
          label="ReFrame"
          color="red"
          title="Collaboro con un hub creativo."
        >
          <TextBlock>
            <p>
              Collaboro stabilmente con ReFrame, un hub creativo di giovani
              professionisti nell’ambito dell’immagine e della comunicazione.
              Questo mi permette di lavorare sia come figura autonoma, sia dentro
              team più ampi quando il progetto lo richiede.
            </p>
          </TextBlock>

          <a
            href="https://www.re-frame.it/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block w-full border border-[#e8e3d6]/25 px-5 py-3 text-center text-[10px] uppercase tracking-[0.25em] text-[#e8e3d6]/72 transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/70 sm:w-auto"
          >
            ReFrame Hub Creativo
          </a>
        </SectionBox>

        {/* PERSONALE */}
        <SectionBox
          label="Nota personale"
          color="blue"
          title="Curiosità, tecnica e racconto."
        >
          <TextBlock>
            <p>
              Sono nato a Brescia nel 1995. Mi interessano immagini, tecnologia,
              vela, natura, esplorazione spaziale e tutto ciò che aiuta a
              guardare meglio le cose.
            </p>

            <p>
              Questa curiosità entra nel mio lavoro: cerco immagini che non
              servano solo a decorare, ma a rendere più chiaro un valore, più
              leggibile un progetto, più memorabile una storia.
            </p>
          </TextBlock>
        </SectionBox>

        {/* CONTATTI */}
        <section className="py-9 md:py-12">
          <div className="mx-auto max-w-5xl border border-[#e8e3d6]/10 bg-[#e8e3d6] p-6 text-[#11100d] md:p-8">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#11100d]/42">
              Contatti
            </p>

            <h2 className="mt-7 text-[clamp(2.4rem,10vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
              Parliamone.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#11100d]/60 md:text-base">
              Se hai un progetto, un prodotto, un evento o un’idea che merita
              immagini più chiare e più forti, possiamo costruire il modo giusto
              per raccontarlo.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:andreacastellazzo@gmail.com"
                className="inline-block w-full border border-[#11100d] px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#11100d] transition hover:bg-[#11100d] hover:text-[#e8e3d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/40 sm:w-auto"
              >
                Scrivimi
              </a>

              <a
                href="/portfolio"
                className="inline-block w-full border border-[#11100d]/20 px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#11100d]/65 transition hover:border-[#11100d] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/30 sm:w-auto"
              >
                Guarda il portfolio
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}