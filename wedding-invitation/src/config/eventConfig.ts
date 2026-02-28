import type { EventConfig } from "@/types";

export const eventConfig: EventConfig = {
  
  siteUrl: 'https://jessikarandy.com',
  // ── Couple ──────────────────────────────────────────────────────────────
  couple: {
    partner1: "Jessika",
    partner2: "Randy",
    monogram:  "JR",
  },

  // ── Date ────────────────────────────────────────────────────────────────
  date: {
    iso:              "2026-12-19T18:00:00+01:00",
    displayFull:      "19 de diciembre del 2026",
    displayDay:       "19",
    displayMonth:     "Diciembre",
    displayYear:      "2026",
    displayDayOfWeek: "Sábado",
  },

  // ── Hero ────────────────────────────────────────────────────────────────
  // Place hero video at:    public/videos/hero.mp4
  // Place fallback photo at: public/images/hero.jpg
  hero: {
    tagline:          "NOS CASAMOS",
    subTagline:       "Acompáñanos en este día tan especial",
    videoUrl:         "/videos/hero.mp4",
    fallbackImageUrl: "/images/hero.jpg",
  },

  // ── Story ───────────────────────────────────────────────────────────────
  // TODO: Replace placeholder text with real story
  // Place story photo at: public/images/story.jpg
  story: {
    text: `Nos conocimos bajo el sol del Caribe, en la mágica isla de Curaçao, donde dos mundos se cruzaron por primera vez. Lo que empezó con una mirada cargada de curiosidad se convirtió, sin que nos diéramos cuenta, en la historia de amor más bonita de nuestras vidas. Hoy, después de tantos momentos compartidos, estamos listos para dar el paso más importante juntos: celebrar nuestro amor rodeados de todas las personas que más queremos.`,
    imageUrl: "/images/story.jpg",
  },

  // ── Ceremony ────────────────────────────────────────────────────────────
  ceremony: {
    name:        "Basílica parroquia Virgen Milagrosa",
    time:        "6:00 pm",
    location:    "Madrid, España",
    address:     "García de Paredes, 45, 28010 Madrid",
    coordinates: { lat: 40.4356, lng: -3.6944 },
    mapsUrl:
      "https://maps.google.com/?q=Bas%C3%ADlica+parroquia+Virgen+Milagrosa,+Garc%C3%ADa+de+Paredes+45,+28010+Madrid",
  },

  // ── Reception ───────────────────────────────────────────────────────────
  reception: {
    name:        "Complejos La Cigüeña",
    time:        "8:00 pm",
    endTime:     "2:00 am",              // ← ADD THIS LINE
    location:    "Arganda del Rey, Madrid",
    address:     "Ctra. de Arganda a Chinchón Km 2,5, Arganda del Rey",
    coordinates: { lat: 40.3039, lng: -3.4459 },
    mapsUrl:     "https://maps.google.com/?q=...",  // keep your existing URL
  },


  // ── Dress Code ──────────────────────────────────────────────────────────
  dressCode: {
    code: "Elegante",
    note: "La recepción tendrá una parte al aire libre, ¡abrígate!",
    suggestedColors: [
      { name: "Rosa",         hex: "#F4A7B9" },
      { name: "Lavanda",      hex: "#B9A9D4" },
      { name: "Púrpura",      hex: "#7B4F9E" },
      { name: "Verde oscuro", hex: "#2D5A3D" },
      { name: "Verde oliva",  hex: "#708238" },
      { name: "Borgoña",      hex: "#5e0813" },
      { name: "Azul marino",  hex: "#1B2A4A" },
      { name: "Negro",        hex: "#1A1A1A" },
    ],
  },

  // ── Timeline ────────────────────────────────────────────────────────────
  // TODO: Replace XX:XX with real times once confirmed
  // icon → filename stem, place SVGs at: public/svgs/timeline/{icon}.svg
  timeline: [
    { time: "6:00 pm",  event: "Iglesia",               icon: "church",    iconSize: "7rem" },
    { time: "XX:XX pm", event: "Partida al Salón",       icon: "car",       iconSize: "6.5rem" },
    { time: "XX:XX pm", event: "Cóctel de Bienvenida",   icon: "drinks",  iconSize: "9rem" },
    { time: "XX:XX pm", event: "Primer Baile y Brindis", icon: "swans",     iconSize: "10rem" },
    { time: "XX:XX pm", event: "Cena",                   icon: "menu",    iconSize: "7rem" },
    { time: "XX:XX pm", event: "Picar Torta",            icon: "cake",      iconSize: "7rem" },
    { time: "XX:XX pm", event: "Fiesta",                 icon: "disco",     iconSize: "7rem" },
    { time: "XX:XX pm", event: "Fin",                    icon: "clock",       iconSize: "7rem" },
  ],

  // ── Gifts ───────────────────────────────────────────────────────────────
  // TODO: Replace with real bank details before launch
  gifts: {
    message:
      "El mejor regalo es tu presencia. Sin embargo, si deseas hacernos un detalle, " +
      "puedes realizar una transferencia a la cuenta indicada a continuación.",
    bankDetails: {
      accountHolder: "Jessika & Randy",
      bank:          "Nombre del Banco",
      iban:          "ES00 0000 0000 0000 0000 0000",
      bic:           "XXXXXXXX",
    },
  },

  // ── Accommodations ──────────────────────────────────────────────────────
  // TODO: Add real hotel recommendations before launch
  accommodations: {
    text:
      "Madrid ofrece una amplia variedad de alojamientos para todos los gustos y presupuestos. " +
      "Os recomendamos reservar con antelación, ya que diciembre es temporada alta en la ciudad. " +
      "Pronto añadiremos una lista de hoteles recomendados cercanos a los lugares del evento.",
    hotels: [],
  },

  // ── Suggestions & Conditions ────────────────────────────────────────────
  // TODO: Add real suggestions & conditions before launch
  suggestionsAndConditions: {
    items: [
      "Próximamente añadiremos las sugerencias y condiciones del evento.",
    ],
  },

  // ── Contact ─────────────────────────────────────────────────────────────
  // TODO: Replace with real contact email before launch
  contact: {
    message: "¿Tienes alguna pregunta? No dudes en escribirnos.",
    email:   "hola@jessikarandy.com",
  },

  // ── Calendar ────────────────────────────────────────────────────────────
  calendar: {
    ceremony: {
      title:       "💒 Boda de Jessika & Randy — Ceremonia",
      start:       "2026-12-19T18:00:00+01:00",
      end:         "2026-12-19T20:00:00+01:00",
      location:    "Basílica parroquia Virgen Milagrosa, García de Paredes 45, 28010 Madrid",
      description: "¡La boda de Jessika & Randy! Te esperamos en la Basílica parroquia Virgen Milagrosa.\n\nDirección: García de Paredes, 45, 28010 Madrid\n\nMás info: https://jessikarandy.com",
    },
    reception: {
      title:       "🥂 Boda de Jessika & Randy — Recepción",
      start:       "2026-12-19T20:00:00+01:00",
      end:         "2026-12-20T02:00:00+01:00",   
      location:    "Complejos La Cigüeña, Ctra. de Arganda a Chinchón Km 2,5, Arganda del Rey",
      description: "¡La boda de Jessika & Randy! Te esperamos en Complejos La Cigüeña para la recepción, cena y fiesta.\n\nDirección: Ctra. de Arganda a Chinchón Km 2,5, Arganda del Rey\n\nMás info: https://jessikarandy.com",
    },
  },

  rsvp: {
    deadline:      '2026-11-30T23:59:59+01:00',
    closedMessage: 'El plazo para confirmar asistencia ha cerrado. Si tienes alguna pregunta, contáctanos por correo.',
  }

};
