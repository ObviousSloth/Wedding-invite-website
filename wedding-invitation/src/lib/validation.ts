import { z } from 'zod'

export const rsvpLookupSchema = z.object({
  rsvpCode: z
    .string()
    .min(1, 'Por favor ingresa tu código de invitación')
    .max(20)
    .transform((val) => val.trim().toUpperCase()),
})

export const attendeeSchema = z.object({
  firstName: z.string().max(50),
  lastName:  z.string().max(50),
})

export const rsvpSubmitSchema = z.object({
  invitationId: z.string().uuid(),
  attending:    z.boolean(),
  attendees:    z.array(attendeeSchema).max(20),
  phone:        z.string().max(30).optional().or(z.literal('')),
  notes:        z.string().max(1000).optional().or(z.literal('')),
})

export type RsvpLookupInput = z.infer<typeof rsvpLookupSchema>
export type RsvpSubmitInput = z.infer<typeof rsvpSubmitSchema>
export type AttendeeInput   = z.infer<typeof attendeeSchema>
