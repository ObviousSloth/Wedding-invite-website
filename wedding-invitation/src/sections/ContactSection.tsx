"use client";

import { useState } from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import ScrollReveal from '@/components/ScrollReveal';

import { eventConfig } from '@/config/eventConfig';

import styles from './ContactSection.module.css';

const MAX_MESSAGE = 500;

export default function ContactSection() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim() || !message.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, message }),
      });
      const data: { success: boolean; error?: string } = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? 'Algo salió mal. Intenta de nuevo.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contacto" className={styles.section}>
      <Container>
        <ScrollReveal>
          <SectionHeading variant="dark">Contáctanos</SectionHeading>
        </ScrollReveal>

        {/* Static email display — always visible */}
        <ScrollReveal delay={100}>
          <div className={styles.contactIntro}>
            <p className={styles.contactMessage}>{eventConfig.contact.message}</p>
            <a
              href={`mailto:${eventConfig.contact.email}`}
              className={styles.emailLink}
            >
              {eventConfig.contact.email}
            </a>
          </div>
        </ScrollReveal>

        {/* Contact form */}
        <ScrollReveal delay={200}>
          {submitted ? (
            <div className={styles.successCard}>
              <span className={styles.successIcon}>💌</span>
              <p className={styles.successTitle}>¡Mensaje enviado!</p>
              <p className={styles.successBody}>
                Gracias por escribirnos. Te responderemos pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.nameRow}>
                <div className={styles.field}>
                  <label htmlFor="contact-firstName" className={styles.label}>
                    Nombre
                  </label>
                  <Input
                    id="contact-firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Tu nombre"
                    disabled={loading}
                    autoComplete="given-name"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-lastName" className={styles.label}>
                    Apellido
                  </label>
                  <Input
                    id="contact-lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Tu apellido"
                    disabled={loading}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className={styles.messageWrapper}>
                <label htmlFor="contact-message" className={styles.label}>
                  Mensaje
                </label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value.slice(0, MAX_MESSAGE))
                  }
                  placeholder="Escribe tu mensaje aquí..."
                  rows={5}
                  disabled={loading}
                />
                <p
                  className={`${styles.charCount} ${
                    message.length >= MAX_MESSAGE ? styles.charCountLimit : ''
                  }`}
                >
                  {message.length} / {MAX_MESSAGE}
                </p>
              </div>

              {error && <p className={styles.errorText} role="alert">{error}</p>}

              <div className={styles.submitRow}>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </div>
            </form>
          )}
        </ScrollReveal>
      </Container>
    </section>
  );
}
