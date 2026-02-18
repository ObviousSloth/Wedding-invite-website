import type { EventConfig } from "@/types";

export const eventConfig: EventConfig = {
  // ─── Couple ─────────────────────────────────────────────────────────────
  couple: {
    partner1: "Jessika",
    partner2: "Randy",
    monogram: "JR",
  },

  // ─── Date ───────────────────────────────────────────────────────────────
  date: {
    iso: "2026-12-19T18:00:00+01:00",
    displayFull: "19 de diciembre del 2026",
    displayDay: "19",
    displayMonth: "Diciembre",
    displayYear: "2026",
    displayDayOfWeek: "Sábado",
  },

  // ─── Hero ────────────────────────────────────────────────────────────────
  hero: {
    tagline: "NOS CASAMOS",
    subTagline: "Confirma tu asistencia al final",
  },

  // ─── Our Story ───────────────────────────────────────────────────────────
  story: {
    text: "Nos conocimos en Curaçao — aquí va vuestra historia completa. Reemplaza este texto con vuestro relato.",
    imageUrl: "/images/story-placeholder.jpg",
  },

  // ─── Ceremony ────────────────────────────────────────────────────────────
  ceremony: {
    name: "Iglesia tal",
    time: "6:00 pm",
    location: "Madrid, España",
    address: "Calle Ejemplo 123, 28001 Madrid, España",
    coordinates: { lat: 40.4168, lng: -3.7038 },
    mapsUrl: "https://maps.google.com/?q=40.4168,-3.7038",
  },

  // ─── Reception ───────────────────────────────────────────────────────────
  reception: {
    name: "Finca Bla Bla",
    time: "8:00 pm",
    location: "Madrid, España",
    address: "Carretera Ejemplo km 5, 28050 Madrid, España",
    coordinates: { lat: 40.4, lng: -3.7 },
    mapsUrl: "https://maps.google.com/?q=40.4,-3.7",
  },

  // ─── Dress Code ──────────────────────────────────────────────────────────
  dressCode: {
    code: "Elegante",
    note: "La recepción tendrá una parte al aire libre, ¡abrígate!",
    suggestedColors: [
      { name: "Rosa", hex: "#F4A7B9" },
      { name: "Lavanda", hex: "#B9A9D4" },
      { name: "Púrpura", hex: "#7B4F9E" },
      { name: "Verde oscuro", hex: "#2D5A3D" },
      { name: "Verde oliva", hex: "#708238" },
      { name: "Borgoña", hex: "#5e0813" },
      { name: "Azul marino", hex: "#1B2A4A" },
      { name: "Negro", hex: "#1A1A1A" },
    ],
  },

  // ─── Timeline ────────────────────────────────────────────────────────────
  timeline: [
    { time: "6:00 pm", event: "Iglesia", icon: "church" },
    { time: "6:30 pm", event: "Partida Salón", icon: "car" },
    { time: "7:00 pm", event: "Cóctel de Bienvenida", icon: "cocktail" },
    { time: "8:00 pm", event: "Primer Baile y Brindis", icon: "dance" },
    { time: "8:30 pm", event: "Cena", icon: "menu" },
    { time: "10:00 pm", event: "Picar Torta", icon: "cake" },
    { time: "10:30 pm", event: "Fiesta", icon: "disco" },
    { time: "2:00 am", event: "Fin", icon: "clock" },
  ],

  // ─── Gifts ───────────────────────────────────────────────────────────────
  gifts: {
    message:
      "El mejor regalo es tu presencia, pero si quieres tener un detalle con nosotros, puedes hacerlo a través de una transferencia bancaria.",
    bankDetails: {
      accountHolder: "Randy & Jessika",
      bank: "Banco Ejemplo",
      iban: "ES00 0000 0000 0000 0000 0000",
      bic: "EXAMPLEXXX",
    },
  },

  // ─── Accommodations ──────────────────────────────────────────────────────
  accommodations: {
    text: "Para vuestra comodidad, hemos seleccionado algunos hoteles cercanos al lugar de celebración. Reemplaza este texto con tus recomendaciones.",
    hotels: [],
  },

  // ─── Suggestions & Conditions ────────────────────────────────────────────
  suggestionsAndConditions: {
    items: [
      "Por favor confirma tu asistencia antes del 1 de noviembre de 2026.",
      "En caso de no poder asistir, por favor comunícalo lo antes posible.",
      "El evento es solo para adultos, salvo indicación contraria en tu invitación.",
    ],
  },

  // ─── Contact ─────────────────────────────────────────────────────────────
  contact: {
    message:
      "¿Tienes alguna pregunta? No dudes en escribirnos y te responderemos lo antes posible.",
    email: "boda@ejemplo.com",
  },

  // ─── Calendar Events ─────────────────────────────────────────────────────
  calendar: {
    ceremony: {
      title: "Boda de Jessika & Randy — Ceremonia",
      location: "Iglesia tal, Madrid, España",
      startTime: "2026-12-19T18:00:00+01:00",
      endTime: "2026-12-19T19:00:00+01:00",
      description: "Ceremonia religiosa de la boda de Jessika y Randy.",
    },
    reception: {
      title: "Boda de Jessika & Randy — Recepción",
      location: "Finca Bla Bla, Madrid, España",
      startTime: "2026-12-19T20:00:00+01:00",
      endTime: "2026-12-20T02:00:00+01:00",
      description: "Recepción y celebración de la boda de Jessika y Randy.",
    },
  },
};
