"use client";

import { createContext, useContext, useState } from "react";

const AudioContext = createContext<{ enabled: boolean; enable: () => void }>({
  enabled: false,
  enable: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  return (
    <AudioContext.Provider value={{ enabled, enable: () => setEnabled(true) }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
