import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendContactNotification } from '@/lib/mailer';

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Formato de solicitud inválido.' },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const message = parsed.error.errors[0]?.message ?? 'Datos inválidos';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  const { firstName, lastName, message } = parsed.data;
  const fullName = `${firstName} ${lastName}`;

  // 1 — Always write to Supabase first (safety net)
  const supabase = getSupabaseAdmin();
  const { error: dbError } = await supabase
    .from('messages')
    .insert({ name: fullName, message });

  if (dbError) {
    console.error('[contact/route] Supabase insert error:', dbError);
    return NextResponse.json(
      { success: false, error: 'No se pudo guardar tu mensaje. Intenta de nuevo.' },
      { status: 500 }
    );
  }

  // 2 — Attempt Nodemailer notification — non-blocking: message is already saved
  try {
    await sendContactNotification({ firstName, lastName, message });
  } catch (mailError) {
    console.error('[contact/route] Nodemailer error:', mailError);
    // Intentionally not failing the request — Supabase record exists
  }

  return NextResponse.json({ success: true });
}
