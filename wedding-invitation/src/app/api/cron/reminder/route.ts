import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendRsvpReminderEmail } from '@/lib/mailer';

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Verify Vercel cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  // Fetch all attending RSVPs with a valid email
  const { data: rsvps, error } = await supabase
    .from('rsvps')
    .select(`
      email,
      attendees,
      invitation_id,
      invitations (
        display_name,
        rsvp_code
      )
    `)
    .eq('attending', true)
    .not('email', 'is', null);

  if (error) {
    console.error('[cron/reminder] Supabase fetch error:', error);
    return NextResponse.json({ success: false, error: 'DB fetch failed' }, { status: 500 });
  }

  if (!rsvps || rsvps.length === 0) {
    return NextResponse.json({ success: true, sent: 0, message: 'No attending RSVPs found.' });
  }

  let sent = 0;
  let failed = 0;

  for (const rsvp of rsvps) {
    const invitation = Array.isArray(rsvp.invitations)
      ? rsvp.invitations[0]
      : rsvp.invitations;

    if (!rsvp.email || !invitation?.display_name || !invitation?.rsvp_code) {
      failed++;
      continue;
    }

    try {
      await sendRsvpReminderEmail({
        email: rsvp.email,
        displayName: invitation.display_name,
        rsvpCode: invitation.rsvp_code,
        attendees: (rsvp.attendees as Array<{ firstName: string; lastName: string }>) ?? [],
      });
      sent++;
    } catch (mailError) {
      console.error(`[cron/reminder] Failed to send to ${rsvp.email}:`, mailError);
      failed++;
    }
  }

  console.log(`[cron/reminder] Reminder run complete. Sent: ${sent}, Failed: ${failed}`);
  return NextResponse.json({ success: true, sent, failed });
}
