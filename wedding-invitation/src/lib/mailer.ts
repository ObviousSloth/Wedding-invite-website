import nodemailer from 'nodemailer';
import { eventConfig } from '@/config/eventConfig';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ContactEmailPayload {
  firstName: string;
  lastName: string;
  message: string;
}

export interface RsvpEmailPayload {
  email: string;
  displayName: string;
  rsvpCode: string;
  attendees: Array<{ firstName: string; lastName: string }>;
}

// ─── Transporter ─────────────────────────────────────────────────────────────

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error('GMAIL_USER or GMAIL_APP_PASSWORD missing');
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

// ─── Shared Helpers ───────────────────────────────────────────────────────────

function googleCalUrl(
  title: string,
  start: string,
  end: string,
  location: string,
  description: string
): string {
  const fmt = (iso: string) =>
    iso.slice(0, 19).replace(/-/g, '').replace(/:/g, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    ctz: 'Europe/Madrid',
    details: description,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');
}

function htmlShell(title: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#f4f2eb;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f2eb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
        style="max-width:600px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background-color:#5e0813;padding:32px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#f4f2eb;opacity:0.75;font-family:Georgia,serif;">
              Jessika &amp; Randy &nbsp;·&nbsp; 19 de Diciembre del 2026
            </p>
            <h1 style="margin:12px 0 0;font-size:28px;font-weight:400;color:#f4f2eb;letter-spacing:0.08em;font-family:Georgia,serif;">
              ${escape(title)}
            </h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            ${bodyContent}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color:#e8e4d9;padding:18px 40px;text-align:center;">
            <p style="margin:0;font-size:10px;color:#999999;letter-spacing:0.2em;text-transform:uppercase;font-family:Georgia,serif;">
              bodaayubidefaria.eu
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function venueBlock(): string {
  const { ceremony, reception } = eventConfig;

  const ceremonyCalUrl = googleCalUrl(
    eventConfig.calendar.ceremony.title,
    eventConfig.calendar.ceremony.start,
    eventConfig.calendar.ceremony.end,
    eventConfig.calendar.ceremony.location,
    eventConfig.calendar.ceremony.description
  );

  const receptionCalUrl = googleCalUrl(
    eventConfig.calendar.reception.title,
    eventConfig.calendar.reception.start,
    eventConfig.calendar.reception.end,
    eventConfig.calendar.reception.location,
    eventConfig.calendar.reception.description
  );

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="padding:0 0 16px;">
          <div style="background-color:#f4f2eb;border-radius:4px;padding:20px 24px;">
            <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#5e0813;font-family:Georgia,serif;">Ceremonia Religiosa</p>
            <p style="margin:0 0 2px;font-size:16px;color:#1a1a1a;font-family:Georgia,serif;">${escape(ceremony.name)}</p>
            <p style="margin:0 0 2px;font-size:13px;color:#555555;font-family:Georgia,serif;">${escape(ceremony.address)}</p>
            <p style="margin:0 0 12px;font-size:13px;color:#5e0813;font-family:Georgia,serif;">${escape(ceremony.time)}</p>
            <a href="${ceremonyCalUrl}"
              style="display:inline-block;padding:8px 18px;background-color:#5e0813;color:#f4f2eb;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;border-radius:100px;font-family:Georgia,serif;">
              Añadir al Calendario
            </a>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div style="background-color:#f4f2eb;border-radius:4px;padding:20px 24px;">
            <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#5e0813;font-family:Georgia,serif;">Recepción</p>
            <p style="margin:0 0 2px;font-size:16px;color:#1a1a1a;font-family:Georgia,serif;">${escape(reception.name)}</p>
            <p style="margin:0 0 2px;font-size:13px;color:#555555;font-family:Georgia,serif;">${escape(reception.address)}</p>
            <p style="margin:0 0 12px;font-size:13px;color:#5e0813;font-family:Georgia,serif;">${escape(reception.time)} — ${escape(reception.endTime ?? '')}</p>
            <a href="${receptionCalUrl}"
              style="display:inline-block;padding:8px 18px;background-color:#5e0813;color:#f4f2eb;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;border-radius:100px;font-family:Georgia,serif;">
              Añadir al Calendario
            </a>
          </div>
        </td>
      </tr>
    </table>`;
}

function attendeeListBlock(attendees: Array<{ firstName: string; lastName: string; meal?: string }>): string {
  if (!attendees.length) return '';

  const mealLabels: Record<string, string> = {
    carne:        'Carne',
    pescado:      'Pescado',
    vegetariano:  'Vegetariano',
  };

  const names = attendees
    .map((a) => {
      const mealLabel = a.meal ? mealLabels[a.meal] ?? a.meal : null;
      return `<li style="padding:4px 0;font-size:15px;color:#1a1a1a;font-family:Georgia,serif;">
        ${escape(a.firstName)} ${escape(a.lastName)}${mealLabel ? ` <span style="font-size:12px;color:#5e0813;letter-spacing:0.1em;font-family:Georgia,serif;">— ${mealLabel}</span>` : ''}
      </li>`;
    })
    .join('');

  return `
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#5e0813;font-family:Georgia,serif;">Asistentes confirmados</p>
    <ul style="margin:0 0 28px;padding-left:20px;">${names}</ul>`;
}

function rsvpCodeBlock(rsvpCode: string): string {
  return `
    <div style="border:1px solid rgba(94,8,19,0.15);border-radius:4px;padding:16px 24px;text-align:center;margin-top:24px;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#5e0813;opacity:0.65;font-family:Georgia,serif;">Tu código de invitación</p>
      <p style="margin:0;font-size:22px;letter-spacing:0.2em;color:#5e0813;font-family:Georgia,serif;">${escape(rsvpCode)}</p>
      <p style="margin:6px 0 0;font-size:11px;color:#aaaaaa;font-family:Georgia,serif;">Úsalo para editar tu confirmación en bodaayubidefaria.eu</p>
    </div>`;
}

// ─── Contact Notification ─────────────────────────────────────────────────────

export async function sendContactNotification(payload: ContactEmailPayload): Promise<void> {
  const { firstName, lastName, message } = payload;
  const fullName = `${firstName} ${lastName}`;
  const timestamp = new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const body = `
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#5e0813;font-family:Georgia,serif;">De</p>
    <p style="margin:0 0 32px;font-size:22px;color:#1a1a1a;font-family:Georgia,serif;">${escape(fullName)}</p>
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#5e0813;font-family:Georgia,serif;">Mensaje</p>
    <div style="background-color:#f4f2eb;border-left:3px solid #5e0813;padding:18px 22px;border-radius:0 4px 4px 0;margin-bottom:32px;">
      <p style="margin:0;font-size:15px;line-height:1.75;color:#333333;font-family:Georgia,serif;">${escape(message)}</p>
    </div>
    <p style="margin:0;font-size:11px;color:#aaaaaa;letter-spacing:0.1em;font-family:Georgia,serif;">Recibido el ${timestamp}</p>`;

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Jessika & Randy 💌" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_NOTIFICATION_EMAIL,
    subject: `💌 Mensaje de invitado: ${fullName}`,
    html: htmlShell('Nuevo Mensaje', body),
  });
}

// ─── RSVP Confirmation (first-time attending = true) ─────────────────────────

export async function sendRsvpConfirmationEmail(payload: RsvpEmailPayload): Promise<void> {
  const { email, displayName, rsvpCode, attendees } = payload;

  const body = `
    <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#333333;font-family:Georgia,serif;">
      ¡Hola, <strong>${escape(displayName)}</strong>! 🎉<br/>
      Hemos recibido tu confirmación. ¡Nos alegra mucho contar con vosotros en este día tan especial!
    </p>
    ${attendeeListBlock(attendees)}
    ${venueBlock()}
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#5e0813;font-family:Georgia,serif;">Código de Vestimenta</p>
    <p style="margin:0 0 28px;font-size:15px;color:#333333;font-family:Georgia,serif;">
      <strong>${escape(eventConfig.dressCode.code)}</strong> — ${escape(eventConfig.dressCode.note)}
    </p>
    ${rsvpCodeBlock(rsvpCode)}`;

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Jessika & Randy 💌" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `🎉 ¡Confirmación recibida! Boda de Jessika & Randy`,
    html: htmlShell('¡Nos vemos el 19 de Diciembre!', body),
  });
}

// ─── RSVP Update (edit to existing attending RSVP) ───────────────────────────

export async function sendRsvpUpdateEmail(payload: RsvpEmailPayload): Promise<void> {
  const { email, displayName, rsvpCode, attendees } = payload;

  const body = `
    <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#333333;font-family:Georgia,serif;">
      ¡Hola, <strong>${escape(displayName)}</strong>! ✅<br/>
      Hemos actualizado tu confirmación correctamente. ¡Aquí tienes un resumen de tus cambios!
    </p>
    ${attendeeListBlock(attendees)}
    ${venueBlock()}
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#5e0813;font-family:Georgia,serif;">Código de Vestimenta</p>
    <p style="margin:0 0 28px;font-size:15px;color:#333333;font-family:Georgia,serif;">
      <strong>${escape(eventConfig.dressCode.code)}</strong> — ${escape(eventConfig.dressCode.note)}
    </p>
    ${rsvpCodeBlock(rsvpCode)}`;

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Jessika & Randy 💌" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `✅ Tus cambios han sido guardados — Boda de Jessika & Randy`,
    html: htmlShell('¡Cambios Guardados!', body),
  });
}

// ─── RSVP Reminder (cron — 1 month before) ───────────────────────────────────

export async function sendRsvpReminderEmail(payload: RsvpEmailPayload): Promise<void> {
  const { email, displayName, rsvpCode, attendees } = payload;

  const body = `
    <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#333333;font-family:Georgia,serif;">
      ¡Hola, <strong>${escape(displayName)}</strong>! 💒<br/>
      ¡Solo queda <strong>un mes</strong> para la boda! Os esperamos con mucha ilusión.
    </p>
    ${attendeeListBlock(attendees)}
    ${venueBlock()}
    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#5e0813;font-family:Georgia,serif;">Código de Vestimenta</p>
    <p style="margin:0 0 28px;font-size:15px;color:#333333;font-family:Georgia,serif;">
      <strong>${escape(eventConfig.dressCode.code)}</strong> — ${escape(eventConfig.dressCode.note)}
    </p>
    ${rsvpCodeBlock(rsvpCode)}`;

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Jessika & Randy 💌" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `💒 ¡Un mes para la boda de Jessika & Randy!`,
    html: htmlShell('¡Nos vemos en un mes!', body),
  });
}
