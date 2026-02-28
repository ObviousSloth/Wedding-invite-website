import { NextResponse } from 'next/server'

// Phase 5 — full implementation with Resend + DB storage
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Not implemented yet.' },
    { status: 501 }
  )
}
