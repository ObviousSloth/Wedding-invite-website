"use client";

import { useEffect, useState } from "react";
import EnvelopeLanding from "@/components/envelope/EnvelopeLanding";

const SESSION_KEY = "jr-envelope-seen";

export default function LandingController() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <EnvelopeLanding
      onComplete={() => {
        sessionStorage.setItem(SESSION_KEY, "true");
        setVisible(false);
      }}
    />
  );
}
