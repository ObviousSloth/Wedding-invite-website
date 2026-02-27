import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { rsvpSubmitSchema } from '@/lib/validation'
import { ApiResponse, Rsvp } from '@/types'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Rsvp>>> {
  try {
    const body   = await request.json()
    const parsed = rsvpSubmitSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message ?? 'Datos inválidos' },
        { status: 400 }
      )
    }

    const { invitationId, attending, attendees, phone, notes } = parsed.data
    const supabase = getSupabaseAdmin()

    // Verify invitation + get allowed_seats
    const { data: invitation, error: inviteError } = await supabase
      .from('invitations')
      .select('id, allowed_seats')
      .eq('id', invitationId)
      .single()

    if (inviteError || !invitation) {
      return NextResponse.json(
        { success: false, error: 'Invitación no encontrada.' },
        { status: 404 }
      )
    }

    // Strip rows where both first + last name are empty
    const filledAttendees = attending
      ? attendees.filter(
          (a) => a.firstName.trim() !== '' || a.lastName.trim() !== ''
        )
      : []

    // Server-side seat cap (filled rows must not exceed allowed_seats)
    if (attending && filledAttendees.length > invitation.allowed_seats) {
      return NextResponse.json(
        {
          success: false,
          error: `Tu invitación permite un máximo de ${invitation.allowed_seats} persona${invitation.allowed_seats === 1 ? '' : 's'}.`,
        },
        { status: 400 }
      )
    }

    const attendeeCount = attending ? filledAttendees.length : 0

    // Upsert RSVP
    const { data: rsvp, error: upsertError } = await supabase
      .from('rsvps')
      .upsert(
        {
          invitation_id:  invitationId,
          attending,
          attendees:      filledAttendees,
          attendee_count: attendeeCount,
          phone:          phone  || null,
          notes:          notes  || null,
          updated_at:     new Date().toISOString(),
        },
        { onConflict: 'invitation_id' }
      )
      .select()
      .single()

    if (upsertError || !rsvp) {
      return NextResponse.json(
        { success: false, error: 'No se pudo guardar tu confirmación. Intenta de nuevo.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: rsvp })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error del servidor. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}
