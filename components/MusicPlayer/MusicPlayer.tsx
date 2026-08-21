"use client";

import { Music2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";

export interface MusicTrack {
  src: string;
  title: string;
}

export interface MusicPlayerProps {
  loop?: boolean;
  track: MusicTrack;
  volume?: number;
}

type PlaybackState = "idle" | "loading" | "playing" | "error";

export function MusicPlayer({
  loop = true,
  track,
  volume = 0.32,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<PlaybackState>("idle");

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(1, Math.max(0, volume));
    }
  }, [volume]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    setState("loading");

    try {
      await audio.play();
    } catch {
      setState("error");
    }
  };

  const isPlaying = state === "playing";
  const label = isPlaying
    ? "Playing"
    : state === "loading"
      ? "Loading"
      : state === "error"
        ? "Unavailable"
        : "Music";

  return (
    <div className={styles.root}>
      <button
        className={styles.button}
        type="button"
        aria-label={isPlaying ? `暂停 ${track.title}` : `播放 ${track.title}`}
        aria-pressed={isPlaying}
        data-state={state}
        onClick={togglePlayback}
        title={state === "error" ? "请将音乐文件放入 public/music" : track.title}
      >
        <Music2 className={styles.icon} size={14} strokeWidth={1.7} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
      </button>

      {/* Instrumental background music contains no dialogue to caption. */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        src={track.src}
        loop={loop}
        preload="none"
        onCanPlay={() => setState((current) => current === "error" ? "idle" : current)}
        onError={() => setState("error")}
        onPause={() => setState((current) => current === "playing" ? "idle" : current)}
        onPlay={() => setState("playing")}
      />

      <span className={styles.srOnly} role="status" aria-live="polite">
        {state === "playing"
          ? `${track.title} 正在播放`
          : state === "error"
            ? "音乐文件暂不可用"
            : "音乐已暂停"}
      </span>
    </div>
  );
}
