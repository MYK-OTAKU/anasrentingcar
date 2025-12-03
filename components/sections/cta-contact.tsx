"use client"

import { ContactForm } from "@/components/forms/contact-form"
import { useI18n } from "@/lib/i18n/context"

export function CtaContact() {
  const { t } = useI18n()

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
                {t.cta.title}
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                {t.cta.subtitle}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>{t.cta.features.response}</li>
                <li>{t.cta.features.quote}</li>
                <li>{t.cta.features.advice}</li>
              </ul>
            </div>
            <div className="bg-card p-8 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
