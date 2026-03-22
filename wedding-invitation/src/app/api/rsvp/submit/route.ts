import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { rsvpSubmitSchema } from '@/lib/validation';
import { ApiResponse, Rsvp } from '@/types';
import {
  sendRsvpConfirmationEmail,
  sendRsvpUpdateEmail,
} from '@/lib/mailer';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Rsvp>>> {
  try {
    const body   = await request.json();
    const parsed = rsvpSubmitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message ?? 'Datos inválidos' },
        { status: 400 }
      );
    }

    const { invitationId, attending, email, attendees, phone, notes } = parsed.data;
    const supabase = getSupabaseAdmin();

    // 1 — Verify invitation + get allowed_seats, display_name, rsvp_code for email
    const { data: invitation, error: inviteError } = await supabase
      .from('invitations')
      .select('id, allowed_seats, display_name, rsvp_code')
      .eq('id', invitationId)
      .single();

    if (inviteError || !invitation) {
      return NextResponse.json(
        { success: false, error: 'Invitación no encontrada.' },
        { status: 404 }
      );
    }

    // 2 — Strip rows where both first + last name are empty
    const filledAttendees = attending
      ? attendees.filter(
          (a) => a.firstName.trim() !== '' || a.lastName.trim() !== ''
        )
      : [];

    // 3 — Server-side seat cap
    if (attending && filledAttendees.length > invitation.allowed_seats) {
      return NextResponse.json(
        {
          success: false,
          error: `Tu invitación permite un máximo de ${invitation.allowed_seats} persona${invitation.allowed_seats === 1 ? '' : 's'}.`,
        },
        { status: 400 }
      );
    }

    // 4 — Check if RSVP already exists (determines confirmation vs update email)
    const { data: existingRsvp } = await supabase
      .from('rsvps')
      .select('id, attending')
      .eq('invitation_id', invitationId)
      .maybeSingle();

    const isNewRsvp        = !existingRsvp;
    const wasAlreadyAttending = existingRsvp?.attending === true;

    const attendeeCount = attending ? filledAttendees.length : 0;

    // 5 — Upsert RSVP
    const { data: rsvp, error: upsertError } = await supabase
      .from('rsvps')
      .upsert(
        {
          invitation_id:  invitationId,
          attending,
          email,
          attendees:      filledAttendees,
          attendee_count: attendeeCount,
          phone:          phone  || null,
          notes:          notes  || null,
          updated_at:     new Date().toISOString(),
        },
        { onConflict: 'invitation_id' }
      )
      .select()
      .single();

    if (upsertError || !rsvp) {
      return NextResponse.json(
        { success: false, error: 'No se pudo guardar tu confirmación. Intenta de nuevo.' },
        { status: 500 }
      );
    }

    // 6 — Send email if attending (non-blocking — RSVP is already saved)
    if (attending) {
      const emailPayload = {
        email,
        displayName: invitation.display_name,
        rsvpCode:    invitation.rsvp_code,
        attendees:   filledAttendees,
      };

      try {
        if (isNewRsvp || !wasAlreadyAttending) {
          await sendRsvpConfirmationEmail(emailPayload);
        } else {
          await sendRsvpUpdateEmail(emailPayload);
        }
      } catch (mailError) {
        console.error('[rsvp/submit] Nodemailer error:', mailError);
        // Intentionally non-blocking — RSVP is saved regardless
      }
    }

    return NextResponse.json({ success: true, data: rsvp });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error del servidor. Por favor intenta de nuevo.' },
      { status: 500 }
    );
  }
}
