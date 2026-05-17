import type { EventConfig } from "@/types";

export const eventConfig: EventConfig = {
  
  siteUrl: 'https://bodaayubidefaria.eu',
  // ── Couple ──────────────────────────────────────────────────────────────
  couple: {
    partner1: "Jessika",
    partner2: "Randy",
    monogram:  "JR",
  },

  // ── Date ────────────────────────────────────────────────────────────────
  date: {
    iso:              "2026-12-19T18:00:00+01:00",
    displayDay:       "19",
    displayMonth:     "Diciembre",
    displayYear:      "2026",
    displayDayOfWeek: "Sábado",
    heading:          "Acompáñanos este día especial",
  },

  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    tagline:    "NOS CASAMOS",
    subTagline: "Acompáñanos en este día tan especial",
  },

  // ── Story ───────────────────────────────────────────────────────────────
  story: {
    blocks: [
      {
        text: "Todo comenzó en la mágica isla de Curaçao, donde el sol, el mar y el destino hicieron que nuestros caminos se cruzaran. Lo que empezó como una conversación a orillas del Caribe se convirtió rápidamente en algo que ninguno de los dos esperaba, una conexión que nos cambió la vida para siempre.",
        icon: "curacao",
      },
      {
        text: "Años después, bajo las luces de París, Randy se arrodilló y le preguntó a Jessika si quería ser su compañera de vida. Entre lágrimas y risas, con la Torre Eiffel de testigo, ella dijo que sí. Ahora, rodeados de las personas que más amamos, estamos listos para dar el paso más importante de nuestras vidas.",
        icon: "paris",
      },
    ],
  },

  // ── Ceremony ────────────────────────────────────────────────────────────
  ceremony: {
    name:        "Basílica parroquia Virgen Milagrosa",
    time:        "5:00 pm",
    location:    "Madrid, España",
    address:     "García de Paredes, 45, 28010 Madrid",
    coordinates: { lat: 40.4356, lng: -3.6944 },
    mapsUrl:
      "https://maps.google.com/?q=Bas%C3%ADlica+parroquia+Virgen+Milagrosa,+Garc%C3%ADa+de+Paredes+45,+28010+Madrid",
  },

  // ── Reception ───────────────────────────────────────────────────────────
  reception: {
    name:        "Complejo La Cigüeña",
    time:        "7:00 pm",
    endTime:     "2:00 am",             
    location:    "Arganda del Rey, Madrid",
    address:     "Ctra. de Arganda a Chinchón Km 2,5, Arganda del Rey",
    coordinates: { lat: 40.3039, lng: -3.4459 },
    mapsUrl:     "https://maps.app.goo.gl/AwBbgLUUCmEiuhGt8", 
  },


  // ── Dress Code ──────────────────────────────────────────────────────────
  dressCode: {
    code: "Romance en Invierno",
    note: "La ceremonia religiosa es en interiores, pero la recepción incluye una zona al aire libre. Diciembre en Madrid puede ser frío por la noche, te recomendamos llevar un abrigo o chal elegante. Evita el blanco, el marfil y el negro puro, y recuerda que los tacones en exteriores pueden ser incómodos sobre el césped.",
    suggestedColors: [
      { name: "Rosa",          hex: "#c77d8a" },
      { name: "Lavanda",       hex: "#8d77a8" },
      { name: "Púrpura",       hex: "#361540" },
      { name: "Verde oscuro",  hex: "#1a4017" },
      { name: "Verde oliva",   hex: "#688c65" },
      { name: "Magenta",       hex: "#9a1156" },
      { name: "Azul gris",     hex: "#527082" },
      { name: "Azul marino",   hex: "#152b42" },
      { name: "Marrón oscuro", hex: "#3a1808" },
    ],
  },

  // ── Timeline ────────────────────────────────────────────────────────────
  // icon → filename stem, place SVGs at: public/svgs/timeline/{icon}.svg
  timeline: [
    { time: "5:00 pm",  event: "Iglesia",               icon: "church",  iconSize: "7rem"   },
    { time: "6:30 pm",  event: "Partida al Salón",       icon: "car",     iconSize: "6.5rem" },
    { time: "7:00 pm",  event: "Cóctel de Bienvenida",   icon: "drinks",  iconSize: "9rem"   },
    { time: "7:30 pm",  event: "Primer Baile y Brindis", icon: "swans",   iconSize: "10rem"  },
    { time: "8:00 pm",  event: "Cena",                   icon: "menu",    iconSize: "7rem"   },
    { time: "10:30 pm", event: "Cortar la Tarta",         icon: "cake",    iconSize: "7rem"   },
    { time: "11:00 pm", event: "Fiesta",                 icon: "disco",   iconSize: "7rem"   },
    { time: "",         event: "Fin",                    icon: "clock",   iconSize: "7rem"   },
  ],

  // ── Gifts ───────────────────────────────────────────────────────────────
  // Bank details are kept out of the repo — set NEXT_PUBLIC_BANK_* in .env.local
  gifts: {
    message:
      "Tu presencia es el mejor regalo. Si quieres hacernos un detalle, " +
      "agradecemos una contribución en efectivo o una transferencia.",
  },

  // ── Accommodations ──────────────────────────────────────────────────────
  accommodations: {
    text:
      "El Complejo La Cigüeña dispone de habitaciones para que puedas quedarte a pasar la noche " +
      "sin preocuparte por el regreso. Las habitaciones tienen un coste desde 99 € por noche " +
      "e incluyen desayuno. Si te interesa reservar, indícalo en el campo de notas de tu RSVP y te " +
      "enviaremos los detalles directamente. Para quienes prefieran alojarse en Madrid ciudad, " +
      "recomendamos reservar con antelación ya que diciembre es temporada alta.",
    hotels: [
      {
        name:       "Complejo La Cigüeña",
        address:    "Ctra. de Arganda a Chinchón Km 2,5, Arganda del Rey, Madrid",
        priceRange: "Desde 99 € / noche",
        url:        "https://maps.app.goo.gl/AwBbgLUUCmEiuhGt8",
      },
      {
        name:       "Truliving Vallecas by Habyt",
        address:    "C. de José Antonio Rebolledo y Palma, 23, 28051 Madrid",
        priceRange: "Desde 90 €/noche",
        url:        "https://maps.app.goo.gl/Dkt2BGEWGYs1iKqn9",
      },
      {
        name:       "Espahotel Plaza de España",
        address:    "Plaza de España, 7, 28008 Madrid",
        priceRange: "★★★ · Desde 97 €/noche",
        url:        "https://www.booking.com/hotel/es/espahotel-plaza-de-espana.es.html",
      },
      {
        name:       "Hostal La Rúa Rooms",
        address:    "C. de la Montera, 21, 28013 Madrid",
        priceRange: "Desde 100 €/noche",
        url:        "https://www.booking.com/hotel/es/hostal-la-rua-rooms.es.html",
      },
      {
        name:       "Pensión Enebral",
        address:    "C. Velarde, 22, Madrid",
        priceRange: "Desde 110 €/noche",
        url:        "https://www.booking.com/hotel/es/pension-enebral.es.html",
      },
    ],
  },

  // ── Suggestions & Conditions ────────────────────────────────────────────
  suggestionsAndConditions: {
    items: [
      "Por favor confirma tu asistencia antes del 30 de septiembre de 2026. Pasada esa fecha no podremos garantizar tu lugar.",
      "El evento es solo para adultos. Agradecemos tu comprensión y esperamos que disfrutes de una noche sin preocupaciones.",
      "Si tienes alguna alergia o intolerancia alimentaria, indícala en tu RSVP para que podamos coordinarlo con el catering.",
      "La ceremonia religiosa dará comienzo puntualmente a las 5:00 pm. Te pedimos llegar con al menos 30 minutos de antelación.",
      "El Complejo La Cigüeña dispone de aparcamiento gratuito para los invitados que vengan en coche.",
      "Si necesitas información sobre cómo llegar al complejo o sobre opciones de transporte compartido, no dudes en escribirnos.",
    ],
  },

  // ── Contact ─────────────────────────────────────────────────────────────

  contact: {
    message: "¿Tienes alguna pregunta? No dudes en escribirnos.",
    email:   "bodaayubidefaria@gmail.com",
  },

  // ── Calendar ────────────────────────────────────────────────────────────
  calendar: {
    ceremony: {
      title:       "💒 Boda de Jessika & Randy — Ceremonia",
      start:       "2026-12-19T18:00:00+01:00",
      end:         "2026-12-19T20:00:00+01:00",
      location:    "Basílica parroquia Virgen Milagrosa, García de Paredes 45, 28010 Madrid",
      description: "¡La boda de Jessika & Randy! Te esperamos en la Basílica parroquia Virgen Milagrosa.\n\nDirección: García de Paredes, 45, 28010 Madrid\n\nMás info: https://www.bodaayubidefaria.eu",
    },
    reception: {
      title:       "🥂 Boda de Jessika & Randy — Recepción",
      start:       "2026-12-19T20:00:00+01:00",
      end:         "2026-12-20T02:00:00+01:00",   
      location:    "Complejo La Cigüeña, Ctra. de Arganda a Chinchón Km 2,5, Arganda del Rey",
      description: "¡La boda de Jessika & Randy! Te esperamos en Complejo La Cigüeña para la recepción, cena y fiesta.\n\nDirección: Ctra. de Arganda a Chinchón Km 2,5, Arganda del Rey\n\nMás info: https://www.bodaayubidefaria.eu",
    },
  },

  // ── Transport ───────────────────────────────────────────────────────────────
  transport: {
    description:
      "Para que el desplazamiento al Complejo La Cigüeña no sea una preocupación, " +
      "hemos organizado un autobús privado desde Madrid. El servicio es gratuito " +
      "para todos los invitados.",
    pickup: {
      location: "Martínez Campos",
      address: "C/ Martínez Campos (esq. Fernández de la Hoz), Madrid",
      time: "18:30 h",
    },
    returnStops: [
      {
        location: "Avenida de América",
        address: "Intercambiador de Avenida de América, Madrid",
      },
      {
        location: "Martínez Campos / Iglesia",
        address: "C/ Martínez Campos (Basílica Virgen Milagrosa), Madrid",
      },
    ],
    returnTime: "aprox. 02:30 h",
    note: "Si necesitas transporte, márcalo en tu confirmación de asistencia.",
  },

  rsvp: {
    deadline:        '2026-09-30T23:59:59+02:00',
    deadlineDisplay: '30 de septiembre de 2026',
    closedMessage:   'El plazo para confirmar asistencia ha cerrado. Si tienes alguna pregunta, contáctanos por correo.',
  }

};
