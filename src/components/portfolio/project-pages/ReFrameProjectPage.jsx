"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const REFRAME_VIDEO_URL = "https://www.youtube.com/watch?v=4wcOEERkoEQ";
const REFRAME_VIDEO_EMBED_URL =
  "https://www.youtube-nocookie.com/embed/4wcOEERkoEQ?rel=0&modestbranding=1";

const images = Array.from({ length: 12 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return `/images/portfolio/reframe-the-movie/reframe-films-${number}.png`;
});

const steps = [
  {
    label: "01 / Landing",
    title: "ReFrame\nThe Movie",
    subtitle: "in collaborazione con ReFrame",
    text: "Un corto/showreel che abbiamo ideato e realizzato insieme a ReFrame. Un progetto nato per raccontare un’identità, non solo per mostrarla.",
    image: 0,
  },
  {
    label: "02 / Visione",
    title: "Prima di girare,\ncapire.",
    text: "Ogni progetto forte nasce prima della camera. Abbiamo definito tono, ritmo e direzione per trasformare ReFrame in un racconto chiaro, credibile e memorabile.",
    image: 1,
  },
  {
    label: "03 / Scrittura",
    title: "Una storia,\nnon una sequenza.",
    text: "Abbiamo costruito il video come un piccolo film: scene, passaggi narrativi, voiceover e intenzioni visive pensati per dare senso a ogni immagine.",
    image: 2,
  },
  {
    label: "04 / Produzione",
    title: "Rendere possibile\nl’idea.",
    text: "Abbiamo organizzato tempi, persone, materiali, attrezzatura, permessi e dettagli pratici. La cura produttiva è ciò che permette a un’idea di arrivare davvero sullo schermo.",
    image: 3,
  },
  {
    label: "05 / Location",
    title: "Ogni luogo\nracconta qualcosa.",
    text: "Abbiamo scelto location non solo belle, ma utili al racconto. Ogni spazio doveva sembrare vero, coerente e vicino all’identità di ReFrame.",
    image: 4,
  },
  {
    label: "06 / Set",
    title: "Costruire\npresenza.",
    text: "Sul set abbiamo lavorato su luce, suono, inquadrature, gesti e continuità. Non per rendere tutto perfetto in modo freddo, ma per far percepire attenzione, fiducia e professionalità.",
    image: 5,
  },
  {
    label: "07 / Materiale",
    title: "Tenere insieme\nmondi diversi.",
    text: "Abbiamo unito riprese costruite, frammenti reali, backstage, dettagli e momenti spontanei. La forza del progetto sta nel farli convivere dentro un’unica visione.",
    image: 6,
  },
  {
    label: "08 / Team",
    title: "Tre sguardi,\nun processo.",
    text: "Abbiamo seguito il progetto insieme: Andrea Castellazzo, Diego Scala e Andrea Terreni, in collaborazione con ReFrame. Idee, responsabilità e scelte creative sono entrate in un processo diretto, umano e condiviso.",
    image: 7,
  },
  {
    label: "09 / Regia",
    title: "Guidare\nlo sguardo.",
    text: "Per noi regia non significa solo riprendere ciò che accade. Significa scegliere cosa far vedere, quando trattenerlo, quando accelerare e dove lasciare spazio al respiro del racconto.",
    image: 8,
  },
  {
    label: "10 / Montaggio",
    title: "Dare forma\nal tempo.",
    text: "Nel montaggio abbiamo trovato il ritmo del progetto: tagli, pause, musica, voce e immagini sono stati ordinati per costruire attenzione, emozione e chiarezza.",
    image: 9,
  },
  {
    label: "11 / Valore",
    title: "Un contenuto curato\nlavora nel tempo.",
    text: "Crediamo che un video così non serva solo a comunicare meglio. Aumenta la percezione di solidità, rende il brand più riconoscibile e aiuta clienti, partner e collaboratori a fidarsi prima.",
    image: 10,
  },
  {
    label: "12 / Play",
    title: "Guarda\nThe Movie.",
    text: "Il video completo mostra il risultato di questo processo: un racconto visivo pensato per dare forma, voce e presenza a un’identità aziendale.",
    image: 11,
    video: true,
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function isInteractiveTarget(target) {
  return Boolean(
    target?.closest?.(
      "a, button, iframe, input, textarea, select, option, [role='button'], [data-allow-touch]"
    )
  );
}

export default function ReFrameProjectPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [phase, setPhase] = useState("visible");
  const [transitionDirection, setTransitionDirection] = useState("down");
  const [loaded, setLoaded] = useState(false);
  const [bounce, setBounce] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const mainRef = useRef(null);

  const activeStepRef = useRef(0);
  const desiredStepRef = useRef(0);
  const prefersReducedMotionRef = useRef(false);

  const stepRailRef = useRef(null);

  const wheelLockedRef = useRef(false);
  const wheelUnlockTimeoutRef = useRef(null);
  const wheelAccumulatorRef = useRef(0);
  const wheelResetTimeoutRef = useRef(null);

  const touchStartYRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchLockedRef = useRef(false);
  const touchUnlockTimeoutRef = useRef(null);

  const textTimeoutARef = useRef(null);
  const textTimeoutBRef = useRef(null);

  function clearTextTimers() {
    if (textTimeoutARef.current) {
      clearTimeout(textTimeoutARef.current);
      textTimeoutARef.current = null;
    }

    if (textTimeoutBRef.current) {
      clearTimeout(textTimeoutBRef.current);
      textTimeoutBRef.current = null;
    }
  }

  function edgeBounce(direction) {
    if (prefersReducedMotionRef.current) return;

    setBounce(direction === "up" ? -12 : 12);

    window.setTimeout(() => {
      setBounce(0);
    }, 220);
  }

  function textItemClass() {
    if (phase === "leaving") {
      return transitionDirection === "down"
        ? "opacity-0 -translate-y-3 blur-[2px]"
        : "opacity-0 translate-y-3 blur-[2px]";
    }

    if (phase === "entering") {
      return transitionDirection === "down"
        ? "opacity-0 translate-y-3 blur-[2px]"
        : "opacity-0 -translate-y-3 blur-[2px]";
    }

    return "opacity-100 translate-y-0 blur-0";
  }

  function textItemDelay(index) {
    if (prefersReducedMotionRef.current) {
      return { transitionDelay: "0ms" };
    }

    return {
      transitionDelay: `${index * 120}ms`,
    };
  }

  function setStepWithAnimation(nextStep, direction) {
    clearTextTimers();

    if (prefersReducedMotionRef.current) {
      activeStepRef.current = nextStep;
      setActiveStep(nextStep);
      setPhase("visible");
      return;
    }

    setTransitionDirection(direction);
    setPhase("leaving");

    textTimeoutARef.current = window.setTimeout(() => {
      activeStepRef.current = nextStep;
      setActiveStep(nextStep);
      setPhase("entering");

      textTimeoutBRef.current = window.setTimeout(() => {
        setPhase("visible");
      }, 80);
    }, 520);
  }

  function moveToStep(targetStep, force = false) {
    const clampedStep = clamp(targetStep, 0, steps.length - 1);
    const currentDesired = desiredStepRef.current;

    const isSameStep =
      clampedStep === currentDesired && clampedStep === activeStepRef.current;

    if (isSameStep && !force) return;

    const direction = clampedStep > currentDesired ? "down" : "up";

    desiredStepRef.current = clampedStep;

    if (isSameStep && force) return;

    setStepWithAnimation(clampedStep, direction);
  }

  function goRelative(direction) {
    const current = desiredStepRef.current;
    const isFirst = current === 0;
    const isLast = current === steps.length - 1;

    if (direction === "up" && isFirst) {
      edgeBounce("up");
      return;
    }

    if (direction === "down" && isLast) {
      edgeBounce("down");
      return;
    }

    const next =
      direction === "down"
        ? clamp(current + 1, 0, steps.length - 1)
        : clamp(current - 1, 0, steps.length - 1);

    moveToStep(next, false);
  }

  function jumpToStep(targetStep) {
    moveToStep(targetStep, true);
  }

  function stepFromPointer(clientY) {
    const rail = stepRailRef.current;
    if (!rail) return desiredStepRef.current;

    const rect = rail.getBoundingClientRect();
    const rawProgress = (clientY - rect.top) / rect.height;
    const progress = Math.min(1, Math.max(0, rawProgress));

    return Math.round(progress * (steps.length - 1));
  }

  function handleRailPointerDown(event) {
    event.preventDefault();

    const nextStep = stepFromPointer(event.clientY);
    jumpToStep(nextStep);
  }

  function handleTouchStart(event) {
    if (isInteractiveTarget(event.target)) return;
    if (event.touches.length !== 1) return;

    const touch = event.touches[0];

    touchStartYRef.current = touch.clientY;
    touchStartXRef.current = touch.clientX;
  }

  function handleTouchMove(event) {
    if (isInteractiveTarget(event.target)) return;
    if (event.touches.length !== 1) return;

    event.preventDefault();
  }

  function handleTouchEnd(event) {
    if (isInteractiveTarget(event.target)) return;
    if (touchLockedRef.current) return;

    if (touchStartYRef.current === null || touchStartXRef.current === null) {
      return;
    }

    const touch = event.changedTouches[0];

    const deltaY = touch.clientY - touchStartYRef.current;
    const deltaX = touch.clientX - touchStartXRef.current;

    touchStartYRef.current = null;
    touchStartXRef.current = null;

    const verticalMovement = Math.abs(deltaY);
    const horizontalMovement = Math.abs(deltaX);

    if (verticalMovement < 45) return;
    if (horizontalMovement > verticalMovement * 0.75) return;

    touchLockedRef.current = true;

    if (deltaY < 0) {
      goRelative("down");
    } else {
      goRelative("up");
    }

    if (touchUnlockTimeoutRef.current) {
      clearTimeout(touchUnlockTimeoutRef.current);
    }

    touchUnlockTimeoutRef.current = window.setTimeout(() => {
      touchLockedRef.current = false;
      touchUnlockTimeoutRef.current = null;
    }, 920);
  }

  function markImageFailed(index) {
    setFailedImages((currentMap) => ({
      ...currentMap,
      [index]: true,
    }));
  }

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = motionQuery.matches;

    function handleMotionChange(event) {
      prefersReducedMotionRef.current = event.matches;
    }

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    const loadTimer = window.setTimeout(() => {
      setLoaded(true);
    }, 280);

    function handleWheel(event) {
      if (event.ctrlKey) return;
      if (isInteractiveTarget(event.target)) return;
      if (mainRef.current && !mainRef.current.contains(event.target)) return;

      const absY = Math.abs(event.deltaY);
      const absX = Math.abs(event.deltaX);

      if (absX > absY) return;

      event.preventDefault();

      if (wheelLockedRef.current) return;
      if (absY < 8) return;

      wheelAccumulatorRef.current += event.deltaY;

      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }

      wheelResetTimeoutRef.current = window.setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 160);

      const threshold = 70;
      const accumulated = wheelAccumulatorRef.current;

      if (Math.abs(accumulated) < threshold) return;

      const direction = accumulated > 0 ? "down" : "up";

      wheelAccumulatorRef.current = 0;
      wheelLockedRef.current = true;

      goRelative(direction);

      if (wheelUnlockTimeoutRef.current) {
        clearTimeout(wheelUnlockTimeoutRef.current);
      }

      wheelUnlockTimeoutRef.current = window.setTimeout(() => {
        wheelLockedRef.current = false;
        wheelUnlockTimeoutRef.current = null;
      }, 980);
    }

    function handleKeyDown(event) {
      if (isInteractiveTarget(event.target)) return;

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        goRelative("down");
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goRelative("up");
      }

      if (event.key === "Home") {
        event.preventDefault();
        jumpToStep(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        jumpToStep(steps.length - 1);
      }
    }

    function preventDocumentTouchMove(event) {
      if (event.touches?.length !== 1) return;
      if (isInteractiveTarget(event.target)) return;
      if (mainRef.current && !mainRef.current.contains(event.target)) return;

      event.preventDefault();
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchmove", preventDocumentTouchMove, {
      passive: false,
    });

    return () => {
      window.clearTimeout(loadTimer);

      clearTextTimers();

      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }

      if (wheelUnlockTimeoutRef.current) {
        clearTimeout(wheelUnlockTimeoutRef.current);
      }

      if (touchUnlockTimeoutRef.current) {
        clearTimeout(touchUnlockTimeoutRef.current);
      }

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchmove", preventDocumentTouchMove);

      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  const current = steps[activeStep];
  const isVideoStep = Boolean(current.video);
  const currentImageIndex = current.image;
  const currentImageSrc = images[currentImageIndex];
  const currentImageFailed = failedImages[currentImageIndex];

  const progressPercentage =
    steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0;

  return (
    <main
      ref={mainRef}
      aria-label="Pagina progetto ReFrame Showreel The Movie"
      className="reframe-main fixed inset-0 isolate overflow-hidden bg-[#11100d] text-[#e8e3d6]"
      style={{
        touchAction: "pinch-zoom",
        overscrollBehavior: "none",
        WebkitOverflowScrolling: "auto",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        .reframe-stage {
          height: 100dvh;
          min-height: 100svh;
          padding-top: calc(6.1rem + env(safe-area-inset-top));
          padding-right: max(1rem, calc(1rem + env(safe-area-inset-right)));
          padding-bottom: calc(5.2rem + env(safe-area-inset-bottom));
          padding-left: max(1rem, calc(1rem + env(safe-area-inset-left)));
        }

        .reframe-grid {
          display: grid;
          height: 100%;
          width: 100%;
          grid-template-rows: minmax(0, auto) minmax(130px, 34dvh) auto;
          align-items: center;
          gap: clamp(0.75rem, 2dvh, 1.25rem);
        }

        @media (min-width: 768px) {
          .reframe-stage {
            padding-top: calc(6.9rem + env(safe-area-inset-top));
            padding-right: max(2.5rem, calc(2.5rem + env(safe-area-inset-right)));
            padding-bottom: calc(5rem + env(safe-area-inset-bottom));
            padding-left: max(2.5rem, calc(2.5rem + env(safe-area-inset-left)));
          }

          .reframe-grid {
            grid-template-rows: minmax(0, auto) minmax(190px, 42dvh) auto;
          }
        }

        @media (min-width: 1024px) and (min-height: 760px) {
          .reframe-stage {
            padding-right: max(4rem, calc(4rem + env(safe-area-inset-right)));
            padding-left: max(4rem, calc(4rem + env(safe-area-inset-left)));
          }

          .reframe-grid {
            grid-template-rows: minmax(0, auto) minmax(260px, 48dvh) auto;
          }
        }

        @media (max-height: 700px) {
          .reframe-stage {
            padding-top: calc(4.7rem + env(safe-area-inset-top));
            padding-bottom: calc(3.7rem + env(safe-area-inset-bottom));
          }

          .reframe-grid {
            grid-template-rows: minmax(0, auto) minmax(105px, 1fr) auto;
            gap: 0.7rem;
          }

          .reframe-copy {
            margin-top: 0.65rem;
          }

          .reframe-video-frame {
            padding: 0.55rem;
          }
        }

        @media (max-width: 767px) and (max-height: 680px) {
          .reframe-stage {
            padding-top: calc(4.65rem + env(safe-area-inset-top));
            padding-bottom: calc(4.85rem + env(safe-area-inset-bottom));
          }

          .reframe-grid {
            grid-template-rows: minmax(0, auto) minmax(96px, 30dvh) auto;
            gap: 0.65rem;
          }

          .reframe-label {
            margin-bottom: 0.45rem;
          }

          .reframe-copy {
            max-width: 34rem;
            font-size: 10px;
            line-height: 1.55;
          }

          .reframe-actions a,
          .reframe-actions button {
            padding: 0.75rem 0.85rem;
            font-size: 8px;
            letter-spacing: 0.2em;
          }
        }

        @media (max-height: 520px) and (orientation: landscape) {
          .reframe-stage {
            padding-top: calc(3.8rem + env(safe-area-inset-top));
            padding-right: max(4.25rem, calc(1rem + env(safe-area-inset-right) + 3.25rem));
            padding-bottom: calc(0.9rem + env(safe-area-inset-bottom));
            padding-left: max(1rem, calc(1rem + env(safe-area-inset-left)));
          }

          .reframe-grid {
            grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
            grid-template-rows: minmax(0, 1fr) auto;
            gap: 0.75rem 1rem;
          }

          .reframe-text {
            margin-left: 0;
            margin-right: 0;
            text-align: left;
          }

          .reframe-video-row {
            grid-column: 2;
            grid-row: 1 / 3;
            min-height: 0;
          }

          .reframe-actions {
            justify-content: flex-start;
            margin-left: 0;
            margin-right: 0;
          }

          .reframe-title {
            max-width: 100%;
            font-size: clamp(1.55rem, 8dvh, 3rem);
            line-height: 0.94;
          }

          .reframe-copy {
            max-width: 34rem;
            font-size: 10px;
          }

          .reframe-mobile-shortcuts,
          .reframe-step-rail {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reframe-main *,
          .reframe-main *::before,
          .reframe-main *::after {
            transition-duration: 1ms !important;
            animation-duration: 1ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <p className="sr-only">
        Pagina progetto interattiva su ReFrame Showreel The Movie. Usa rotella,
        swipe verticale, frecce della tastiera o pulsanti per avanzare tra le
        scene.
      </p>

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.055]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#e8e3d6_1px,transparent_1px),linear-gradient(to_bottom,#e8e3d6_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(17,16,13,0.05)_0%,rgba(17,16,13,0.46)_45%,rgba(17,16,13,0.98)_100%)]" />

      <div
        className={`pointer-events-none absolute inset-0 z-[90] bg-[#11100d] transition-transform duration-[2200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          loaded ? "-translate-y-full" : "translate-y-0"
        }`}
      />

      {/* MAIN LAYOUT */}
      <section
        className="reframe-stage relative z-10 flex items-center justify-center"
        style={{ transform: `translateY(${-bounce}px)` }}
      >
        <div className="reframe-grid max-w-7xl">
          {/* TEXT */}
          <div
            className="reframe-text mx-auto max-w-4xl text-center"
            aria-live="polite"
          >
            <p
              className={`reframe-label mb-3 text-[8px] uppercase tracking-[0.36em] text-[#e8e3d6]/36 transition-all duration-[1100ms] ease-out md:text-[9px] ${textItemClass()}`}
              style={textItemDelay(0)}
            >
              {current.label}
            </p>

            <h1
              className={`reframe-title text-[clamp(32px,5.4vw,78px)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#e8e3d6] transition-all duration-[1200ms] ease-out ${textItemClass()}`}
              style={textItemDelay(1)}
            >
              {current.title.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {current.subtitle && (
              <p
                className={`mx-auto mt-5 max-w-xl text-[10px] uppercase leading-relaxed tracking-[0.28em] text-[#e8e3d6]/55 transition-all duration-[1200ms] ease-out md:text-xs ${textItemClass()}`}
                style={textItemDelay(2)}
              >
                {current.subtitle}
              </p>
            )}

            {current.text && (
              <p
                className={`reframe-copy mx-auto mt-4 max-w-xl text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#e8e3d6]/56 transition-all duration-[1200ms] ease-out md:text-[11px] md:tracking-[0.2em] ${textItemClass()}`}
                style={textItemDelay(3)}
              >
                {current.text}
              </p>
            )}
          </div>

          {/* IMAGE / VIDEO FRAME */}
          <div className="reframe-video-row mx-auto flex h-full min-h-0 w-full max-w-6xl items-center justify-center">
            <div className="reframe-video-frame relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden border border-[#e8e3d6]/14 bg-[#050505]/55 p-3 shadow-[0_0_90px_rgba(0,0,0,0.62)] backdrop-blur-sm md:p-5">
              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,16,13,0.05)_52%,rgba(17,16,13,0.34)_100%)]" />

              {!isVideoStep && !currentImageFailed && (
                <img
                  key={currentImageSrc}
                  src={currentImageSrc}
                  alt=""
                  className="relative z-0 h-full w-full object-contain transition-opacity duration-[900ms] ease-in-out"
                  loading={activeStep <= 2 ? "eager" : "lazy"}
                  decoding="async"
                  onError={() => markImageFailed(currentImageIndex)}
                />
              )}

              {!isVideoStep && currentImageFailed && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#11100d]/72 p-6 text-center">
                  <div className="max-w-md">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-red-400">
                      Immagine non disponibile
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-[#e8e3d6]/62 md:text-base">
                      Il racconto resta leggibile. Puoi continuare tra le scene
                      o aprire il portfolio.
                    </p>
                  </div>
                </div>
              )}

              {isVideoStep && (
                <>
                  <iframe
                    className="relative z-20 h-full w-full"
                    src={REFRAME_VIDEO_EMBED_URL}
                    title="ReFrame The Movie"
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#11100d]/78 to-transparent px-4 pb-4 pt-16 text-center">
                    <p className="mx-auto max-w-xl text-[9px] uppercase leading-relaxed tracking-[0.22em] text-[#e8e3d6]/45">
                      Se il video non viene caricato dalla tua rete o dal tuo
                      paese, usa il link esterno qui sotto.
                    </p>
                  </div>
                </>
              )}

              <div className="pointer-events-none absolute left-3 top-3 z-30 text-[8px] uppercase tracking-[0.28em] text-[#e8e3d6]/30 md:left-5 md:top-5">
                {isVideoStep ? "Video esterno" : "ReFrame Films"}
              </div>

              <div className="pointer-events-none absolute bottom-3 right-3 z-30 text-[8px] uppercase tracking-[0.26em] text-[#e8e3d6]/32 md:bottom-5 md:right-5">
                {String(activeStep + 1).padStart(2, "0")} / {steps.length}
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="reframe-actions mx-auto flex flex-wrap justify-center gap-3">
            {!isVideoStep && (
              <>
                <button
                  onClick={() => goRelative("up")}
                  className="pointer-events-auto border border-[#e8e3d6]/16 bg-[#11100d]/42 px-4 py-3 text-center text-[9px] uppercase tracking-[0.22em] text-[#e8e3d6]/45 backdrop-blur-md transition hover:border-[#e8e3d6]/50 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/50"
                  type="button"
                >
                  Indietro
                </button>

                <button
                  onClick={() => goRelative("down")}
                  className="pointer-events-auto border border-[#e8e3d6]/28 bg-[#11100d]/58 px-4 py-3 text-center text-[9px] uppercase tracking-[0.22em] text-[#e8e3d6]/76 backdrop-blur-md transition hover:border-[#e8e3d6]/70 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/70"
                  type="button"
                >
                  Avanti
                </button>
              </>
            )}

            <a
              href={REFRAME_VIDEO_URL}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto border border-[#e8e3d6]/28 bg-[#11100d]/58 px-5 py-3 text-center text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/76 backdrop-blur-md transition hover:border-[#e8e3d6]/70 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/70"
            >
              Apri su YouTube
            </a>

            <Link
              href="/portfolio"
              className="pointer-events-auto border border-[#e8e3d6]/16 bg-[#11100d]/42 px-5 py-3 text-center text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/52 backdrop-blur-md transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* DESKTOP STEP RAIL */}
      <div
        className="reframe-step-rail absolute top-1/2 z-50 hidden -translate-y-1/2 md:block"
        style={{
          right: "max(1.25rem, calc(1.25rem + env(safe-area-inset-right)))",
        }}
      >
        <div className="mb-4 text-center text-[9px] uppercase tracking-[0.25em] text-[#e8e3d6]/35">
          {String(activeStep + 1).padStart(2, "0")}
        </div>

        <div
          ref={stepRailRef}
          onPointerDown={handleRailPointerDown}
          className="relative h-[42dvh] max-h-[420px] min-h-[220px] w-8 cursor-pointer touch-none"
          role="slider"
          aria-label="Navigazione scene ReFrame"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={activeStep + 1}
          tabIndex={0}
        >
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-blue-400/16" />

          <div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-blue-300/48 transition-all duration-700"
            style={{ height: `${progressPercentage}%` }}
          />

          <div
            className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 border border-[#e8e3d6]/55 bg-blue-300/75 transition-all duration-700 hover:scale-125"
            style={{ top: `${progressPercentage}%` }}
          />

          {steps.map((step, index) => {
            const dotColor =
              index < activeStep
                ? "bg-blue-300/42"
                : index === activeStep
                  ? "bg-yellow-300/70"
                  : "bg-blue-400/22";

            return (
              <span
                key={step.label}
                className={`pointer-events-none absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 ${dotColor}`}
                style={{
                  top: `${(index / (steps.length - 1)) * 100}%`,
                }}
              />
            );
          })}
        </div>

        <div className="mt-4 text-center text-[9px] uppercase tracking-[0.25em] text-[#e8e3d6]/35">
          {String(steps.length).padStart(2, "0")}
        </div>
      </div>

      {/* MOBILE SHORTCUTS */}
      <div
        className="reframe-mobile-shortcuts absolute left-4 z-50 flex gap-2 md:hidden"
        style={{
          bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
        }}
      >
        <button
          onClick={(event) => {
            event.stopPropagation();
            jumpToStep(0);
          }}
          onTouchStart={(event) => event.stopPropagation()}
          onTouchEnd={(event) => event.stopPropagation()}
          className="pointer-events-auto border border-[#e8e3d6]/18 bg-[#11100d]/70 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-[#e8e3d6]/55 backdrop-blur-md transition active:bg-[#e8e3d6] active:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
          type="button"
        >
          ↑ Inizio
        </button>

        <button
          onClick={(event) => {
            event.stopPropagation();
            jumpToStep(steps.length - 1);
          }}
          onTouchStart={(event) => event.stopPropagation()}
          onTouchEnd={(event) => event.stopPropagation()}
          className="pointer-events-auto border border-[#e8e3d6]/18 bg-[#11100d]/70 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-[#e8e3d6]/55 backdrop-blur-md transition active:bg-[#e8e3d6] active:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
          type="button"
        >
          ↓ Fine
        </button>
      </div>
    </main>
  );
}