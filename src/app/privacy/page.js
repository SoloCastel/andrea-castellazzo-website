export const metadata = {
  title: "Privacy Policy | Exploring Space",
  description:
    "Informativa privacy del sito Exploring Space di Andrea Castellazzo.",
};

const privacyOwner = {
  name: "Andrea Castellazzo",
  email: "andreacastellazzo@gmail.com",

  // Se hai Partita IVA collegata a questa attività, puoi inserirla qui.
  // Esempio: "IT00000000000"
  vatNumber: "",

  // Inserisci indirizzo professionale / sede legale se vuoi o se richiesto.
  professionalAddress: "",
};

const privacySummary = [
  {
    title: "Portfolio e contatto",
    text: "Il sito presenta progetti, servizi e competenze. I contatti avvengono tramite email.",
    accent: "yellow",
  },
  {
    title: "Dati tecnici",
    text: "Possono essere trattati dati necessari a sicurezza, hosting, log e funzionamento.",
    accent: "blue",
  },
  {
    title: "Nessuna profilazione",
    text: "Non sono attivi sistemi di profilazione, remarketing, Meta Pixel o Google Ads.",
    accent: "red",
  },
];

const dataTypes = [
  {
    label: "Navigazione",
    purpose: "Erogazione del sito, sicurezza, log tecnici, diagnostica.",
    examples: "IP, browser, dispositivo, pagine richieste, log server.",
    legalBasis: "Legittimo interesse / sicurezza / funzionamento tecnico.",
    retention: "Secondo le policy tecniche dei fornitori.",
    accent: "blue",
  },
  {
    label: "Email",
    purpose: "Rispondere a richieste, collaborazioni, preventivi o contatti professionali.",
    examples: "Nome, email, testo del messaggio, allegati inviati volontariamente.",
    legalBasis: "Misure precontrattuali / legittimo interesse / obblighi di legge.",
    retention: "Per il tempo necessario alla richiesta e ai rapporti conseguenti.",
    accent: "yellow",
  },
  {
    label: "Analytics",
    purpose: "Statistiche aggregate per capire uso, traffico e performance del sito.",
    examples: "Pagine visitate, referrer, browser, dispositivo, informazioni aggregate.",
    legalBasis: "Legittimo interesse, se configurato senza profilazione.",
    retention: "Secondo configurazione e policy del fornitore.",
    accent: "blue",
  },
  {
    label: "Marketing",
    purpose: "Pubblicità personalizzata, remarketing, tracciamento commerciale.",
    examples: "Pixel pubblicitari, identificatori commerciali, profili utente.",
    legalBasis: "Richiederebbe consenso specifico.",
    retention: "Non applicabile nella configurazione attuale.",
    accent: "red",
  },
];

const rights = [
  "Informazione",
  "Accesso",
  "Rettifica",
  "Cancellazione",
  "Limitazione",
  "Opposizione",
  "Portabilità",
  "Revoca del consenso",
  "Reclamo al Garante",
];

const recipients = [
  "Provider hosting",
  "Provider email",
  "Fornitori tecnici",
  "Consulenti autorizzati",
  "Autorità competenti",
];

const updateTriggers = [
  "Form di contatto",
  "Newsletter",
  "E-commerce",
  "Area utenti",
  "Google Analytics",
  "Meta Pixel",
  "Google Ads",
  "CRM",
  "Mappe embed",
  "Video embed",
  "Login",
  "Pagamenti",
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
      value: privacyOwner.name,
    },
    {
      label: "Email",
      value: privacyOwner.email,
      href: `mailto:${privacyOwner.email}`,
    },
    privacyOwner.vatNumber
      ? {
          label: "Partita IVA",
          value: privacyOwner.vatNumber,
        }
      : null,
    privacyOwner.professionalAddress
      ? {
          label: "Sede / indirizzo professionale",
          value: privacyOwner.professionalAddress,
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

function DataTypeCard({ item }) {
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            Esempi
          </p>

          <p className="text-sm leading-relaxed text-[#e8e3d6]/58">
            {item.examples}
          </p>
        </div>

        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/30">
            Base
          </p>

          <p className="text-sm leading-relaxed text-[#e8e3d6]/58">
            {item.legalBasis}
          </p>
        </div>

        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/30">
            Conservazione
          </p>

          <p className="text-sm leading-relaxed text-[#e8e3d6]/58">
            {item.retention}
          </p>
        </div>
      </div>
    </article>
  );
}

function RightCard({ label, index }) {
  const colors = ["red", "blue", "yellow"];
  const accent = colors[index % colors.length];

  return (
    <div className="group flex items-center justify-between gap-4 border border-[#e8e3d6]/10 bg-[#11100d] px-4 py-3 transition hover:border-[#e8e3d6]/22 hover:bg-[#e8e3d6] hover:text-[#11100d]">
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#e8e3d6]/62 transition group-hover:text-[#11100d]/70">
        {label}
      </span>

      <span className={`h-2 w-2 shrink-0 ${accentColor(accent)}`} />
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[#11100d] px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-[calc(6.5rem+env(safe-area-inset-top))] text-[#e8e3d6] sm:px-5 md:px-10 md:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pt-[calc(8rem+env(safe-area-inset-top))] lg:px-16">
      <section className="mx-auto w-full max-w-7xl">
        {/* HERO */}
        <section className="border-b border-[#e8e3d6]/10 pb-10 md:pb-12">
          <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
            <div>
              <SectionLabel color="yellow">Privacy Policy</SectionLabel>

              <h1 className="text-[clamp(3rem,14vw,6rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
                Informativa privacy.
              </h1>
            </div>

            <div className="border border-[#e8e3d6]/10 bg-[#e8e3d6]/[0.025] p-5 md:p-7">
              <p className="text-xl font-semibold leading-tight tracking-[-0.04em] text-[#e8e3d6]/82 md:text-3xl">
                Come vengono trattati i dati sul sito.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#e8e3d6]/55 md:text-base">
                Questa informativa descrive quali dati personali possono essere
                trattati durante la navigazione del sito Exploring Space o quando
                invii una richiesta di contatto.
              </p>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mt-10 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 md:grid-cols-3">
          {privacySummary.map((item) => (
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
            Chi tratta i dati.
          </h2>

          <div className="mt-8">
            <OwnerData />
          </div>
        </section>

        {/* DATA TYPES */}
        <section className="mt-12">
          <SectionLabel color="red">Dati trattati</SectionLabel>

          <h2 className="max-w-4xl text-[clamp(2rem,8vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            Categorie, finalità e basi giuridiche.
          </h2>

          <div className="mt-8 grid gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10">
            {dataTypes.map((item) => (
              <DataTypeCard key={item.label} item={item} />
            ))}
          </div>
        </section>

        {/* LEGAL TEXT */}
        <article className="mx-auto mt-12 grid max-w-5xl gap-9 md:gap-10">
          <LegalSection title="1. Natura del sito">
            <p>
              Exploring Space è un sito di portfolio, presentazione
              professionale, comunicazione dei servizi e contatto. Il sito non è
              un e-commerce, non gestisce pagamenti online, non prevede account
              utente, login, area riservata o acquisti diretti nella
              configurazione attuale.
            </p>

            <p>
              Il conferimento di dati personali tramite email è volontario. Se
              scegli di non inviare una richiesta di contatto, puoi comunque
              navigare il sito e consultare i contenuti pubblici disponibili.
            </p>
          </LegalSection>

          <LegalSection title="2. Dati tecnici di navigazione">
            <p>
              Durante la navigazione possono essere trattati dati tecnici
              necessari al funzionamento del sito, alla sicurezza,
              all’erogazione delle pagine, alla prevenzione di abusi e alla
              diagnostica.
            </p>

            <p>
              Questi dati possono includere indirizzo IP, informazioni su
              browser e dispositivo, orario della richiesta, pagine visitate, URL
              richiesti, log server e informazioni tecniche simili.
            </p>
          </LegalSection>

          <LegalSection title="3. Dati inviati volontariamente via email">
            <p>
              Se invii una richiesta tramite email, verranno trattati i dati che
              decidi volontariamente di comunicare: indirizzo email, nome,
              contenuto del messaggio, eventuali allegati, informazioni sul
              progetto e altri dati inclusi nella comunicazione.
            </p>

            <p>
              Questi dati sono utilizzati per rispondere alla richiesta,
              valutare collaborazioni, formulare risposte preliminari, gestire
              rapporti professionali e conservare traccia delle comunicazioni
              rilevanti.
            </p>
          </LegalSection>

          <LegalSection title="4. Hosting, sicurezza e fornitori tecnici">
            <p>
              Il sito è ospitato tramite fornitori tecnici che possono trattare
              dati necessari all’erogazione del servizio, come log, informazioni
              di richiesta, diagnostica, sicurezza, performance e dati tecnici
              del dispositivo o del browser.
            </p>

            <p>
              Nella configurazione attuale il sito può essere ospitato su Vercel.
              Vercel può trattare dati tecnici secondo le proprie policy e i
              propri termini, anche per sicurezza, affidabilità e funzionamento
              dell’infrastruttura.
            </p>
          </LegalSection>

          <LegalSection title="5. Analytics">
            <p>
              Il sito può utilizzare Vercel Web Analytics o strumenti analoghi
              configurati in modo privacy-friendly, senza cookie pubblicitari e
              senza finalità di profilazione commerciale.
            </p>

            <p>
              Se verranno introdotti strumenti analytics diversi, come Google
              Analytics o servizi equivalenti, questa informativa e la Cookie
              Policy verranno aggiornate indicando servizio, finalità, categorie
              di dati, basi giuridiche, eventuali terze parti e necessità o meno
              del consenso.
            </p>
          </LegalSection>

          <LegalSection title="6. Profilazione e marketing">
            <p>
              Al momento non vengono utilizzati sistemi di profilazione,
              remarketing, Meta Pixel, Google Ads, TikTok Pixel, newsletter
              automatizzate, CRM di marketing o strumenti pubblicitari finalizzati
              alla creazione di profili commerciali dell’utente.
            </p>

            <p>
              Se in futuro tali strumenti venissero introdotti, saranno attivati
              solo dopo aggiornamento dell’informativa e, dove necessario, dopo
              acquisizione del consenso dell’utente tramite un meccanismo
              conforme.
            </p>
          </LegalSection>

          <LegalSection title="7. Destinatari dei dati">
            <p>
              I dati personali possono essere trattati dal titolare e, nei limiti
              necessari, da fornitori tecnici, provider di hosting, provider
              email, consulenti, collaboratori autorizzati o soggetti che
              forniscono servizi indispensabili al funzionamento del sito e alla
              gestione delle richieste.
            </p>

            <TagList items={recipients} />
          </LegalSection>

          <LegalSection title="8. Conservazione dei dati">
            <p>
              Le email e le comunicazioni ricevute vengono conservate per il
              tempo necessario a gestire la richiesta, valutare o svolgere
              eventuali rapporti professionali e adempiere a obblighi
              amministrativi, fiscali, contrattuali o legali eventualmente
              applicabili.
            </p>

            <p>
              I dati tecnici e i log sono conservati secondo tempi e criteri
              stabiliti dai fornitori tecnici utilizzati, salvo necessità di
              conservazione ulteriore per sicurezza, prevenzione di abusi,
              accertamento di responsabilità o obblighi di legge.
            </p>
          </LegalSection>

          <LegalSection title="9. Trasferimenti extra UE">
            <p>
              Alcuni fornitori tecnici possono trattare dati anche al di fuori
              dello Spazio Economico Europeo, direttamente o tramite proprie
              infrastrutture e subfornitori.
            </p>

            <p>
              In questi casi, il trasferimento avviene secondo le garanzie
              previste dalla normativa applicabile, come decisioni di
              adeguatezza, clausole contrattuali standard o altri strumenti
              riconosciuti dalla normativa sulla protezione dei dati.
            </p>
          </LegalSection>

          <LegalSection title="10. Diritti dell’utente">
            <p>
              L’utente può esercitare i diritti previsti dalla normativa
              applicabile, tra cui accesso, rettifica, cancellazione,
              limitazione, opposizione, portabilità dei dati e revoca del
              consenso quando il trattamento si basa sul consenso.
            </p>

            <p>
              Le richieste possono essere inviate al titolare scrivendo a{" "}
              <a
                href={`mailto:${privacyOwner.email}`}
                className="underline decoration-[#e8e3d6]/25 underline-offset-4 transition hover:text-[#e8e3d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
              >
                {privacyOwner.email}
              </a>
              .
            </p>

            <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#e8e3d6]/10 bg-[#e8e3d6]/10 sm:grid-cols-2 lg:grid-cols-3">
              {rights.map((item, index) => (
                <RightCard key={item} label={item} index={index} />
              ))}
            </div>
          </LegalSection>

          <LegalSection title="11. Reclamo all’autorità di controllo">
            <p>
              Se ritieni che il trattamento dei dati personali avvenga in
              violazione della normativa, puoi proporre reclamo all’autorità di
              controllo competente. In Italia, l’autorità competente è il Garante
              per la protezione dei dati personali.
            </p>
          </LegalSection>

          <LegalSection title="12. Minori">
            <p>
              Il sito non è destinato specificamente a minori e non raccoglie
              consapevolmente dati personali di minori tramite registrazione,
              account o servizi dedicati.
            </p>
          </LegalSection>

          <LegalSection title="13. Decisioni automatizzate">
            <p>
              Il sito non utilizza processi decisionali automatizzati, scoring,
              profilazione automatica o sistemi che producano effetti giuridici
              o analogamente significativi sull’utente.
            </p>
          </LegalSection>

          <LegalSection title="14. Accessibilità, paesi, dispositivi e reti">
            <p>
              Questa pagina è costruita come contenuto statico, senza iframe,
              video, script pubblicitari o componenti interattivi obbligatori.
              È pensata per restare leggibile anche con connessioni lente,
              browser mobile, schermi piccoli, orientamento verticale o
              orizzontale e dispositivi con barre dell’app browser sovrapposte.
            </p>

            <p>
              Il sito non introduce blocchi volontari lato codice basati su
              paese, dispositivo, sistema operativo, browser, risoluzione o rete.
              L’accesso assoluto non può però essere garantito contro
              limitazioni esterne, come firewall, provider locali, DNS,
              restrizioni normative, impostazioni del browser o servizi terzi non
              disponibili.
            </p>
          </LegalSection>

          <LegalSection title="15. Privacy e cookie">
            <p>
              Per informazioni sui cookie, sugli strumenti tecnici e sugli
              eventuali servizi analytics, consulta anche la Cookie Policy. Per
              le informazioni generali su titolarità dei contenuti, proprietà
              intellettuale e uso del sito, consulta le Note legali.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/cookies"
                className="inline-block w-full border border-[#e8e3d6]/20 px-5 py-3 text-center text-[10px] uppercase tracking-[0.24em] text-[#e8e3d6]/70 transition hover:border-[#e8e3d6]/55 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60 sm:w-auto"
              >
                Cookie Policy
              </a>

              <a
                href="/note-legali"
                className="inline-block w-full border border-[#e8e3d6]/10 px-5 py-3 text-center text-[10px] uppercase tracking-[0.24em] text-[#e8e3d6]/50 transition hover:border-[#e8e3d6]/35 hover:text-[#e8e3d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/40 sm:w-auto"
              >
                Note legali
              </a>
            </div>
          </LegalSection>

          <LegalSection title="16. Aggiornamenti dell’informativa">
            <p>
              Questa informativa può essere aggiornata in qualsiasi momento per
              adeguarla a modifiche del sito, dei servizi, dei fornitori
              tecnici, delle modalità di contatto, degli strumenti analytics,
              delle funzionalità o della normativa applicabile.
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
                Se verranno aggiunti form, newsletter, e-commerce, strumenti di
                marketing, aree utente o nuovi servizi terzi, la pagina dovrà
                essere aggiornata.
              </p>

              <a
                href={`mailto:${privacyOwner.email}`}
                className="mt-7 inline-block w-full border border-[#11100d] px-6 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#11100d] transition hover:bg-[#11100d] hover:text-[#e8e3d6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11100d]/40 sm:w-auto"
              >
                Contatto privacy
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}