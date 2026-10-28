"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/animazione-artemis.mp4";
const VIDEO_FPS = 30;
const FAST_SCRUB_FPS = 60;
const START_FRAME = 1;

const frameStops = [30, 60, 119, 155, 185, 240, 345, 395, 544, 604];

const steps = [
  {
    label: "01 / Primo sguardo",
    title: "Ci sono sere in cui basta un bagliore",
    text: "e qualcosa dentro si raddrizza, come se il cielo avesse appena fatto il tuo nome.",
  },
  {
    label: "02 / Attesa",
    title: "Allora resti lì e aspetti",
    text: "perché certe cose, prima di partire davvero, ti insegnano il peso del silenzio.",
  },
  {
    label: "03 / Accensione",
    title: "Poi il fuoco si prende la scena",
    text: "e non sembra rumore, ma volontà pura che si stacca da terra e pretende strada.",
  },
  {
    label: "04 / Distacco",
    title: "A quel punto capisci che non è solo un razzo",
    text: "ma un pezzo di pensiero umano che ha deciso di salire fin dove l’occhio non basta.",
  },
  {
    label: "05 / Apertura",
    title: "Quando il corpo si divide e si dispiega",
    text: "c’è una grazia strana in quei gesti meccanici, come se il vuoto sapesse già come accoglierli.",
  },
  {
    label: "06 / Rotta",
    title: "Intanto la Terra si allontana piano",
    text: "e diventa una palla, quieta, bellissima, di quelle che ti fanno abbassare la voce.",
  },
  {
    label: "07 / Traversata",
    title: "Più avanti c’è solo nero, eppure non fa paura",
    text: "perché dentro quel buio senti lavorare la curiosità, ostinata come una mano tesa.",
  },
  {
    label: "08 / Richiamo",
    title: "E quando compare la Luna non arriva come un traguardo",
    text: "ma come una presenza antica, una vicinanza fredda che ti tira verso di sé.",
  },
  {
    label: "09 / Orbita",
    title: "Ti sorprende il fatto che tutto questo basti",
    text: "un profilo, un’apertura, una traiettoria giusta, e già ti sembra di avere tra le dita l’infinito.",
  },
  {
    label: "10 / Ritorno",
    title: "Poi resti immobile ancora un poco",
    text: "con quella voglia calma di tenerti vicino la forma delle cose che sanno portarti lontano.",
  },
  {
    label: "11 / Dietro l’immagine",
    title: "È da qui che parto anch’io",
    text: "dalla voglia di prendere un’idea complessa e darle una forma chiara, visibile, quasi vicina.",
    type: "bio",
  },
  {
    label: "12 / Andrea",
    title: "Mi occupo di immagini che fanno capire e desiderare",
    text: "tra fotografia, video, 3D e strategie visive, racconto il valore di un progetto prima ancora che venga spiegato.",
    type: "bio",
  },
  {
    label: "13 / Contatto",
    title:
      "Se hai qualcosa che merita di essere raccontato meglio, possiamo parlarne.",
    text: "Render, video, visualizzazioni 3D e presentazioni pensate per rendere un progetto più chiaro, più forte e più memorabile.",
    type: "final",
  },
];

function frameToTime(frame) {
  return frame / VIDEO_FPS;
}

function stepToTargetFrame(stepIndex) {
  if (stepIndex <= 9) return frameStops[stepIndex];
  return frameStops[9];
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

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [phase, setPhase] = useState("visible");
  const [bounce, setBounce] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("down");
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

  function manualDriveToTime(targetTime, speedFps = VIDEO_FPS, freeAfter = false) {
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
    const duration = clamp(
      naturalDuration,
      260,
      speedFps > VIDEO_FPS ? 900 : 2200
    );

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

      if (progress < 1 && now - lastSeekAt >= 1000 / 15) {
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

  function playForwardToTime(targetTime, speedFps = VIDEO_FPS, freeAfter = false) {
    const video = videoRef.current;
    if (!video || !videoReadyRef.current) return;

    stopVideoMotion();

    let safeTargetTime = Math.max(0, targetTime);

    if (video.duration && safeTargetTime > video.duration) {
      safeTargetTime = Math.max(0, video.duration - 0.02);
    }

    const distance = safeTargetTime - video.currentTime;

    if (distance <= 0.012 || prefersReducedMotionRef.current) {
      finishVideoAtTarget(video, safeTargetTime, freeAfter);
      return;
    }

    const rate = clamp(speedFps / VIDEO_FPS, 0.25, 2.2);
    const job = videoMotionJobRef.current;

    video.loop = false;
    video.muted = true;
    video.playbackRate = rate;

    const playPromise = video.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        manualDriveToTime(safeTargetTime, speedFps, freeAfter);
      });
    }

    const fallbackTimeout = window.setTimeout(() => {
      const currentVideo = videoRef.current;

      if (!currentVideo || job !== videoMotionJobRef.current) return;

      if (currentVideo.paused && currentVideo.currentTime < safeTargetTime) {
        manualDriveToTime(safeTargetTime, speedFps, freeAfter);
      }
    }, 160);

    function tick() {
      const currentVideo = videoRef.current;

      if (!currentVideo || job !== videoMotionJobRef.current) {
        clearTimeout(fallbackTimeout);
        return;
      }

      const stopLead = Math.max(0.018, (1 / VIDEO_FPS) * 0.55);

      if (
        currentVideo.currentTime >= safeTargetTime - stopLead ||
        currentVideo.ended ||
        currentVideo.readyState < 2
      ) {
        clearTimeout(fallbackTimeout);
        finishVideoAtTarget(currentVideo, safeTargetTime, freeAfter);
        return;
      }

      videoMotionRafRef.current = requestAnimationFrame(tick);
    }

    videoMotionRafRef.current = requestAnimationFrame(tick);
  }

  function jumpVideoDirectlyToFrame(frame, freeAfter = false) {
    const video = videoRef.current;

    if (!video || !videoReadyRef.current) {
      return;
    }

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

  function driveVideoToTime(
    targetTime,
    speedFps = VIDEO_FPS,
    freeAfter = false,
    mode = "normal"
  ) {
    const video = videoRef.current;
    if (!video || !videoReadyRef.current) return;

    if (mode === "scrub" || prefersReducedMotionRef.current) {
      const targetFrame = Math.round(targetTime * VIDEO_FPS);
      jumpVideoDirectlyToFrame(targetFrame, freeAfter);
      return;
    }

    if (targetTime >= video.currentTime) {
      playForwardToTime(targetTime, speedFps, freeAfter);
    } else {
      manualDriveToTime(targetTime, speedFps, freeAfter);
    }
  }

  function animateVideoToFrame(
    frame,
    speedFps = VIDEO_FPS,
    freeAfter = false,
    mode = "normal"
  ) {
    driveVideoToTime(frameToTime(frame), speedFps, freeAfter, mode);
  }

  function freePlayVideo() {
    const video = videoRef.current;

    if (!video || !videoReadyRef.current) {
      pendingVideoSyncRef.current = {
        stepIndex: desiredStepRef.current,
        mode: "normal",
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

  function syncVideoToStep(stepIndex, mode = "normal", force = false) {
    if (!videoReadyRef.current) {
      pendingVideoSyncRef.current = { stepIndex, mode, force };
      return;
    }

    const targetFrame = stepToTargetFrame(stepIndex);

    if (stepIndex <= 9) {
      pauseFreePlayback();

      animateVideoToFrame(
        targetFrame,
        mode === "scrub" ? FAST_SCRUB_FPS : VIDEO_FPS,
        false,
        mode
      );

      return;
    }

    if (mode === "scrub") {
      pauseFreePlayback();
      animateVideoToFrame(targetFrame, FAST_SCRUB_FPS, true, mode);
      return;
    }

    freePlayVideo();
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

    const startTime = frameToTime(START_FRAME);

    function startSyncedAnimation() {
      video.removeEventListener("seeked", startSyncedAnimation);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const pending = pendingVideoSyncRef.current;

          if (pending) {
            pendingVideoSyncRef.current = null;
            syncVideoToStep(pending.stepIndex, pending.mode, pending.force);
            return;
          }

          syncVideoToStep(desiredStepRef.current, "normal", true);
        });
      });
    }

    video.addEventListener("seeked", startSyncedAnimation, { once: true });
    video.currentTime = startTime;

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

    setBounce(direction === "up" ? -18 : 18);

    setTimeout(() => {
      setBounce(0);
    }, 180);
  }

  function textItemClass() {
    if (phase === "leaving") {
      return transitionDirection === "down"
        ? "opacity-0 -translate-y-4"
        : "opacity-0 translate-y-4";
    }

    if (phase === "entering") {
      return transitionDirection === "down"
        ? "opacity-0 translate-y-4"
        : "opacity-0 -translate-y-4";
    }

    return "opacity-100 translate-y-0";
  }

  function textItemDelay(index) {
    if (prefersReducedMotionRef.current) {
      return { transitionDelay: "0ms" };
    }

    return {
      transitionDelay: `${index * 85}ms`,
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

    textTimeoutARef.current = setTimeout(() => {
      activeStepRef.current = nextStep;
      setActiveStep(nextStep);

      setPhase("entering");

      textTimeoutBRef.current = setTimeout(() => {
        setPhase("visible");
      }, 40);
    }, 330);
  }

  function moveToStep(targetStep, mode = "normal", force = false) {
    const clampedStep = clamp(targetStep, 0, steps.length - 1);
    const currentDesired = desiredStepRef.current;

    const isSameStep =
      clampedStep === currentDesired && clampedStep === activeStepRef.current;

    if (isSameStep && !force) {
      return;
    }

    const direction = clampedStep > currentDesired ? "down" : "up";

    desiredStepRef.current = clampedStep;

    syncVideoToStep(clampedStep, mode, force);

    if (isSameStep && force) {
      return;
    }

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

    moveToStep(next, "normal", false);
  }

  function jumpToStep(targetStep) {
    moveToStep(targetStep, "scrub", true);
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

    touchUnlockTimeoutRef.current = setTimeout(() => {
      touchLockedRef.current = false;
      touchUnlockTimeoutRef.current = null;
    }, 720);
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

    function handleGoStart() {
      jumpToStep(0);
    }

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

      wheelResetTimeoutRef.current = setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 140);

      const threshold = 75;
      const accumulated = wheelAccumulatorRef.current;

      if (Math.abs(accumulated) < threshold) return;

      const direction = accumulated > 0 ? "down" : "up";

      wheelAccumulatorRef.current = 0;
      wheelLockedRef.current = true;

      goRelative(direction);

      if (wheelUnlockTimeoutRef.current) {
        clearTimeout(wheelUnlockTimeoutRef.current);
      }

      wheelUnlockTimeoutRef.current = setTimeout(() => {
        wheelLockedRef.current = false;
        wheelUnlockTimeoutRef.current = null;
      }, 720);
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

    window.addEventListener("artemis:go-start", handleGoStart);
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

      window.removeEventListener("artemis:go-start", handleGoStart);
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
  const isBio = current.type === "bio";
  const isFinal = current.type === "final";

  const progressPercentage =
    steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0;

  return (
    <main
      ref={mainRef}
      aria-label="Home interattiva Exploring Space"
      className="home-main fixed inset-0 isolate overflow-hidden bg-[#11100d] text-[#e8e3d6]"
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
        .home-desktop-quick-nav {
          display: none;
        }

        .home-stage {
          height: 100dvh;
          min-height: 100svh;
          padding-top: calc(6.1rem + env(safe-area-inset-top));
          padding-right: max(1rem, calc(1rem + env(safe-area-inset-right)));
          padding-bottom: calc(5.2rem + env(safe-area-inset-bottom));
          padding-left: max(1rem, calc(1rem + env(safe-area-inset-left)));
        }

        .home-grid {
          display: grid;
          height: 100%;
          width: 100%;
          grid-template-rows: minmax(0, auto) minmax(130px, 34dvh) auto;
          align-items: center;
          gap: clamp(0.75rem, 2dvh, 1.25rem);
        }

        @media (min-width: 768px) {
          .home-stage {
            padding-top: calc(6.9rem + env(safe-area-inset-top));
            padding-right: max(2.5rem, calc(2.5rem + env(safe-area-inset-right)));
            padding-bottom: calc(5rem + env(safe-area-inset-bottom));
            padding-left: max(2.5rem, calc(2.5rem + env(safe-area-inset-left)));
          }

          .home-grid {
            grid-template-rows: minmax(0, auto) minmax(190px, 42dvh) auto;
          }
        }

        @media (min-width: 1024px) and (min-height: 760px) {
          .home-stage {
            padding-right: max(4rem, calc(4rem + env(safe-area-inset-right)));
            padding-left: max(4rem, calc(4rem + env(safe-area-inset-left)));
          }

          .home-grid {
            grid-template-rows: minmax(0, auto) minmax(260px, 48dvh) auto;
          }
        }

        @media (min-width: 1280px) and (min-height: 860px) {
          .home-desktop-quick-nav {
            display: flex;
          }
        }

        @media (max-height: 700px) {
          .home-stage {
            padding-top: calc(4.7rem + env(safe-area-inset-top));
            padding-bottom: calc(3.7rem + env(safe-area-inset-bottom));
          }

          .home-grid {
            grid-template-rows: minmax(0, auto) minmax(105px, 1fr) auto;
            gap: 0.7rem;
          }

          .home-copy {
            margin-top: 0.65rem;
          }

          .home-video-frame {
            padding: 0.55rem;
          }
        }

        @media (max-width: 767px) and (max-height: 680px) {
          .home-stage {
            padding-top: calc(4.65rem + env(safe-area-inset-top));
            padding-bottom: calc(4.85rem + env(safe-area-inset-bottom));
          }

          .home-grid {
            grid-template-rows: minmax(0, auto) minmax(96px, 30dvh) auto;
            gap: 0.65rem;
          }

          .home-label {
            margin-bottom: 0.45rem;
          }

          .home-copy {
            max-width: 34rem;
            font-size: 10px;
            line-height: 1.55;
          }

          .home-actions a {
            padding: 0.75rem 0.85rem;
            font-size: 8px;
            letter-spacing: 0.2em;
          }
        }

        @media (max-height: 520px) and (orientation: landscape) {
          .home-stage {
            padding-top: calc(3.8rem + env(safe-area-inset-top));
            padding-right: max(4.25rem, calc(1rem + env(safe-area-inset-right) + 3.25rem));
            padding-bottom: calc(0.9rem + env(safe-area-inset-bottom));
            padding-left: max(1rem, calc(1rem + env(safe-area-inset-left)));
          }

          .home-grid {
            grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
            grid-template-rows: minmax(0, 1fr) auto;
            gap: 0.75rem 1rem;
          }

          .home-text {
            margin-left: 0;
            margin-right: 0;
            text-align: left;
          }

          .home-video-row {
            grid-column: 2;
            grid-row: 1 / 3;
            min-height: 0;
          }

          .home-actions {
            justify-content: flex-start;
            margin-left: 0;
            margin-right: 0;
          }

          .home-title {
            max-width: 100%;
            font-size: clamp(1.55rem, 8dvh, 3rem);
            line-height: 0.94;
          }

          .home-copy {
            max-width: 34rem;
            font-size: 10px;
          }

          .home-mobile-quick-nav,
          .home-step-rail,
          .home-progress-count {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-main *,
          .home-main *::before,
          .home-main *::after {
            transition-duration: 1ms !important;
            animation-duration: 1ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <p className="sr-only">
        Home interattiva. Usa la rotella, lo swipe verticale, le frecce della
        tastiera o i pulsanti per avanzare tra le scene.
      </p>

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#e8e3d6_1px,transparent_1px),linear-gradient(to_bottom,#e8e3d6_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(17,16,13,0.05)_0%,rgba(17,16,13,0.46)_45%,rgba(17,16,13,0.98)_100%)]" />

      {/* MAIN LAYOUT */}
      <section
        className="home-stage relative z-10 flex items-center justify-center"
        style={{ transform: `translateY(${-bounce}px)` }}
      >
        <div className="home-grid max-w-7xl">
          {/* TEXT */}
          <div className="home-text mx-auto max-w-5xl text-center" aria-live="polite">
            <p
              className={`home-label mb-3 text-[8px] uppercase tracking-[0.36em] text-[#e8e3d6]/36 transition-all duration-500 ease-out md:text-[9px] ${textItemClass()}`}
              style={textItemDelay(0)}
            >
              {current.label}
            </p>

            <h1
              className={`home-title mx-auto font-semibold tracking-[-0.065em] text-[#e8e3d6] transition-all duration-500 ease-out ${textItemClass()} ${
                isFinal
                  ? "max-w-5xl text-[clamp(30px,5vw,70px)] leading-[0.92]"
                  : isBio
                    ? "max-w-4xl text-[clamp(28px,4.7vw,64px)] leading-[0.94]"
                    : "max-w-4xl text-[clamp(30px,5.2vw,76px)] leading-[0.9]"
              }`}
              style={textItemDelay(1)}
            >
              {current.title}
            </h1>

            <p
              className={`home-copy mx-auto mt-4 max-w-2xl leading-relaxed text-[#e8e3d6]/58 transition-all duration-500 ease-out ${textItemClass()} ${
                isBio || isFinal
                  ? "text-xs md:text-base"
                  : "text-[10px] uppercase tracking-[0.18em] md:text-[11px] md:tracking-[0.2em]"
              }`}
              style={textItemDelay(2)}
            >
              {current.text}
            </p>
          </div>

          {/* VIDEO FRAME */}
          <div className="home-video-row mx-auto flex h-full min-h-0 w-full max-w-6xl items-center justify-center">
            <div className="home-video-frame relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden border border-[#e8e3d6]/14 bg-[#050505]/55 p-3 shadow-[0_0_90px_rgba(0,0,0,0.62)] backdrop-blur-sm md:p-5">
              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,16,13,0.05)_52%,rgba(17,16,13,0.34)_100%)]" />

              {!videoFailed && (
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  className={`relative z-0 h-full w-full object-contain transition-[opacity,filter] duration-150 ease-out ${
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
                      Il racconto resta navigabile. Puoi continuare a esplorare
                      le scene oppure aprire direttamente portfolio e servizi.
                    </p>

                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                      <Link
                        href="/portfolio"
                        className="pointer-events-auto border border-[#e8e3d6]/28 px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#e8e3d6]/76 transition hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
                      >
                        Portfolio
                      </Link>

                      <Link
                        href="/servizi"
                        className="pointer-events-auto border border-[#e8e3d6]/16 px-5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#e8e3d6]/52 transition hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/50"
                      >
                        Servizi
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="pointer-events-none absolute left-3 top-3 z-30 text-[8px] uppercase tracking-[0.28em] text-[#e8e3d6]/30 md:left-5 md:top-5">
                Exploring Space
              </div>

              <div className="pointer-events-none absolute bottom-3 right-3 z-30 text-[8px] uppercase tracking-[0.26em] text-[#e8e3d6]/32 md:bottom-5 md:right-5">
                {String(activeStep + 1).padStart(2, "0")} / {steps.length}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="home-actions mx-auto flex flex-wrap justify-center gap-3">
            {isFinal ? (
              <>
                <a
                  href="mailto:andreacastellazzo@gmail.com"
                  className="pointer-events-auto border border-[#e8e3d6]/28 bg-[#11100d]/58 px-5 py-3 text-center text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/76 backdrop-blur-md transition hover:border-[#e8e3d6]/70 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/70"
                >
                  Scrivimi
                </a>

                <Link
                  href="/portfolio"
                  className="pointer-events-auto border border-[#e8e3d6]/16 bg-[#11100d]/42 px-5 py-3 text-center text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/52 backdrop-blur-md transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
                >
                  Portfolio
                </Link>

                <Link
                  href="/servizi"
                  className="pointer-events-auto border border-[#e8e3d6]/16 bg-[#11100d]/42 px-5 py-3 text-center text-[9px] uppercase tracking-[0.26em] text-[#e8e3d6]/52 backdrop-blur-md transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
                >
                  Servizi
                </Link>
              </>
            ) : (
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

                <Link
                  href="/portfolio"
                  className="pointer-events-auto border border-[#e8e3d6]/16 bg-[#11100d]/42 px-4 py-3 text-center text-[9px] uppercase tracking-[0.22em] text-[#e8e3d6]/52 backdrop-blur-md transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
                >
                  Portfolio
                </Link>

                <Link
                  href="/servizi"
                  className="pointer-events-auto border border-[#e8e3d6]/16 bg-[#11100d]/42 px-4 py-3 text-center text-[9px] uppercase tracking-[0.22em] text-[#e8e3d6]/52 backdrop-blur-md transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
                >
                  Servizi
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {!isFinal && (
        <div className="home-desktop-quick-nav absolute left-8 z-30 gap-3">
          <button
            onClick={() => jumpToStep(0)}
            className="pointer-events-auto border border-[#e8e3d6]/25 bg-[#11100d] px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#e8e3d6]/70 transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
            style={{
              bottom: "calc(7rem + env(safe-area-inset-bottom))",
            }}
            type="button"
          >
            Inizio
          </button>

          <button
            onClick={() => jumpToStep(10)}
            className="pointer-events-auto border border-[#e8e3d6]/25 bg-[#11100d] px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#e8e3d6]/70 transition hover:border-[#e8e3d6]/60 hover:bg-[#e8e3d6] hover:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
            type="button"
          >
            Profilo
          </button>
        </div>
      )}

      {!isFinal && (
        <div className="home-mobile-quick-nav absolute left-4 z-50 flex gap-2 md:hidden">
          <button
            onClick={(event) => {
              event.stopPropagation();
              jumpToStep(0);
            }}
            onTouchStart={(event) => event.stopPropagation()}
            onTouchEnd={(event) => event.stopPropagation()}
            className="pointer-events-auto border border-[#e8e3d6]/18 bg-[#11100d]/70 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-[#e8e3d6]/55 backdrop-blur-md transition active:bg-[#e8e3d6] active:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
            style={{
              bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
            }}
            type="button"
          >
            ↑ Inizio
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              jumpToStep(10);
            }}
            onTouchStart={(event) => event.stopPropagation()}
            onTouchEnd={(event) => event.stopPropagation()}
            className="pointer-events-auto border border-[#e8e3d6]/18 bg-[#11100d]/70 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-[#e8e3d6]/55 backdrop-blur-md transition active:bg-[#e8e3d6] active:text-[#11100d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e3d6]/60"
            style={{
              bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
            }}
            type="button"
          >
            ↓ Bio
          </button>
        </div>
      )}

      <div
        className="home-step-rail absolute top-1/2 z-50 hidden -translate-y-1/2 md:block"
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
          aria-label="Navigazione scene"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={activeStep + 1}
          tabIndex={0}
        >
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-blue-400/16" />

          <div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-red-400/35"
            style={{ height: `${progressPercentage}%` }}
          />

          <div
            className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 border border-[#e8e3d6]/55 bg-yellow-300/65 transition-transform hover:scale-125"
            style={{ top: `${progressPercentage}%` }}
          />

          {steps.map((step, index) => {
            const dotColor =
              index < activeStep
                ? "bg-red-400/38"
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

      <div
        className={`home-progress-count absolute z-50 text-[10px] tracking-[0.25em] md:text-xs ${
          isFinal ? "text-[#e8e3d6]/50" : "text-[#e8e3d6]/35"
        }`}
        style={{
          right: "max(1.25rem, calc(1.25rem + env(safe-area-inset-right)))",
          bottom: "calc(1.75rem + env(safe-area-inset-bottom))",
        }}
      >
        {String(activeStep + 1).padStart(2, "0")} / {steps.length}
      </div>
    </main>
  );
}