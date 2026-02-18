"use client";

import { useState, useEffect } from "react";
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface AdaptiveCountdownProps {
  targetDate: string;
}

type CountdownMode = "months-days" | "days-hours-minutes" | "hours-minutes-seconds" | "passed";

interface TimeLeft {
  mode: CountdownMode;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

function getTimeLeft(targetDate: string): TimeLeft {
  const now = new Date();
  const target = new Date(targetDate);
  const totalSeconds = differenceInSeconds(target, now);

  if (totalSeconds <= 0) return { mode: "passed" };

  const totalDays = differenceInDays(target, now);

  // Mode 1: > 30 days → Months:Days
  if (totalDays > 30) {
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    return { mode: "months-days", months, days };
  }

  // Mode 2: 7-30 days → Days:Hours:Minutes
  if (totalDays >= 7) {
    const days = totalDays;
    const totalHours = differenceInHours(target, now);
    const hours = totalHours % 24;
    const totalMinutes = differenceInMinutes(target, now);
    const minutes = totalMinutes % 60;
    return { mode: "days-hours-minutes", days, hours, minutes };
  }

  // Mode 3: < 7 days → Hours:Minutes:Seconds
  const totalHours = differenceInHours(target, now);
  const hours = totalHours % 24;
  const totalMinutes = differenceInMinutes(target, now);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;
  return { mode: "hours-minutes-seconds", hours, minutes, seconds };
}

interface UnitBoxProps {
  value: number;
  label: string;
}

function UnitBox({ value, label }: UnitBoxProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-icon text-burgundy text-5xl md:text-6xl leading-none tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-cinzel text-burgundy/60 text-xs tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

export default function AdaptiveCountdown({ targetDate }: AdaptiveCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.mode === "passed") {
    return (
      <div className="text-center">
        <p className="font-slight text-burgundy text-4xl">¡Feliz boda!</p>
      </div>
    );
  }

  const separator = (
    <span className="font-cinzel text-burgundy/40 text-3xl md:text-4xl self-start pt-3">:</span>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-cinzel text-burgundy/50 tracking-[0.4em] uppercase text-xs">
        Cuenta regresiva
      </p>
      <div className="flex items-start gap-4 md:gap-8">
        {timeLeft.mode === "months-days" && (
          <>
            <UnitBox value={timeLeft.months!} label={timeLeft.months === 1 ? "mes" : "meses"} />
            {separator}
            <UnitBox value={timeLeft.days!} label={timeLeft.days === 1 ? "día" : "días"} />
          </>
        )}
        {timeLeft.mode === "days-hours-minutes" && (
          <>
            <UnitBox value={timeLeft.days!} label={timeLeft.days === 1 ? "día" : "días"} />
            {separator}
            <UnitBox value={timeLeft.hours!} label={timeLeft.hours === 1 ? "hora" : "horas"} />
            {separator}
            <UnitBox value={timeLeft.minutes!} label="minutos" />
          </>
        )}
        {timeLeft.mode === "hours-minutes-seconds" && (
          <>
            <UnitBox value={timeLeft.hours!} label={timeLeft.hours === 1 ? "hora" : "horas"} />
            {separator}
            <UnitBox value={timeLeft.minutes!} label="minutos" />
            {separator}
            <UnitBox value={timeLeft.seconds!} label="segundos" />
          </>
        )}
      </div>
    </div>
  );
}
