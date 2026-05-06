"use client";

import { useEffect, useState } from "react";
import EnvelopeLanding from "@/components/envelope/EnvelopeLanding";
import { useAudio } from "@/context/AudioContext";

const STORAGE_KEY  = "jr-envelope-seen-at";
const EXPIRY_MS    = 15 * 60 * 1000; // 15 minutes

function hasSeenRecently(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < EXPIRY_MS;
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // ignore — private browsing may block localStorage
  }
}

export default function LandingController() {
  const [visible, setVisible] = useState(true);
  const { enable } = useAudio();

  useEffect(() => {
    if (hasSeenRecently()) {
      setVisible(false);
      enable();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <EnvelopeLanding
      onComplete={() => {
        markSeen();
        setVisible(false);
        enable();
      }}
    />
  );
}
