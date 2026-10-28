"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/Artemis-03-old.mp4";
const VIDEO_FPS = 30;
const SCRUB_FPS = 42;

const frameStops = [0, 60, 120, 180, 240, 300, 360, 510, 600, 690, 780];

const artemisSteps = [
  {
    label: "01 / Conto alla rovescia",
    title: "Ci sono notti in cui tutto resta quasi al buio",
    text: "e tu, con gli occhi al cielo da sempre, senti che anche dieci secondi possono contenere una vita intera.",
  },
  {
    label: "02 / Decollo",
    title: "Poi arriva il momento in cui bisogna salire",
    text: "non per fuggire da terra, ma per capire se il desiderio che ti porti dentro sa davvero prendere quota.",
  },
  {
    label: "03 / Spinta",
    title: "Le prime forze ti accompagnano più di quanto credi",
    text: "finché a un certo punto si staccano, e capisci che non tutto ciò che ti ha aiutato può venire con te.",
  },
  {
    label: "04 / Alleggerirsi",
    title: "Anche le protezioni, quando hanno finito il loro compito, vanno gettate via",
    text: "e resti più esposto, sì, ma anche più vero.",
  },
  {
    label: "05 / Distacco",
    title: "C’è un istante in cui lasci andare perfino ciò che ti ha sollevato",
    text: "ed è lì che cominci a intuire quanto sia sottile il confine tra sentirsi persi e diventare finalmente propri.",
  },
  {
    label: "06 / Apertura",
    title: "Allora qualcosa in te si apre alla luce",
    text: "come se per andare lontano non servisse più spingere, ma imparare a raccogliere ciò che il cielo ti offre.",
  },
  {
    label: "07 / Solitudine",
    title: "Poi rimani solo con la tua rotta",
    text: "senza appigli inutili, senza rumori attorno, solo tu e quella domanda ostinata su quale posto ti aspetti nell’universo.",
  },
  {
    label: "08 / Scelta",
    title: "E quando arriva la spinta decisiva non assomiglia a un colpo di scena",
    text: "ma a una volontà quieta, quella con cui smetti di girare intorno alle cose e scegli di andare incontro a ciò che ti chiama.",
  },
  {
    label: "09 / Attraversamento",
    title: "Nel nero tra un mondo e l’altro impari a pensare meglio",
    text: "perché lontano dal frastuono le domande diventano più pulite, e anche tu ti fai più piccolo, ma più nitido.",
  },
  {
    label: "10 / Soglia",
    title: "Quando passi vicino a ciò che hai sempre guardato da lontano",
    text: "non provi conquista, ma una specie di rispetto antico, come se il mistero ti stesse dicendo di non smettere mai di cercare.",
  },
  {
    label: "11 / Ritorno",
    title: "E mentre la strada di casa ricompare in silenzio",
    text: "capisci che il tuo posto forse non è un punto fermo, ma il modo in cui continui a guardare l’infinito restando umano.",
  },
  {
    label: "12 / Andrea Castellazzo",
    title: "Andrea Castellazzo",
    text: "Visual designer, fotografo, videomaker e 3D artist.",
    type: "final",
  },
];

function frameToTime(frame) {
  return frame / VIDEO_FPS;
}

function stepToTargetFrame(stepIndex) {
  if (stepIndex <= frameStops.length - 1) return frameStops[stepIndex];
  return frameStops[frameStops.length - 1];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function isInteractiveTarget(target) {
  return Boolean(
    target?.closest?.(
      "a, button, input, textarea, select, option, [role='button'], [data-allow-touch]"
    )
  );
}

export default function ArtemisProjectPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [phase, setPhase] = useState("visible");
  const [transitionDirection, setTransitionDirection] = useState("down");
  const [loaded, setLoaded] = useState(false);
  const [bounce, setBounce] = useState(0);
  const [videoJumping, setVideoJumping] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

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

  const videoRef = useRef(null);
  const videoReadyRef = useRef(false);
  const videoInitializedRef = useRef(false);
  const videoMotionRafRef = useRef(null);
  const videoMotionJobRef = useRef(0);
  const pendingVideoSyncRef = useRef(null);
  const videoJumpTimeoutRef = useRef(null);

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

  function clearVideoJumpTimer() {
    if (videoJumpTimeoutRef.current) {
      clearTimeout(videoJumpTimeoutRef.current);
      videoJumpTimeoutRef.current = null;
    }
  }

  function stopVideoMotion() {
    if (videoMotionRafRef.current) {
      cancelAnimationFrame(videoMotionRafRef.current);
      videoMotionRafRef.current = null;
    }

    videoMotionJobRef.current += 1;

    const video = videoRef.current;

    if (video) {
      video.pause();
      video.playbackRate = 1;
      video.loop = false;
      video.muted = true;
    }
  }

  function safeTimeForFrame(frame) {
    const video = videoRef.current;
    let targetTime = frameToTime(frame);

    if (video?.duration && targetTime > video.duration) {
      targetTime = Math.max(0, video.duration - 0.02);
    }

    return Math.max(0, targetTime);
  }

  function finishVideoAtTarget(video, safeTargetTime, freeAfter = false) {
    if (!video) return;

    const oneFrame = 1 / VIDEO_FPS;
    const drift = Math.abs(video.currentTime - safeTargetTime);

    video.pause();
    video.playbackRate = 1;
    video.loop = false;
    video.muted = true;

    if (drift > oneFrame * 1.15) {
      video.currentTime = safeTargetTime;
    }

    videoMotionRafRef.current = null;

    if (freeAfter) {
      freePlayVideo();
    }
  }

  function manualDriveToTime(targetTime, speedFps = SCRUB_FPS, freeAfter = false) {
    const video = videoRef.current;
    if (!video || !videoReadyRef.current) return;

    stopVideoMotion();

    let safeTargetTime = Math.max(0, targetTime);

    if (video.duration && safeTargetTime > video.duration) {
      safeTargetTime = Math.max(0, video.duration - 0.02);
    }

    const startTime = video.currentTime;
    const distance = Math.abs(safeTargetTime - startTime);

    if (distance <= 0.012 || prefersReducedMotionRef.current) {
      finishVideoAtTarget(video, safeTargetTime, freeAfter);
      return;
    }

    const naturalDuration = distance * 1000 * (VIDEO_FPS / speedFps);
    const duration = clamp(naturalDuration, 420, 1600);

    const startPerformance = performance.now();
    const job = videoMotionJobRef.current;
    let lastSeekAt = 0;

    video.pause();
    video.playbackRate = 1;
    video.loop = false;
    video.muted = true;

    function tick(now) {
      const currentVideo = videoRef.current;

      if (!currentVideo || job !== videoMotionJobRef.current) return;

      const progress = clamp((now - startPerformance) / duration, 0, 1);
      const eased = easeInOutCubic(progress);

      if (progress < 1 && now - lastSeekAt >= 1000 / 18) {
        currentVideo.currentTime =
          startTime + (safeTargetTime - startTime) * eased;

        lastSeekAt = now;
      }

      if (progress >= 1) {
        finishVideoAtTarget(currentVideo, safeTargetTime, freeAfter);
        return;
      }

      videoMotionRafRef.current = requestAnimationFrame(tick);
    }

    videoMotionRafRef.current = requestAnimationFrame(tick);
  }

  function jumpVideoDirectlyToFrame(frame, freeAfter = false) {
    const video = videoRef.current;

    if (!video || !videoReadyRef.current) return;

    stopVideoMotion();
    clearVideoJumpTimer();

    const targetTime = safeTimeForFrame(frame);

    video.pause();
    video.playbackRate = 1;
    video.loop = false;
    video.muted = true;

    setVideoJumping(true);
    video.currentTime = targetTime;

    videoJumpTimeoutRef.current = window.setTimeout(() => {
      setVideoJumping(false);
      videoJumpTimeoutRef.current = null;

      if (freeAfter) {
        freePlayVideo();
      }
    }, prefersReducedMotionRef.current ? 10 : 180);
  }

  function freePlayVideo() {
    const video = videoRef.current;

    if (!video || !videoReadyRef.current) {
      pendingVideoSyncRef.current = {
        stepIndex: desiredStepRef.current,
        force: true,
      };
      return;
    }

    stopVideoMotion();
    clearVideoJumpTimer();
    setVideoJumping(false);

    video.loop = false;
    video.muted = true;
    video.playbackRate = 1;

    if (video.duration && video.currentTime >= video.duration - 0.05) {
      video.pause();
      return;
    }

    if (prefersReducedMotionRef.current) {
      video.pause();
      return;
    }

    video.play().catch(() => {});
  }

  function pauseFreePlayback() {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.playbackRate = 1;
  }

  function syncVideoToStep(stepIndex, force = false) {
    if (!videoReadyRef.current) {
      pendingVideoSyncRef.current = { stepIndex, force };
      return;
    }

    const isFinal = artemisSteps[stepIndex]?.type === "final";
    const targetFrame = isFinal
      ? frameStops[frameStops.length - 1]
      : stepToTargetFrame(stepIndex);

    const targetTime = safeTimeForFrame(targetFrame);

    pauseFreePlayback();

    if (force || prefersReducedMotionRef.current) {
      jumpVideoDirectlyToFrame(targetFrame, isFinal);
      return;
    }

    manualDriveToTime(targetTime, isFinal ? VIDEO_FPS : SCRUB_FPS, isFinal);
  }

  function initializeVideoOnce() {
    const video = videoRef.current;
    if (!video) return;

    if (videoInitializedRef.current) return;
    if (video.readyState < 1) return;

    videoInitializedRef.current = true;
    videoReadyRef.current = true;

    setVideoReady(true);
    setVideoFailed(false);

    video.loop = false;
    video.muted = true;
    video.playbackRate = 1;
    video.pause();

    function startSyncedAnimation() {
      video.removeEventListener("seeked", startSyncedAnimation);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const pending = pendingVideoSyncRef.current;

          if (pending) {
            pendingVideoSyncRef.current = null;
            syncVideoToStep(pending.stepIndex, pending.force);
            return;
          }

          syncVideoToStep(desiredStepRef.current, true);
        });
      });
    }

    video.addEventListener("seeked", startSyncedAnimation, { once: true });
    video.currentTime = safeTimeForFrame(frameStops[0]);

    window.setTimeout(() => {
      if (!videoMotionRafRef.current && desiredStepRef.current === 0) {
        startSyncedAnimation();
      }
    }, 240);
  }

  function handleVideoError() {
    stopVideoMotion();
    clearVideoJumpTimer();

    videoReadyRef.current = false;
    videoInitializedRef.current = false;

    setVideoReady(false);
    setVideoFailed(true);
    setVideoJumping(false);
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
    const clampedStep = clamp(targetStep, 0, artemisSteps.length - 1);
    const currentDesired = desiredStepRef.current;

    const isSameStep =
      clampedStep === currentDesired && clampedStep === activeStepRef.current;

    if (isSameStep && !force) return;

    const direction = clampedStep > currentDesired ? "down" : "up";

    desiredStepRef.current = clampedStep;

    syncVideoToStep(clampedStep, force);

    if (isSameStep && force) return;

    setStepWithAnimation(clampedStep, direction);
  }

  function goRelative(direction) {
    const current = desiredStepRef.current;
    const isFirst = current === 0;
    const isLast = current === artemisSteps.length - 1;

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
        ? clamp(current + 1, 0, artemisSteps.length - 1)
        : clamp(current - 1, 0, artemisSteps.length - 1);

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

    return Math.round(progress * (artemisSteps.length - 1));
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
        jumpToStep(artemisSteps.length - 1);
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

    const video = videoRef.current;
    if (video) {
      video.load();
    }

    return () => {
      window.clearTimeout(loadTimer);

      clearTextTimers();
      clearVideoJumpTimer();
      stopVideoMotion();

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

  const current = artemisSteps[activeStep];
  const isFinal = current.type === "final";

  const progressPercentage =
    artemisSteps.length > 1
      ? (activeStep / (artemisSteps.length - 1)) * 100
      : 0;

  return (
    <main
      ref={mainRef}
      aria-label="Pagina progetto Artemis II"
      className="artemis-main fixed inset-0 isolate overflow-hidden bg-[#11100d] text-[#e8e3d6]"
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
        .artemis-stage {
          height: 100dvh;
          min-height: 100svh;
          padding-top: calc(6.1rem + env(safe-area-inset-top));
          padding-right: max(1rem, calc(1rem + env(safe-area-inset-right)));
          padding-bottom: calc(5.2rem + env(safe-area-inset-bottom));
          padding-left: max(1rem, calc(1rem + env(safe-area-inset-left)));
        }

        .artemis-grid {
          display: grid;
          height: 100%;
          width: 100%;
          grid-template-rows: minmax(0, auto) minmax(130px, 34dvh) auto;
          align-items: center;
          gap: clamp(0.75rem, 2dvh, 1.25rem);
        }

        @media (min-width: 768px) {
          .artemis-stage {
            padding-top: calc(6.9rem + env(safe-area-inset-top));
            padding-right: max(2.5rem, calc(2.5rem + env(safe-area-inset-right)));
            padding-bottom: calc(5rem + env(safe-area-inset-bottom));
            padding-left: max(2.5rem, calc(2.5rem + env(safe-area-inset-left)));
          }

          .artemis-grid {
            grid-template-rows: minmax(0, auto) minmax(190px, 42dvh) auto;
          }
        }

        @media (min-width: 1024px) and (min-height: 760px) {
          .artemis-stage {
            padding-right: max(4rem, calc(4rem + env(safe-area-inset-right)));
            padding-left: max(4rem, calc(4rem + env(safe-area-inset-left)));
          }

          .artemis-grid {
            grid-template-rows: minmax(0, auto) minmax(260px, 48dvh) auto;
          }
        }

        @media (max-height: 700px) {
          .artemis-stage {
            padding-top: calc(4.7rem + env(safe-area-inset-top));
            padding-bottom: calc(3.7rem + env(safe-area-inset-bottom));
          }

          .artemis-grid {
            grid-template-rows: minmax(0, auto) minmax(105px, 1fr) auto;
            gap: 0.7rem;
          }

          .artemis-copy {
            margin-top: 0.65rem;
          }

          .artemis-video-frame {
            padding: 0.55rem;
          }
        }

        @media (max-width: 767px) and (max-height: 680px) {
          .artemis-stage {
            padding-top: calc(4.65rem + env(safe-area-inset-top));
            padding-bottom: calc(4.85rem + env(safe-area-inset-bottom));
          }

          .artemis-grid {
            grid-template-rows: minmax(0, auto) minmax(96px, 30dvh) auto;
            gap: 0.65rem;
          }

          .artemis-label {
            margin-bottom: 0.45rem;
          }

          .artemis-copy {
            max-width: 34rem;
            font-size: 10px;
            line-height: 1.55;
          }

          .artemis-actions a,
          .artemis-actions button {
            padding: 0.75rem 0.85rem;
            font-size: 8px;
            letter-spacing: 0.2em;
          }
        }

        @media (max-height: 520px) and (orientation: landscape) {
          .artemis-stage {
            padding-top: calc(3.8rem + env(safe-area-inset-top));
            padding-right: max(4.25rem, calc(1rem + env(safe-area-inset-right) + 3.25rem));
            padding-bottom: calc(0.9rem + env(safe-area-inset-bottom));
            padding-left: max(1rem, calc(1rem + env(safe-area-inset-left)));
          }

          .artemis-grid {
            grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
            grid-template-rows: minmax(0, 1fr) auto;
            gap: 0.75rem 1rem;
          }

          .artemis-text {
            margin-left: 0;
            margin-right: 0;
            text-align: left;
          }

          .artemis-video-row {
            grid-column: 2;
            grid-row: 1 / 3;
            min-height: 0;
          }

          .artemis-actions {
            justify-content: flex-start;
            margin-left: 0;
            margin-right: 0;
          }

          .artemis-title {
            max-width: 100%;
            font-size: clamp(1.55rem, 8dvh, 3rem);
            line-height: 0.94;
          }

          .artemis-copy {
            max-width: 34rem;
            font-size: 10px;
          }

          .artemis-mobile-shortcuts,
          .artemis-step-rail {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .artemis-main *,
          .artemis-main *::before,
          .artemis-main *::after {
            transition-duration: 1ms !important;
            animation-duration: 1ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <p className="sr-only">
        Pagina progetto interattiva su Artemis II. Usa rotella, swipe verticale,
        frecce della tastiera o pulsanti per avanzare tra le scene.
      </p>

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.055]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#e8e3d6_1px,transparent_1px),linear-gradient(to_bottom,#e8e3d6_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(17,16,13,0.05)_0%,rgba(17,16,13,0.46)_45%,rgba(17,16,13,0.98)_100%)]" />

      {/* INITIAL UNVEIL */}
      <div
        className={`pointer-events-none absolute inset-0 z-[90] bg-[#11100d] transition-transform duration-[2200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          loaded ? "-translate-y-full" : "translate-y-0"
        }`}
      />

      {/* MAIN LAYOUT */}
      <section
        className="artemis-stage relative z-10 flex items-center justify-center"
        style={{ transform: `translateY(${-bounce}px)` }}
      >
        <div className="artemis-grid max-w-7xl">
          {/* TEXT */}
          <div
            className="artemis-text mx-auto max-w-4xl text-center"
            aria-live="polite"
          >
            <p
              className={`artemis-label mb-3 text-[8px] uppercase tracking-[0.36em] text-[#e8e3d6]/36 transition-all duration-[1100ms] ease-out md:text-[9px] ${textItemClass()}`}
              style={textItemDelay(0)}
            >
              {current.label}
            </p>

            <h1
              className={`artemis-title text-[clamp(32px,5.4vw,78px)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#e8e3d6] transition-all duration-[1200ms] ease-out ${textItemClass()}`}
              style={textItemDelay(1)}
            >
              {current.title}
            </h1>

            <p
              className={`artemis-copy mx-auto mt-4 max-w-xl text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#e8e3d6]/56 transition-all duration-[1200ms] ease-out md:text-[11px] md:tracking-[0.2em] ${textItemClass()}`}
              style={textItemDelay(2)}
            >
              {current.text}
            </p>
          </div>

          {/* VIDEO FRAME */}
          <div className="artemis-video-row mx-auto flex h-full min-h-0 w-full max-w-6xl items-center justify-center">
            <div className="artemis-video-frame relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden border border-[#e8e3d6]/14 bg-[#050505]/55 p-3 shadow-[0_0_90px_rgba(0,0,0,0.62)] backdrop-blur-sm md:p-5">
              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,16,13,0.05)_52%,rgba(17,16,13,0.34)_100%)]" />

              {!videoFailed && (
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  className={`relative z-0 h-full w-full object-contain transition-[opacity,filter] duration-[500ms] ease-out ${
                    videoJumping ? "opacity-75 blur-[1px]" : "opacity-100 blur-0"
                  }`}
                  muted
                  playsInline
                  preload="auto"
                  onLoadedMetadata={initializeVideoOnce}
                  onLoadedData={initializeVideoOnce}
                  onCanPlay={initializeVideoOnce}
                  onError={handleVideoError}
                />
              )}

              {!videoReady && !videoFailed && (
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#11100d]/42 text-center backdrop-blur-[1px]">
                  <p className="max-w-xs px-6 text-[9px] uppercase leading-relaxed tracking-[0.26em] text-[#e8e3d6]/48">
                    Caricamento visualizzazione
                  </p>
                </div>
              )}

              {videoFailed && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#11100d]/72 p-6 text-center">
                  <div className="max-w-md">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-red-400">
                      Video non disponibile
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-[#e8e3d6]/62 md:text-base">
                      Il progetto resta navigabile. Puoi continuare a leggere le
                      scene oppure tornare al portfolio.
                    </p>

                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                      <Link
                        href="/portfolio"
                        className="pointer-events-auto border border-[#e8e3d6]/28 px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#e8e3d6]/76 transition hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
                      >
                        Portfolio
                      </Link>

                      <a
                        href="mailto:andreacastellazzo@gmail.com"
                        className="pointer-events-auto border border-[#e8e3d6]/16 px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#e8e3d6]/52 transition hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/50"
                      >
                        Scrivimi
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="pointer-events-none absolute left-3 top-3 z-30 text-[8px] uppercase tracking-[0.28em] text-[#e8e3d6]/30 md:left-5 md:top-5">
                Artemis II
              </div>

              <div className="pointer-events-none absolute bottom-3 right-3 z-30 text-[8px] uppercase tracking-[0.26em] text-[#e8e3d6]/32 md:bottom-5 md:right-5">
                {String(activeStep + 1).padStart(2, "0")} /{" "}
                {artemisSteps.length}
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="artemis-actions mx-auto flex flex-wrap justify-center gap-3">
            {!isFinal && (
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

            <Link
              href="/portfolio"
              className="pointer-events-auto border border-[#e8e3d6]/28 bg-[#11100d]/58 px-5 py-3 text-center text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/76 backdrop-blur-md transition hover:border-[#e8e3d6]/70 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/70"
            >
              Portfolio
            </Link>

            <a
              href="mailto:andreacastellazzo@gmail.com"
              className="pointer-events-auto border border-[#e8e3d6]/16 bg-[#11100d]/42 px-5 py-3 text-center text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/52 backdrop-blur-md transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
            >
              Scrivimi
            </a>
          </div>
        </div>
      </section>

      {/* DESKTOP STEP RAIL */}
      <div
        className="artemis-step-rail absolute top-1/2 z-50 hidden -translate-y-1/2 md:block"
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
          aria-label="Navigazione scene Artemis II"
          aria-valuemin={1}
          aria-valuemax={artemisSteps.length}
          aria-valuenow={activeStep + 1}
          tabIndex={0}
        >
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-blue-400/16" />

          <div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-red-400/42 transition-all duration-700"
            style={{ height: `${progressPercentage}%` }}
          />

          <div
            className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 border border-[#e8e3d6]/55 bg-yellow-300/70 transition-all duration-700 hover:scale-125"
            style={{ top: `${progressPercentage}%` }}
          />

          {artemisSteps.map((step, index) => {
            const dotColor =
              index < activeStep
                ? "bg-red-400/42"
                : index === activeStep
                  ? "bg-yellow-300/70"
                  : "bg-blue-400/22";

            return (
              <span
                key={step.label}
                className={`pointer-events-none absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 ${dotColor}`}
                style={{
                  top: `${(index / (artemisSteps.length - 1)) * 100}%`,
                }}
              />
            );
          })}
        </div>

        <div className="mt-4 text-center text-[9px] uppercase tracking-[0.25em] text-[#e8e3d6]/35">
          {String(artemisSteps.length).padStart(2, "0")}
        </div>
      </div>

      {/* MOBILE SHORTCUTS */}
      {!isFinal && (
        <div
          className="artemis-mobile-shortcuts absolute left-4 z-50 flex gap-2 md:hidden"
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
              jumpToStep(artemisSteps.length - 1);
            }}
            onTouchStart={(event) => event.stopPropagation()}
            onTouchEnd={(event) => event.stopPropagation()}
            className="pointer-events-auto border border-[#e8e3d6]/18 bg-[#11100d]/70 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-[#e8e3d6]/55 backdrop-blur-md transition active:bg-[#e8e3d6] active:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
            type="button"
          >
            ↓ Fine
          </button>
        </div>
      )}
    </main>
  );
}