import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { rsvpLookupSchema } from '@/lib/validation'
import { ApiResponse, RsvpLookupResponse } from '@/types'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<RsvpLookupResponse>>> {
  try {
    const body = await request.json()
    const parsed = rsvpLookupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message ?? 'Código inválido' },
        { status: 400 }
      )
    }

    const { rsvpCode } = parsed.data
    const supabase = getSupabaseAdmin()

    // Look up invitation by code
    const { data: invitation, error: inviteError } = await supabase
      .from('invitations')
      .select('*')
      .eq('rsvp_code', rsvpCode)
      .single()

    if (inviteError || !invitation) {
      return NextResponse.json(
        { success: false, error: 'Código no encontrado. Revisa tu invitación.' },
        { status: 404 }
      )
    }

    // Check for existing RSVP
    const { data: rsvp } = await supabase
      .from('rsvps')
      .select('*')
      .eq('invitation_id', invitation.id)
      .single()

    return NextResponse.json({
      success: true,
      data: {
        invitation,
        rsvp: rsvp ?? null,
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error del servidor. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}
