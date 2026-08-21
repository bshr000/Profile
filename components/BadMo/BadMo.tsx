"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  BADMO_ACTIONS,
  BADMO_EVENTS,
  BADMO_SPRITE,
  DEFAULT_DIALOGUES,
  SPRITE_ANIMATIONS,
  getFramePosition,
  getLookFrame,
  getPageProfile,
  pickInteractionAction,
  type BadMoActionId,
  type BadMoMood,
} from "./animations";
import styles from "./BadMo.module.css";

const DEFAULT_STORAGE_KEY = "badmo-interaction-count";
const POINTER_REACTION_DISTANCE = 176;

export interface BadMoInteractionDetail {
  action: Exclude<BadMoActionId, "idle">;
  count: number;
  mood: BadMoMood;
  pathname: string;
}

export interface BadMoHandle {
  getInteractionCount: () => number;
  play: (action: Exclude<BadMoActionId, "idle">, message?: string) => void;
  say: (message: string) => void;
}

export interface BadMoProps {
  className?: string;
  dialogues?: readonly string[];
  interactionStorageKey?: string;
  mood?: BadMoMood;
  onActionChange?: (action: BadMoActionId) => void;
  onInteract?: (detail: BadMoInteractionDetail) => void;
  showDialogue?: boolean;
  spriteSrc: string;
}

function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

export const BadMo = forwardRef<BadMoHandle, BadMoProps>(function BadMo(
  {
    className,
    dialogues = DEFAULT_DIALOGUES,
    interactionStorageKey = DEFAULT_STORAGE_KEY,
    mood: moodOverride,
    onActionChange,
    onInteract,
    showDialogue = true,
    spriteSrc,
  },
  ref,
) {
  const pathname = usePathname();
  const pageProfile = getPageProfile(pathname);
  const mood = moodOverride ?? pageProfile.mood;
  const reducedMotion = useReducedMotion();
  const [activeAction, setActiveAction] = useState<BadMoActionId>("idle");
  const [animationNonce, setAnimationNonce] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spriteRef = useRef<HTMLSpanElement>(null);
  const actionTimerRef = useRef<number | null>(null);
  const bubbleTimerRef = useRef<number | null>(null);
  const busyRef = useRef(false);
  const lookingRef = useRef(false);
  const interactionCountRef = useRef(0);
  const previousPathRef = useRef(pathname);
  const previousInteractionRef = useRef<
    Exclude<BadMoActionId, "idle"> | undefined
  >(undefined);

  const setSpriteFrame = useCallback((row: number, frame: number) => {
    if (spriteRef.current) {
      spriteRef.current.style.backgroundPosition = getFramePosition(row, frame);
    }
  }, []);

  const say = useCallback((message: string) => {
    if (bubbleTimerRef.current !== null) {
      window.clearTimeout(bubbleTimerRef.current);
    }

    setBubble(message);
    bubbleTimerRef.current = window.setTimeout(() => {
      setBubble(null);
      bubbleTimerRef.current = null;
    }, 2_400);
  }, []);

  const play = useCallback(
    (action: Exclude<BadMoActionId, "idle">, message?: string) => {
      if (actionTimerRef.current !== null) {
        window.clearTimeout(actionTimerRef.current);
      }

      const definition = BADMO_ACTIONS[action];
      busyRef.current = true;
      lookingRef.current = false;
      rootRef.current?.removeAttribute("data-near");
      setActiveAction(action);
      setAnimationNonce((value) => value + 1);
      onActionChange?.(action);

      if (message && showDialogue) {
        say(message);
      }

      actionTimerRef.current = window.setTimeout(() => {
        busyRef.current = false;
        setActiveAction("idle");
        setAnimationNonce((value) => value + 1);
        onActionChange?.("idle");
        actionTimerRef.current = null;
      }, definition.duration);
    },
    [onActionChange, say, showDialogue],
  );

  useImperativeHandle(
    ref,
    () => ({
      getInteractionCount: () => interactionCountRef.current,
      play,
      say,
    }),
    [play, say],
  );

  useEffect(() => {
    try {
      const savedCount = window.localStorage.getItem(interactionStorageKey);
      interactionCountRef.current = savedCount ? Number.parseInt(savedCount, 10) || 0 : 0;
    } catch {
      interactionCountRef.current = 0;
    }
  }, [interactionStorageKey]);

  useEffect(() => {
    const action = BADMO_ACTIONS[activeAction];
    const animation = SPRITE_ANIMATIONS[action.sprite];
    let currentFrame = 0;

    setSpriteFrame(animation.row, currentFrame);

    if (reducedMotion || animation.fps <= 0 || animation.frames <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      if (activeAction === "idle" && lookingRef.current) {
        return;
      }

      const nextFrame = currentFrame + 1;
      currentFrame = nextFrame >= animation.frames
        ? animation.loop
          ? 0
          : animation.frames - 1
        : nextFrame;
      setSpriteFrame(animation.row, currentFrame);
    }, 1_000 / animation.fps);

    return () => window.clearInterval(interval);
  }, [activeAction, animationNonce, reducedMotion, setSpriteFrame]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let pointerX = 0;
    let pointerY = 0;
    let animationFrame = 0;

    const reactToPointer = () => {
      animationFrame = 0;

      if (busyRef.current || !buttonRef.current) {
        return;
      }

      const bounds = buttonRef.current.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const deltaX = pointerX - centerX;
      const deltaY = pointerY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance <= POINTER_REACTION_DISTANCE) {
        const look = getLookFrame(deltaX, deltaY);
        const animation = SPRITE_ANIMATIONS[look.state];
        lookingRef.current = true;
        rootRef.current?.setAttribute("data-near", "true");
        setSpriteFrame(animation.row, look.frame);
        return;
      }

      if (lookingRef.current) {
        lookingRef.current = false;
        rootRef.current?.removeAttribute("data-near");
        setSpriteFrame(SPRITE_ANIMATIONS.idle.row, 0);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(reactToPointer);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [reducedMotion, setSpriteFrame]);

  useEffect(() => {
    if (previousPathRef.current === pathname) {
      return;
    }

    previousPathRef.current = pathname;
    if (!busyRef.current && pageProfile.routeAction && !reducedMotion) {
      play(pageProfile.routeAction);
    }
  }, [pageProfile.routeAction, pathname, play, reducedMotion]);

  useEffect(() => {
    return () => {
      if (actionTimerRef.current !== null) {
        window.clearTimeout(actionTimerRef.current);
      }
      if (bubbleTimerRef.current !== null) {
        window.clearTimeout(bubbleTimerRef.current);
      }
    };
  }, []);

  const handleInteraction = () => {
    if (busyRef.current) {
      return;
    }

    const action = pickInteractionAction(previousInteractionRef.current);
    const nextCount = interactionCountRef.current + 1;
    const easterEggMessage =
      nextCount === 7
        ? "你已经摸清我的脾气了。"
        : nextCount === 21
          ? "这是我们的第 21 次默契。"
          : undefined;
    const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
    const message = easterEggMessage ?? randomDialogue;

    previousInteractionRef.current = action;
    interactionCountRef.current = nextCount;

    try {
      window.localStorage.setItem(interactionStorageKey, String(nextCount));
    } catch {
      // Interaction remains available when storage is blocked.
    }

    const detail: BadMoInteractionDetail = {
      action,
      count: nextCount,
      mood,
      pathname,
    };

    window.dispatchEvent(
      new CustomEvent<BadMoInteractionDetail>(BADMO_EVENTS.interaction, { detail }),
    );
    onInteract?.(detail);
    play(action, message);
  };

  const actionDefinition = BADMO_ACTIONS[activeAction];
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <div
      ref={rootRef}
      className={rootClassName}
      data-action={activeAction}
      data-mood={mood}
      data-motion={actionDefinition.motion}
    >
      {showDialogue && bubble ? (
        <div className={styles.bubble} role="status" aria-live="polite">
          {bubble}
        </div>
      ) : null}

      <button
        ref={buttonRef}
        className={styles.button}
        type="button"
        aria-label="和坏墨 BadMo 互动"
        onClick={handleInteraction}
      >
        <span className={styles.floatLayer} aria-hidden="true">
          <span
            ref={spriteRef}
            className={styles.sprite}
            style={{
              backgroundImage: `url(${JSON.stringify(spriteSrc)})`,
              backgroundSize: `${BADMO_SPRITE.columns * 100}% ${BADMO_SPRITE.rows * 100}%`,
            }}
          />
        </span>
      </button>
    </div>
  );
});

BadMo.displayName = "BadMo";
