export const metadata = {
  title: "Note legali | Exploring Space",
  description:
    "Note legali, titolarità dei contenuti, proprietà intellettuale e informazioni del sito Exploring Space.",
};

const siteOwner = {
  name: "Andrea Castellazzo",
  email: "andreacastellazzo@gmail.com",

  // Se hai Partita IVA collegata a questa attività, inseriscila qui.
  // Esempio: "IT00000000000"
  vatNumber: "",

  // Inserisci indirizzo professionale / sede legale se richiesto o se vuoi mostrarlo.
  professionalAddress: "",
};

const legalSummary = [
  {
    title: "Portfolio",
    text: "Il sito presenta lavori, servizi, competenze e progetti professionali.",
    accent: "yellow",
  },
  {
    title: "Contenuti protetti",
    text: "Testi, immagini, video, render, grafiche e animazioni sono tutelati.",
    accent: "red",
  },
  {
    title: "Nessun e-commerce",
    text: "Il sito non vende direttamente prodotti o servizi e non gestisce pagamenti online.",
    accent: "blue",
  },
];

const contentTypes = [
  "Testi",
  "Immagini",
  "Fotografie",
  "Video",
  "Render",
  "Animazioni",
  "Grafiche",
  "Loghi",
  "Layout",
  "Codice",
  "Presentazioni",
  "Contenuti 3D",
];

const allowedUses = [
  {
    title: "Condivisione link",
    text: "È possibile condividere link pubblici alle pagine del sito.",
    accent: "blue",
  },
  {
    title: "Visione portfolio",
    text: "I contenuti possono essere consultati per valutare lavori, servizi e collaborazioni.",
    accent: "yellow",
  },
  {
    title: "Uso non autorizzato",
    text: "Non è consentito copiare, modificare, rivendere o riutilizzare i contenuti senza permesso.",
    accent: "red",
  },
];

const responsibilityItems = [
  {
    label: "Informazioni",
    value:
      "I contenuti sono presentati con finalità informative, portfolio e comunicazione professionale.",
    accent: "yellow",
  },
  {
    label: "Disponibilità",
    value:
      "Il sito è pensato per restare accessibile e leggibile, ma non può garantire disponibilità assoluta.",
    accent: "blue",
  },
  {
    label: "Terze parti",
    value:
      "Link, piattaforme esterne, embed o servizi terzi seguono regole e disponibilità proprie.",
    accent: "red",
  },
];

const updateTriggers = [
  "Apertura e-commerce",
  "Pagamenti online",
  "Area utenti",
  "Newsletter",
  "Form avanzati",
  "Nuovi servizi terzi",
  "Nuovi partner",
  "Uso commerciale di asset",
  "Cambio titolare",
  "Cambio dati fiscali",
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

function InfoCard({ title, text, accent = "red" }) {
  return (
    <article className="bg-[#11100d] p-5 md:p-6">
      <div className="mb-6 flex items-center justify-between gap-5">
        <span className={`h-2 w-2 ${accentColor(accent)}`} />

        <p
          className={`text-[10px] uppercase tracking-[0.28em] ${accentText(
            accent
          )}`}
        >
          Info
        </p>
      </div>

      <h2 className="text-xl font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/88 md:text-2xl">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-[#e8e3d6]/52 md:text-base">
        {text}
      </p>
    </article>
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
              ? "whitespace-nowrap border border-[#11100d]/12 bg-[#11100d]/[0.035] px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-[#11100d]/62 md:px-4 md:text-[10px]"
              : "whitespace-nowrap border border-[#e8e3d6]/12 bg-[#e8e3d6]/[0.025] px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-[#e8e3d6]/62 md:px-4 md:text-[10px]"
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function LegalSection({ title, children }) {
  return (
    <section className="border-t border-[#e8e3d6]/10 pt-7">
      <h2 className="text-2xl font-semibold leading-tight tracking-[-0.045em] text-[#e8e3d6]/88 md:text-3xl">
        {title}
      </h2>

      <div className="mt-4 grid gap-4 text-sm leading-relaxed text-[#e8e3d6]/58 md:text-base">
        {children}
      </div>
    </section>
  );
}

function OwnerData() {
  const rows = [
    {
      label: "Titolare",
      value: siteOwner.name,
    },
    {
      label: "Email",
      value: siteOwner.email,
      href: `mailto:${siteOwner.email}`,
    },
    siteOwner.vatNumber
      ? {
          label: "Partita IVA",
          value: siteOwner.vatNumber,
        }
      : null,
    siteOwner.professionalAddress
      ? {
          label: "Sede / indirizzo professionale",
          value: siteOwner.professionalAddress,
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label} className="bg-[#11100d] p-5 md:p-6">
          <p className="mb-3 text-[9px] uppercase tracking-[0.28em] text-[#e8e3d6]/30">
            {row.label}
          </p>

          {row.href ? (
            <a
              href={row.href}
              className="break-words text-sm leading-relaxed text-[#e8e3d6]/72 underline decoration-[#e8e3d6]/20 underline-offset-4 transition hover:text-[#e8e3d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60 md:text-base"
            >
              {row.value}
            </a>
          ) : (
            <p className="break-words text-sm leading-relaxed text-[#e8e3d6]/68 md:text-base">
              {row.value}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function ResponsibilityCard({ item }) {
  return (
    <article className="bg-[#11100d] p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between gap-5">
        <p
          className={`text-[10px] uppercase tracking-[0.28em] ${accentText(
            item.accent
          )}`}
        >
          {item.label}
        </p>

        <span className={`h-2 w-2 ${accentColor(item.accent)}`} />
      </div>

      <p className="text-sm leading-relaxed text-[#e8e3d6]/56 md:text-base">
        {item.value}
      </p>
    </article>
  );
}

function UseCard({ item }) {
  return (
    <article className="bg-[#11100d] p-5 md:p-6">
      <span className={`block h-2 w-2 ${accentColor(item.accent)}`} />

      <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/88 md:text-2xl">
        {item.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#e8e3d6]/52 md:text-base">
        {item.text}
      </p>
    </article>
  );
}

export default function NoteLegaliPage() {
  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[#11100d] px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-[calc(6.5rem+env(safe-area-inset-top))] text-[#e8e3d6] sm:px-5 md:px-10 md:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pt-[calc(8rem+env(safe-area-inset-top))] lg:px-16">
      <section className="mx-auto w-full max-w-7xl">
        {/* HERO */}
        <section className="border-b border-[#e8e3d6]/10 pb-10 md:pb-12">
          <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
            <div>
              <SectionLabel color="yellow">Note legali</SectionLabel>

              <h1 className="text-[clamp(3rem,14vw,6rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
                Informazioni legali.
              </h1>
            </div>

            <div className="border border-[#e8e3d6]/10 bg-[#e8e3d6]/[0.025] p-5 md:p-7">
              <p className="text-xl font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/82 md:text-3xl">
                Titolarità, contenuti e uso del sito.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#e8e3d6]/55 md:text-base">
                Questa pagina raccoglie le informazioni generali sul sito
                Exploring Space, sulla titolarità dei contenuti, sui limiti di
                utilizzo e sui collegamenti a servizi o pagine esterne.
              </p>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mt-10 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 md:grid-cols-3">
          {legalSummary.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              text={item.text}
              accent={item.accent}
            />
          ))}
        </section>

        {/* OWNER */}
        <section className="mt-12">
          <SectionLabel color="blue">Titolare</SectionLabel>

          <h2 className="max-w-4xl text-[clamp(2rem,8vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            Chi gestisce questo sito.
          </h2>

          <div className="mt-8">
            <OwnerData />
          </div>

          {!siteOwner.vatNumber && (
            <p className="mt-5 max-w-3xl text-xs leading-relaxed text-[#e8e3d6]/38 md:text-sm">
              Nota operativa non visibile come dato fiscale: se il sito è usato
              per un’attività con Partita IVA, compila il campo{" "}
              <span className="text-[#e8e3d6]/65">vatNumber</span> nel codice
              prima della pubblicazione definitiva.
            </p>
          )}
        </section>

        {/* CONTENT TYPES */}
        <section className="mt-12 border-y border-[#e8e3d6]/10 py-10 md:py-12">
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <div>
              <SectionLabel color="red">Contenuti</SectionLabel>

              <h2 className="max-w-4xl text-[clamp(2rem,8vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
                Materiali protetti.
              </h2>
            </div>

            <div>
              <p className="mb-7 text-sm leading-relaxed text-[#e8e3d6]/58 md:text-base">
                Salvo diversa indicazione, i contenuti presenti nel sito sono di
                proprietà del titolare o pubblicati con autorizzazione, licenza,
                collaborazione o finalità di portfolio.
              </p>

              <TagList items={contentTypes} />
            </div>
          </div>
        </section>

        {/* ALLOWED USES */}
        <section className="mt-12">
          <SectionLabel color="yellow">Utilizzo</SectionLabel>

          <h2 className="max-w-4xl text-[clamp(2rem,8vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            Cosa puoi fare con i contenuti.
          </h2>

          <div className="mt-8 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 md:grid-cols-3">
            {allowedUses.map((item) => (
              <UseCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        {/* LEGAL TEXT */}
        <article className="mx-auto mt-12 grid max-w-5xl gap-9 md:gap-10">
          <LegalSection title="1. Finalità del sito">
            <p>
              Exploring Space è un sito con finalità di portfolio, presentazione
              professionale, comunicazione dei servizi, raccolta di progetti,
              contenuti visivi e contatto.
            </p>

            <p>
              Il sito non costituisce testata giornalistica, non è un negozio
              online, non consente acquisti diretti, non gestisce pagamenti e
              non produce automaticamente contratti o preventivi vincolanti.
            </p>
          </LegalSection>

          <LegalSection title="2. Proprietà intellettuale">
            <p>
              Testi, immagini, fotografie, video, animazioni, render, grafiche,
              layout, presentazioni, contenuti 3D, elementi visivi e materiali
              pubblicati sono protetti dalle norme sul diritto d’autore e sulla
              proprietà intellettuale, salvo diversa indicazione.
            </p>

            <p>
              Non è consentita la copia, riproduzione, modifica, distribuzione,
              pubblicazione, vendita, uso commerciale o riutilizzo dei contenuti
              senza autorizzazione scritta del titolare o degli eventuali altri
              aventi diritto.
            </p>
          </LegalSection>

          <LegalSection title="3. Portfolio, clienti e collaborazioni">
            <p>
              I progetti mostrati possono includere lavori personali, lavori
              professionali, collaborazioni, contenuti realizzati con team,
              partner, clienti o soggetti terzi.
            </p>

            <p>
              La presenza di nomi, marchi, loghi, prodotti, luoghi o riferimenti
              a clienti e collaboratori ha finalità descrittiva e di portfolio.
              Non implica sponsorizzazione, approvazione o rapporto commerciale
              continuativo, salvo dove espressamente indicato.
            </p>
          </LegalSection>

          <LegalSection title="4. Marchi e materiali di terzi">
            <p>
              Marchi, loghi, nomi commerciali, denominazioni, immagini,
              musiche, contenuti o materiali appartenenti a terzi restano di
              proprietà dei rispettivi titolari.
            </p>

            <p>
              Eventuali materiali di terzi sono utilizzati solo se autorizzati,
              commissionati, concessi in licenza, rientranti in un progetto di
              portfolio o citati per identificare correttamente il contesto del
              lavoro.
            </p>
          </LegalSection>

          <LegalSection title="5. Esattezza e aggiornamento dei contenuti">
            <p>
              Il titolare cerca di mantenere le informazioni del sito corrette,
              leggibili e aggiornate. Tuttavia, contenuti, servizi, disponibilità
              e descrizioni possono cambiare nel tempo.
            </p>

            <p>
              Le informazioni pubblicate non costituiscono consulenza tecnica,
              legale, fiscale, commerciale o professionale vincolante. Per
              progetti, collaborazioni, incarichi o preventivi è sempre
              necessario un confronto diretto.
            </p>
          </LegalSection>

          <LegalSection title="6. Link esterni">
            <p>
              Il sito può contenere collegamenti a pagine esterne, siti di
              partner, collaboratori, piattaforme video, social network o servizi
              terzi.
            </p>

            <p>
              Il titolare non è responsabile per contenuti, sicurezza,
              disponibilità, aggiornamenti, cookie, privacy policy o trattamenti
              dati effettuati da siti e piattaforme esterne.
            </p>
          </LegalSection>

          <LegalSection title="7. Disponibilità del sito">
            <p>
              Il sito è progettato per essere fruibile su dispositivi diversi,
              schermi piccoli e grandi, orientamento verticale e orizzontale,
              browser moderni e connessioni variabili.
            </p>

            <p>
              Nonostante questa cura, non è possibile garantire disponibilità
              continua, assenza totale di errori, compatibilità con ogni browser
              obsoleto o accessibilità assoluta in presenza di firewall,
              restrizioni di rete, blocchi locali, impostazioni del dispositivo,
              problemi del provider, manutenzioni o servizi terzi non
              disponibili.
            </p>
          </LegalSection>

          <LegalSection title="8. Paesi, dispositivi e reti">
            <p>
              Il sito non introduce blocchi volontari lato codice basati su
              paese, dispositivo, risoluzione, sistema operativo, browser o rete.
              I contenuti principali sono progettati per restare leggibili anche
              se asset esterni, video incorporati o servizi terzi non dovessero
              caricarsi.
            </p>

            <p>
              L’accesso da qualunque paese, dispositivo o rete non può però
              essere garantito in modo assoluto, perché può dipendere da
              normative locali, provider, DNS, firewall aziendali o scolastici,
              piattaforme terze, impostazioni del browser o limitazioni non
              controllabili dal titolare.
            </p>
          </LegalSection>

          <LegalSection title="9. Privacy e cookie">
            <p>
              Per informazioni sul trattamento dei dati personali, sugli
              strumenti tecnici, sui cookie e sugli eventuali servizi analytics,
              consulta le pagine dedicate del sito.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/privacy"
                className="inline-block w-full border border-[#e8e3d6]/20 px-5 py-3 text-center text-[10px] uppercase tracking-[0.24em] text-[#e8e3d6]/70 transition hover:border-[#e8e3d6]/55 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60 sm:w-auto"
              >
                Privacy Policy
              </a>

              <a
                href="/cookie"
                className="inline-block w-full border border-[#e8e3d6]/10 px-5 py-3 text-center text-[10px] uppercase tracking-[0.24em] text-[#e8e3d6]/50 transition hover:border-[#e8e3d6]/35 hover:text-[#e8e3d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/40 sm:w-auto"
              >
                Cookie Policy
              </a>
            </div>
          </LegalSection>

          <LegalSection title="10. Modifiche alle note legali">
            <p>
              Le presenti note legali possono essere aggiornate in qualsiasi
              momento per adeguarle a modifiche del sito, dei servizi, dei dati
              del titolare, delle collaborazioni, delle tecnologie utilizzate o
              della normativa applicabile.
            </p>

            <TagList items={updateTriggers} />
          </LegalSection>
        </article>

        {/* RESPONSIBILITY STRIP */}
        <section className="mt-12 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 md:grid-cols-3">
          {responsibilityItems.map((item) => (
            <ResponsibilityCard key={item.label} item={item} />
          ))}
        </section>

        {/* FINAL NOTICE */}
        <section className="mt-12 border border-[#e8e3d6]/10 bg-[#e8e3d6] p-6 text-[#11100d] md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#11100d]/42">
                Ultimo aggiornamento
              </p>

              <h2 className="mt-7 text-[clamp(2.4rem,10vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
                Giugno 2026.
              </h2>
            </div>

            <div>
              <p className="text-sm leading-relaxed text-[#11100d]/62 md:text-base">
                Per richieste relative ai contenuti del sito, all’utilizzo di
                immagini, video, render, materiali grafici o riferimenti a
                progetti e collaborazioni, puoi scrivere direttamente al
                titolare.
              </p>

              <a
                href={`mailto:${siteOwner.email}`}
                className="mt-7 inline-block w-full border border-[#11100d] px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#11100d] transition hover:bg-[#11100d] hover:text-[#e8e3d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/40 sm:w-auto"
              >
                Contatto
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}