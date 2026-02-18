"use client";

import { useState } from "react";
import { eventConfig } from "@/config/eventConfig";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

export default function GiftsSection() {
  const [showBank, setShowBank] = useState(false);
  const { gifts } = eventConfig;

  return (
    <section id="regalo" className="bg-section-sage py-20 md:py-28">
      <Container size="sm">
        <div className="text-center flex flex-col items-center gap-6">
          {/* Gift icon placeholder */}
          <div className="w-16 h-16 flex items-center justify-center text-4xl opacity-70">
            🎁
          </div>

          <SectionHeading title="Sugerencia de Regalo" variant="burgundy" />

          <p className="font-seasons italic text-cream/90 text-lg leading-relaxed max-w-md">
            {gifts.message}
          </p>

          {gifts.bankDetails && (
            <Button variant="secondary" size="md" onClick={() => setShowBank(true)}>
              Datos Bancarios
            </Button>
          )}
        </div>
      </Container>

      {/* Bank Details Modal */}
      {gifts.bankDetails && (
        <Modal
          isOpen={showBank}
          onClose={() => setShowBank(false)}
          title="Datos Bancarios"
        >
          <div className="flex flex-col gap-4 text-burgundy">
            {[
              { label: "Titular", value: gifts.bankDetails.accountHolder },
              { label: "Banco", value: gifts.bankDetails.bank },
              { label: "IBAN", value: gifts.bankDetails.iban },
              { label: "BIC/SWIFT", value: gifts.bankDetails.bic },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-cinzel text-xs tracking-widest uppercase text-burgundy/50">
                  {label}
                </span>
                <span className="font-seasons text-base">{value}</span>
                <div className="h-px bg-burgundy/10" />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
}
