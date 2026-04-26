"use client";

import { useEffect, useState } from "react";
import EnvelopeLanding from "@/components/envelope/EnvelopeLanding";
import { useAudio } from "@/context/AudioContext";

const SESSION_KEY = "jr-envelope-seen";

export default function LandingController() {
  const [visible, setVisible] = useState(true);
  const { enable } = useAudio();

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      setVisible(false);
      enable(); // already past envelope — enable audio immediately
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <EnvelopeLanding
      onComplete={() => {
        sessionStorage.setItem(SESSION_KEY, "true");
        setVisible(false);
        enable();
      }}
    />
  );
}
