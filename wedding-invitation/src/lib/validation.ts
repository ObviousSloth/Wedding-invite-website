import { z } from 'zod'

export const rsvpLookupSchema = z.object({
  rsvpCode: z
    .string()
    .min(1, 'Por favor ingresa tu código de invitación')
    .max(20)
    .transform((val) => val.trim().toUpperCase()),
})

export const attendeeSchema = z.object({
  firstName: z.string().optional().transform((v) => v?.trim() ?? ''),
  lastName:  z.string().optional().transform((v) => v?.trim() ?? ''),
  meal: z.enum(['carne', 'pescado', 'vegetariano']).optional(),
});

export const rsvpSubmitSchema = z.object({
  invitationId: z.string().uuid(),
  attending:    z.boolean(),  
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('El email no es válido')
    .transform((v) => v.trim().toLowerCase()),
  attendees:    z.array(attendeeSchema).max(20),
  phone:        z.string().max(30).optional().or(z.literal('')),
  notes:        z.string().max(1000).optional().or(z.literal('')),
  allergies: z
    .string()
    .min(1, 'Por favor indica si tienes alergias o escribe "Ninguna"')
    .max(500)
    .transform((v) => v.trim()),
})

// ─── Contact ────────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(100)
    .transform((v) => v.trim()),
  lastName: z
    .string()
    .min(1, 'El apellido es requerido')
    .max(100)
    .transform((v) => v.trim()),
  message: z
    .string()
    .min(1, 'El mensaje es requerido')
    .max(500, 'Máximo 500 caracteres')
    .transform((v) => v.trim()),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type RsvpLookupInput = z.infer<typeof rsvpLookupSchema>
export type RsvpSubmitInput = z.infer<typeof rsvpSubmitSchema>
export type AttendeeInput   = z.infer<typeof attendeeSchema>
