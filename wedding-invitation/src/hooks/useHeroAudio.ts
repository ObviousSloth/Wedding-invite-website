"use client";

import { useEffect, useRef, useCallback } from "react";

const SONG_URL   = "/audio/song.mp3"; // place your file at public/audio/song.mp3
const BASE_VOL   = 0.25;              // max volume while hero is visible (0–1)
const FADE_MS    = 1200;              // fade duration in milliseconds
const FADE_STEPS = 40;               // number of steps per fade

export function useHeroAudio(enabled: boolean, heroRef: React.RefObject<HTMLElement | null>) {
  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearFade = () => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  const fadeTo = useCallback((target: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    const stepTime = FADE_MS / FADE_STEPS;
    const stepSize = (target - audio.volume) / FADE_STEPS;
    fadeTimerRef.current = setInterval(() => {
      if (!audioRef.current) { clearFade(); return; }
      const next = audioRef.current.volume + stepSize;
      if ((stepSize > 0 && next >= target) || (stepSize < 0 && next <= target)) {
        audioRef.current.volume = target;
        clearFade();
      } else {
        audioRef.current.volume = Math.max(0, Math.min(1, next));
      }
    }, stepTime);
  }, []);

  // Initialise audio element once
  useEffect(() => {
    const audio = new Audio(SONG_URL);
    audio.loop   = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      clearFade();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Start playing as soon as enabled (user clicked envelope)
  useEffect(() => {
    if (!enabled) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {/* browser may still block — silent fail */});
    fadeTo(BASE_VOL);
  }, [enabled, fadeTo]);

  // Fade in/out as hero enters/leaves viewport
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!enabled) return;
        fadeTo(entry.isIntersecting ? BASE_VOL : 0);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [heroRef, enabled, fadeTo]);
}
