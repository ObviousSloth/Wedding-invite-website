'use client'

import { useState, useEffect } from 'react'
import { eventConfig } from '@/config/eventConfig'
import { Invitation, Rsvp, Attendee } from '@/types'
import SectionHeading from '@/components/ui/SectionHeading'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import ScrollReveal from '@/components/ScrollReveal'
import styles from './RSVPSection.module.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 'code' | 'form' | 'confirmed'

interface FormState {
  invitation:   Invitation | null
  existingRsvp: Rsvp | null
  attending:    boolean | null
  attendees:    Attendee[]
  phone:        string
  notes:        string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isDeadlinePassed(): boolean {
  return new Date() > new Date(eventConfig.rsvp.deadline)
}

function buildEmptyAttendees(count: number): Attendee[] {
  return Array.from({ length: count }, () => ({ firstName: '', lastName: '' }))
}

function countFilledAttendees(attendees: Attendee[]): number {
  return attendees.filter(
    (a) => a.firstName.trim() !== '' || a.lastName.trim() !== ''
  ).length
}

// ─── Partial Seats Modal ──────────────────────────────────────────────────────

interface PartialModalProps {
  filled:    number
  total:     number
  onConfirm: () => void
  onCancel:  () => void
}

function PartialSeatsModal({ filled, total, onConfirm, onCancel }: PartialModalProps) {
  return (
    <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
      <div className={styles.modalBox}>
        <span className={styles.modalIcon}>🪑</span>

        <p className="font-slight text-burgundy text-2xl leading-tight">
          ¿Solo {filled} de {total}?
        </p>

        <p className="font-seasons text-burgundy/75 text-base leading-relaxed">
          Tu invitación tiene espacio para{' '}
          <strong>{total} persona{total === 1 ? '' : 's'}</strong>, pero solo
          has completado{' '}
          <strong>{filled} nombre{filled === 1 ? '' : 's'}</strong>.
          <br />
          ¿Confirmas la asistencia solo para {filled}?
        </p>

        <div className={styles.modalActions}>
          <Button type="button" variant="outline" onClick={onCancel}>
            Volver a editar
          </Button>
          <Button type="button" onClick={onConfirm}>
            Sí, confirmar {filled}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RSVPSection() {
  const [step,          setStep]          = useState<Step>('code')
  const [code,          setCode]          = useState('')
  const [failCount,     setFailCount]     = useState(0)
  const [lookupErr,     setLookupErr]     = useState<string | null>(null)
  const [submitErr,     setSubmitErr]     = useState<string | null>(null)
  const [loading,       setLoading]       = useState(false)
  const [isClosed,      setIsClosed]      = useState(false)
  const [showPartialModal, setShowPartialModal] = useState(false)
  const [email, setEmail] = useState('');


  const [form, setForm] = useState<FormState>({
    invitation:   null,
    existingRsvp: null,
    attending:    null,
    attendees:    [],
    phone:        '',
    notes:        '',
  })

  useEffect(() => {
    setIsClosed(isDeadlinePassed())
  }, [])

  // ─── Lookup ──────────────────────────────────────────────────────────────────

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()
    setLookupErr(null)
    setLoading(true)

    try {
      const res  = await fetch('/api/rsvp/lookup', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ rsvpCode: code }),
      })
      const json = await res.json()

      if (!json.success) {
        setFailCount((c) => c + 1)
        setLookupErr(json.error)
        setLoading(false)
        return
      }

      const { invitation, rsvp } = json.data

      // Pre-fill attendees: use saved names if editing, else empty rows = allowed_seats
      const prefillAttendees: Attendee[] =
        rsvp?.attendees?.length
          ? [
              ...rsvp.attendees,
              // Pad with empty rows up to allowed_seats so all slots are visible
              ...buildEmptyAttendees(
                Math.max(0, invitation.allowed_seats - rsvp.attendees.length)
              ),
            ]
          : buildEmptyAttendees(invitation.allowed_seats)

      setForm({
        invitation,
        existingRsvp: rsvp,
        attending:    rsvp ? rsvp.attending : null,
        attendees:    prefillAttendees,
        phone:        rsvp?.phone ?? '',
        notes:        rsvp?.notes ?? '',
      })
      setEmail(rsvp?.email ?? '')
      setStep('form')
    } catch {
      setLookupErr('Error de conexión. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // ─── Attendance toggle ────────────────────────────────────────────────────────

  function handleAttendanceChange(attending: boolean) {
    setForm((prev) => ({
      ...prev,
      attending,
      attendees: attending
        ? (() => {
            // Keep saved names + pad to allowed_seats
            const saved = prev.existingRsvp?.attending
              ? prev.existingRsvp.attendees ?? []
              : []
            const slots = prev.invitation!.allowed_seats
            return [
              ...saved,
              ...buildEmptyAttendees(Math.max(0, slots - saved.length)),
            ]
          })()
        : [],
    }))
    setSubmitErr(null)
  }

  // ─── Attendee field updates ───────────────────────────────────────────────────

  function updateAttendee(index: number, field: keyof Attendee, value: string) {
    setForm((prev) => {
      const updated = [...prev.attendees]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, attendees: updated }
    })
  }

  // ─── Submit pipeline ──────────────────────────────────────────────────────────

  // Called after user confirms partial modal OR when all seats are filled
  async function doSubmit() {
    if (!form.invitation || form.attending === null) return
    setShowPartialModal(false)
    setSubmitErr(null)
    setLoading(true)

    try {
      const res  = await fetch('/api/rsvp/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          invitationId: form.invitation.id,
          attending:    form.attending,
          email,  
          attendees:    form.attending ? form.attendees : [],
          phone:        form.phone  || '',
          notes:        form.notes  || '',
        }),
      })
      const json = await res.json()

      if (!json.success) {
        setSubmitErr(json.error)
        setLoading(false)
        return
      }

      setStep('confirmed')
    } catch {
      setSubmitErr('Error de conexión. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Gate: show partial modal if attending and some seats are left empty
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.invitation || form.attending === null) return
    setSubmitErr(null)

    if (form.attending) {
        if (!email.trim()) {
        setSubmitErr('Por favor ingresa tu email para confirmar.');
        return;
      }

      const filled = countFilledAttendees(form.attendees);

      // Must have at least 1 filled row
      if (filled === 0) {
        setSubmitErr('Por favor ingresa al menos un nombre para confirmar tu asistencia.')
        return
      }

      // Some seats left empty → show confirmation modal
      if (filled < form.invitation.allowed_seats) {
        setShowPartialModal(true)
        return
      }
    }

    // No gaps or not attending → submit directly
    void doSubmit()
  }

  // ─── Computed values ──────────────────────────────────────────────────────────

  const filledCount = form.attending
    ? countFilledAttendees(form.attendees)
    : 0

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Partial seats confirmation modal — rendered outside section flow */}
      {showPartialModal && form.invitation && (
        <PartialSeatsModal
          filled={filledCount}
          total={form.invitation.allowed_seats}
          onConfirm={doSubmit}
          onCancel={() => setShowPartialModal(false)}
        />
      )}

      <section id="rsvp" className="py-20 bg-cream">
        <Container>
          <ScrollReveal>
            <SectionHeading variant="dark" className="mb-12">
              Confirma tu Presencia
            </SectionHeading>
          </ScrollReveal>

          {/* ── RSVP Closed ───────────────────────────────────────────────── */}
          {isClosed && (
            <ScrollReveal delay={100}>
              <div className={styles.closedCard}>
                <span className="text-4xl">📅</span>
                <p className="font-cinzel text-burgundy text-sm tracking-widest uppercase">
                  Plazo cerrado
                </p>
                <p className="font-seasons text-burgundy/80 text-base leading-relaxed">
                  {eventConfig.rsvp.closedMessage}
                </p>
                <a
                  href={`mailto:${eventConfig.contact.email}`}
                  className="font-cinzel text-burgundy text-sm underline underline-offset-4 hover:text-burgundy-light transition-colors"
                >
                  {eventConfig.contact.email}
                </a>
              </div>
            </ScrollReveal>
          )}

          {/* ── Step: Code Entry ──────────────────────────────────────────── */}
          {!isClosed && step === 'code' && (
            <ScrollReveal delay={100}>
              <form onSubmit={handleLookup} className={styles.codeForm}>
                <p className="font-seasons text-burgundy/70 text-base text-center leading-relaxed">
                  Ingresa el código de tu invitación para confirmar tu asistencia.
                </p>

                <div className={styles.inputRow}>
                  <Input
                    className={styles.codeInput}
                    placeholder="Ej: JHOOF"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase())
                      setLookupErr(null)
                    }}
                    maxLength={20}
                    autoCapitalize="characters"
                    disabled={loading}
                    aria-label="Código de invitación"
                  />
                  <Button type="submit" disabled={loading || !code.trim()}>
                    {loading ? 'Buscando…' : 'Buscar'}
                  </Button>
                </div>

                {lookupErr && (
                  <div className={styles.errorBox} role="alert">
                    <p className="font-cinzel text-burgundy text-sm">{lookupErr}</p>
                    {failCount >= 2 && (
                      <p className="font-seasons text-burgundy/70 text-sm">
                        ¿Tienes problemas?{' '}
                        <a
                          href={`mailto:${eventConfig.contact.email}`}
                          className="underline underline-offset-4 hover:text-burgundy transition-colors"
                        >
                          Escríbenos
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </form>
            </ScrollReveal>
          )}

          {/* ── Step: RSVP Form ───────────────────────────────────────────── */}
          {!isClosed && step === 'form' && form.invitation && (
            <ScrollReveal delay={100}>
              <form onSubmit={handleSubmit} className={styles.familyCard}>

                {/* Family greeting */}
                <div className="text-center">
                  <p className={styles.fieldLabel}>Invitación para</p>
                  <p className="font-slight text-burgundy text-2xl">
                    {form.invitation.display_name}
                  </p>
                  {form.existingRsvp && (
                    <p className="font-seasons text-burgundy/60 text-sm mt-1 italic">
                      Ya confirmaste. Puedes actualizar tu respuesta abajo.
                    </p>
                  )}
                </div>

                <div className={styles.confirmationDivider} />

                {/* Attendance choice */}
                <div>
                  <p className={styles.fieldLabel}>¿Asistirás?</p>
                  <div className={styles.attendanceRow}>
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange(true)}
                      className={`${styles.attendanceBtn} ${
                        form.attending === true
                          ? styles.attendanceBtnYesActive
                          : styles.attendanceBtnYes
                      }`}
                    >
                      Sí, asistiré
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange(false)}
                      className={`${styles.attendanceBtn} ${
                        form.attending === false
                          ? styles.attendanceBtnNoActive
                          : styles.attendanceBtnNo
                      }`}
                    >
                      No podré ir
                    </button>
                  </div>
                </div>

                {/* Attending — attendee name fields */}
                {form.attending === true && (
                  <div>
                    <div className="flex items-baseline justify-between mb-2 flex-wrap gap-1">
                      <p className={styles.fieldLabel}>
                        Nombre de los asistentes
                      </p>
                      {/* Live seat counter */}
                      <p className="font-cinzel text-xs text-burgundy/50 tracking-wide">
                        {filledCount} / {form.invitation.allowed_seats} lugar{form.invitation.allowed_seats === 1 ? '' : 'es'}
                      </p>
                    </div>
                    <div className={styles.attendeeList}>
                      {form.attendees.map((att, i) => (
                        <div key={i} className={styles.attendeeRow}>
                          <span className={styles.attendeeNumber}>{i + 1}.</span>
                          <Input
                            placeholder="Nombre"
                            value={att.firstName}
                            onChange={(e) => updateAttendee(i, 'firstName', e.target.value)}
                            aria-label={`Nombre persona ${i + 1}`}
                          />
                          <Input
                            placeholder="Apellido"
                            value={att.lastName}
                            onChange={(e) => updateAttendee(i, 'lastName', e.target.value)}
                            aria-label={`Apellido persona ${i + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Attending — email field */}
                {form.attending === true && (
                  <div>
                    <p className={styles.fieldLabel}>
                      Email <span style={{ color: '#b91c1c' }}>*</span>
                    </p>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      disabled={loading}
                      aria-label="Email de contacto"
                    />
                  </div>
                )}

                {/* Phone (optional) */}
                {form.attending !== null && (
                  <div>
                    <p className={styles.fieldLabel}>
                      Teléfono <span className="opacity-50">(opcional)</span>
                    </p>
                    <Input
                      type="tel"
                      placeholder="+34 600 000 000"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      aria-label="Número de teléfono"
                    />
                  </div>
                )}

                {/* Notes (all guests) */}
                {form.attending !== null && (
                  <div>
                    <p className={styles.fieldLabel}>
                      Mensaje o notas <span className="opacity-50">(opcional)</span>
                    </p>
                    <Textarea
                      placeholder={
                        form.attending === false
                          ? 'Déjanos un mensaje…'
                          : 'Alergias, canciones favoritas, o lo que quieras decirnos…'
                      }
                      value={form.notes}
                      onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                      rows={3}
                      aria-label="Notas o mensaje"
                    />
                  </div>
                )}

                {/* Submit error */}
                {submitErr && (
                  <div className={styles.errorBox} role="alert">
                    <p className="font-cinzel text-burgundy text-sm">{submitErr}</p>
                  </div>
                )}

                {/* Actions */}
                {form.attending !== null && (
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setStep('code')
                        setCode('')
                        setLookupErr(null)
                        setFailCount(0)
                      }}
                    >
                      Volver
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading
                        ? 'Guardando…'
                        : form.existingRsvp
                          ? 'Actualizar confirmación'
                          : 'Confirmar asistencia'}
                    </Button>
                  </div>
                )}
              </form>
            </ScrollReveal>
          )}

          {/* ── Step: Confirmation Card ────────────────────────────────────── */}
          {step === 'confirmed' && (
            <ScrollReveal delay={100}>
              <div className={styles.confirmationCard}>
                <div
                  className={`${styles.confirmationIcon} ${
                    form.attending ? styles.confirmationIconYes : styles.confirmationIconNo
                  }`}
                >
                  {form.attending ? '🌹' : '🕊️'}
                </div>

                <div className="flex flex-col items-center gap-2">
                  <p className="font-slight text-burgundy text-4xl">
                    {form.attending ? '¡Nos vemos pronto!' : 'Te echaremos de menos'}
                  </p>
                  <p className={styles.confirmationDate}>
                    {eventConfig.date.displayDayOfWeek},{' '}
                    {eventConfig.date.displayFull}
                  </p>
                </div>

                <div className={styles.confirmationDivider} />

                <p className="font-seasons text-burgundy/75 text-base leading-relaxed text-center max-w-xs">
                  {form.attending
                    ? `Hemos recibido tu confirmación${filledCount > 0 ? ` para ${filledCount} persona${filledCount === 1 ? '' : 's'}` : ''}. ¡Estamos muy emocionados de celebrar este día contigo!`
                    : `Hemos recibido tu respuesta. Gracias por hacernos saber. Siempre estarás en nuestros corazones.`}
                </p>

                {form.attending && (
                  <p className="font-cinzel text-burgundy/50 text-xs tracking-widest uppercase text-center">
                    {eventConfig.ceremony.name} · {eventConfig.ceremony.time}
                  </p>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setStep('code')
                    setCode('')
                    setFailCount(0)
                    setLookupErr(null)
                    setForm({
                      invitation: null, existingRsvp: null,
                      attending: null, attendees: [], phone: '', notes: '',
                    })
                  }}
                >
                  Cerrar
                </Button>
              </div>
            </ScrollReveal>
          )}

        </Container>
      </section>
    </>
  )
}
