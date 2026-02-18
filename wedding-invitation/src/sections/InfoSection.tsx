"use client";

import { eventConfig } from "@/config/eventConfig";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export default function InfoSection() {
  const { ceremony, reception, dressCode } = eventConfig;

  return (
    <section id="info" className="bg-section-burgundy py-20 md:py-28">
      <Container size="lg">

        {/* Ceremony + Reception */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

          {/* Ceremony Card */}
          <Card variant="outline" className="text-cream border-cream/30 text-center">
            <div className="flex flex-col items-center gap-4">
              {/* Ring icon placeholder */}
              <div className="w-12 h-12 flex items-center justify-center opacity-60">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h3 className="font-slight text-3xl text-cream">Ceremonia Religiosa</h3>
              <div className="divider text-cream" />
              <p className="font-icon text-5xl text-cream">{ceremony.time}</p>
              <p className="font-cinzel tracking-widest uppercase text-sm text-cream/80">
                {ceremony.name}
              </p>
              <p className="font-oldstandard italic text-cream/70 text-sm">
                {ceremony.location}
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(ceremony.mapsUrl, "_blank")}
              >
                Ver ubicación
              </Button>
            </div>
          </Card>

          {/* Reception Card */}
          <Card variant="outline" className="text-cream border-cream/30 text-center">
            <div className="flex flex-col items-center gap-4">
              {/* Champagne glasses icon placeholder */}
              <div className="w-12 h-12 flex items-center justify-center opacity-60">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
                  <path d="M8 2l2 8-4 4h8l-4-4 2-8" />
                  <path d="M16 2l2 8-4 4h8l-4-4 2-8" />
                </svg>
              </div>
              <h3 className="font-slight text-3xl text-cream">Recepción</h3>
              <div className="divider text-cream" />
              <p className="font-icon text-5xl text-cream">{reception.time}</p>
              <p className="font-cinzel tracking-widest uppercase text-sm text-cream/80">
                {reception.name}
              </p>
              <p className="font-oldstandard italic text-cream/70 text-sm">
                {reception.location}
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(reception.mapsUrl, "_blank")}
              >
                Ver ubicación
              </Button>
            </div>
          </Card>
        </div>

        {/* Dress Code */}
        <div className="text-center">
          <SectionHeading title="Código de Vestimenta" variant="burgundy" />

          <p className="font-cinzel tracking-[0.4em] uppercase text-cream text-lg mb-3">
            {dressCode.code}
          </p>
          <p className="font-seasons italic text-cream/70 text-base mb-8">
            {dressCode.note}
          </p>

          {/* Color Palette */}
          <div className="mt-4">
            <p className="font-cinzel text-cream/60 tracking-widest uppercase text-xs mb-5">
              Sugerencia de colores
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {dressCode.suggestedColors.map((color) => (
                <div key={color.name} className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-cream/20 shadow"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                  <span className="font-cinzel text-cream/60 text-xs">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
