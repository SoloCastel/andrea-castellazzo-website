export const metadata = {
  title: "Cookie Policy | Exploring Space",
  description:
    "Informativa cookie del sito Exploring Space di Andrea Castellazzo.",
};

const cookieSummary = [
  {
    title: "Cookie tecnici",
    text: "Usati solo quando necessari al funzionamento, alla sicurezza o all’erogazione del sito.",
    accent: "yellow",
  },
  {
    title: "Analytics",
    text: "Eventuali statistiche sono aggregate e senza cookie pubblicitari o identificatori commerciali.",
    accent: "blue",
  },
  {
    title: "Profilazione",
    text: "Non sono attivi cookie di profilazione, remarketing, Meta Pixel o Google Ads.",
    accent: "red",
  },
];

const cookieTypes = [
  {
    label: "Tecnici",
    purpose: "Funzionamento, sicurezza, erogazione delle pagine.",
    consent: "No consenso preventivo",
    active: "Possibili",
    accent: "yellow",
  },
  {
    label: "Analytics aggregati",
    purpose: "Statistiche tecniche e miglioramento del sito.",
    consent: "No, se configurati in forma aggregata/minimizzata",
    active: "Possibili",
    accent: "blue",
  },
  {
    label: "Profilazione",
    purpose: "Pubblicità personalizzata, remarketing, tracciamento commerciale.",
    consent: "Richiede consenso",
    active: "Non attivi",
    accent: "red",
  },
  {
    label: "Terze parti incorporate",
    purpose: "Video, iframe o contenuti esterni eventualmente presenti in alcune pagine.",
    consent: "Dipende dal servizio e dalla configurazione",
    active: "Solo dove indicato",
    accent: "blue",
  },
];

const updateTriggers = [
  "Meta Pixel",
  "Google Ads",
  "Google Analytics",
  "TikTok Pixel",
  "Newsletter",
  "Mappe embed",
  "YouTube/Vimeo embed",
  "E-commerce",
  "Login utenti",
  "Form avanzati",
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

function TypeCard({ item }) {
  return (
    <article className="grid gap-5 bg-[#11100d] p-5 md:grid-cols-[0.72fr_1.28fr] md:p-6">
      <div>
        <p
          className={`text-[10px] uppercase tracking-[0.28em] ${accentText(
            item.accent
          )}`}
        >
          {item.label}
        </p>

        <span className={`mt-5 block h-2 w-2 ${accentColor(item.accent)}`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/30">
            Finalità
          </p>

          <p className="text-sm leading-relaxed text-[#e8e3d6]/58">
            {item.purpose}
          </p>
        </div>

        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/30">
            Consenso
          </p>

          <p className="text-sm leading-relaxed text-[#e8e3d6]/58">
            {item.consent}
          </p>
        </div>

        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/30">
            Stato
          </p>

          <p className="text-sm leading-relaxed text-[#e8e3d6]/58">
            {item.active}
          </p>
        </div>
      </div>
    </article>
  );
}

function TagList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="whitespace-nowrap border border-[#e8e3d6]/12 bg-[#e8e3d6]/[0.025] px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-[#e8e3d6]/62 md:px-4 md:text-[10px]"
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

export default function CookiePage() {
  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[#11100d] px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-[calc(6.5rem+env(safe-area-inset-top))] text-[#e8e3d6] sm:px-5 md:px-10 md:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pt-[calc(8rem+env(safe-area-inset-top))] lg:px-16">
      <section className="mx-auto w-full max-w-7xl">
        {/* HERO */}
        <section className="border-b border-[#e8e3d6]/10 pb-10 md:pb-12">
          <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
            <div>
              <SectionLabel color="yellow">Cookie Policy</SectionLabel>

              <h1 className="text-[clamp(3rem,14vw,6rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
                Cookie e strumenti tecnici.
              </h1>
            </div>

            <div className="border border-[#e8e3d6]/10 bg-[#e8e3d6]/[0.025] p-5 md:p-7">
              <p className="text-xl font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/82 md:text-3xl">
                Informativa sintetica sull’uso dei cookie.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#e8e3d6]/55 md:text-base">
                Questa pagina descrive quali cookie e strumenti simili possono
                essere utilizzati dal sito Exploring Space, con quali finalità e
                come possono essere gestiti dall’utente.
              </p>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mt-10 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 md:grid-cols-3">
          {cookieSummary.map((item) => (
            <InfoCard
              key={item.title}
              title={item.title}
              text={item.text}
              accent={item.accent}
            />
          ))}
        </section>

        {/* STATUS TABLE */}
        <section className="mt-12">
          <SectionLabel color="blue">Stato attuale</SectionLabel>

          <h2 className="max-w-4xl text-[clamp(2rem,8vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            Cosa può essere usato sul sito.
          </h2>

          <div className="mt-8 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10">
            {cookieTypes.map((item) => (
              <TypeCard key={item.label} item={item} />
            ))}
          </div>
        </section>

        {/* LEGAL TEXT */}
        <article className="mx-auto mt-12 grid max-w-5xl gap-9 md:gap-10">
          <LegalSection title="1. Titolare del sito">
            <p>
              Il sito Exploring Space è riconducibile ad Andrea Castellazzo. Per
              comunicazioni relative a questa informativa è possibile scrivere a{" "}
              <a
                href="mailto:andreacastellazzo@gmail.com"
                className="underline decoration-[#e8e3d6]/25 underline-offset-4 transition hover:text-[#e8e3d6]"
              >
                andreacastellazzo@gmail.com
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="2. Cosa sono i cookie">
            <p>
              I cookie sono piccoli file di testo o strumenti tecnici analoghi
              che un sito può utilizzare per memorizzare informazioni sul
              dispositivo dell’utente, sulla sessione di navigazione o sulle
              preferenze espresse.
            </p>

            <p>
              Alcuni cookie sono necessari al funzionamento del sito. Altri,
              invece, possono servire per statistiche, personalizzazione,
              pubblicità o tracciamento: in questi casi la normativa può
              richiedere informazioni aggiuntive e, quando necessario, il
              consenso preventivo dell’utente.
            </p>
          </LegalSection>

          <LegalSection title="3. Cookie tecnici">
            <p>
              Nella configurazione attuale, il sito può utilizzare solo cookie o
              strumenti tecnici necessari al funzionamento, alla sicurezza,
              all’erogazione delle pagine e alla corretta gestione
              dell’infrastruttura di hosting.
            </p>

            <p>
              I cookie tecnici non richiedono consenso preventivo, ma devono
              essere indicati in informativa. Se il sito utilizza solo cookie
              tecnici, non è necessario mostrare un banner cookie.
            </p>
          </LegalSection>

          <LegalSection title="4. Analytics e statistiche">
            <p>
              Il sito può utilizzare Vercel Web Analytics o strumenti analoghi
              configurati in modo privacy-friendly, senza cookie pubblicitari e
              senza finalità di profilazione commerciale.
            </p>

            <p>
              Vercel dichiara che Web Analytics non usa cookie, non associa le
              visite a un individuo identificabile e fornisce dati aggregati per
              comprendere traffico, pagine visitate, referrer, dispositivo,
              browser e informazioni tecniche simili.
            </p>

            <p>
              Se in futuro verranno attivati strumenti analytics diversi, come
              Google Analytics o servizi equivalenti, questa informativa verrà
              aggiornata indicando servizio, finalità, categorie di dati,
              eventuali terze parti e necessità o meno del consenso.
            </p>
          </LegalSection>

          <LegalSection title="5. Cookie di profilazione e marketing">
            <p>
              Al momento non vengono utilizzati cookie di profilazione,
              remarketing, Meta Pixel, Google Ads, TikTok Pixel, strumenti
              pubblicitari o sistemi di tracciamento finalizzati alla creazione
              di profili commerciali dell’utente.
            </p>

            <p>
              Se in futuro dovessero essere introdotti strumenti di marketing o
              profilazione, verranno attivati solo dopo aggiornamento
              dell’informativa e, dove necessario, dopo acquisizione del consenso
              dell’utente tramite un meccanismo conforme.
            </p>
          </LegalSection>

          <LegalSection title="6. Contenuti incorporati e servizi terzi">
            <p>
              Alcune pagine del sito possono contenere video, iframe, link o
              contenuti provenienti da piattaforme esterne, ad esempio YouTube,
              Vimeo o servizi simili.
            </p>

            <p>
              Quando un contenuto esterno viene caricato o aperto, il relativo
              fornitore può trattare dati tecnici dell’utente secondo le proprie
              regole. Dove possibile, il sito privilegia asset locali,
              collegamenti alternativi o modalità di incorporamento meno
              invasive.
            </p>

            <p>
              I contenuti principali del sito non dipendono da servizi terzi
              essenziali: se un video esterno, un iframe o una piattaforma terza
              non fosse disponibile in un paese, su una rete o su un dispositivo,
              la navigazione e la lettura delle pagine devono restare possibili.
            </p>
          </LegalSection>

          <LegalSection title="7. Gestione dei cookie dal browser">
            <p>
              L’utente può gestire, limitare o cancellare i cookie attraverso le
              impostazioni del proprio browser. La disattivazione dei cookie
              tecnici essenziali può compromettere alcune funzioni di base del
              sito o la corretta erogazione delle pagine.
            </p>

            <p>
              Le impostazioni variano in base al browser utilizzato. È possibile
              consultare le guide ufficiali di Chrome, Safari, Firefox, Edge o
              del browser installato sul proprio dispositivo.
            </p>
          </LegalSection>

          <LegalSection title="8. Accessibilità, dispositivi e reti">
            <p>
              Questa pagina è costruita come contenuto statico, senza iframe,
              video, script pubblicitari o componenti interattivi obbligatori.
              È pensata per restare leggibile anche con connessioni lente,
              blocchi di rete, browser mobile, schermi piccoli, orientamento
              verticale o orizzontale e dispositivi con barre dell’app browser
              sovrapposte.
            </p>

            <p>
              Il sito non introduce blocchi volontari lato codice basati su
              paese, dispositivo o rete. L’accesso assoluto non può però essere
              garantito contro limitazioni esterne, come firewall aziendali,
              provider locali, restrizioni di piattaforme terze, impostazioni
              del browser o normative di singoli paesi.
            </p>
          </LegalSection>

          <LegalSection title="9. Quando questa informativa va aggiornata">
            <p>
              Questa informativa deve essere aggiornata se vengono introdotti
              nuovi strumenti che raccolgono dati, installano cookie, caricano
              contenuti da terze parti o modificano le finalità del trattamento.
            </p>

            <TagList items={updateTriggers} />
          </LegalSection>
        </article>

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
                Questa informativa riflette la configurazione attuale del sito.
                Se verranno aggiunti nuovi strumenti di analisi, marketing,
                incorporamento o interazione, la pagina dovrà essere aggiornata
                prima della loro attivazione stabile.
              </p>

              <a
                href="mailto:andreacastellazzo@gmail.com"
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