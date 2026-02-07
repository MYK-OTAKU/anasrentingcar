"use client"

import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ContactForm } from "@/components/forms/contact-form"
import { ReviewForm } from "@/components/forms/review-form"
import { FaqSection } from "@/components/sections/faq-section"
import { useI18n } from "@/lib/i18n/context"

export default function ContactPage() {
  const { t } = useI18n()

  const contactInfo = [
    {
      icon: MapPin,
      title: t.contact.address,
      content: t.contact.addressContent,
      link: "https://maps.google.com/?q=Airport+Mohammed+V+Casablanca+Morocco",
    },
    {
      icon: Phone,
      title: t.contact.phone,
      content: "06 38 08 36 89",
      link: "tel:+212638083689",
    },
    {
      icon: Mail,
      title: t.contact.email,
      content: "Tva25459@gmail.com",
      link: "mailto:Tva25459@gmail.com",
    },
    {
      icon: Clock,
      title: t.contact.hours,
      content: t.contact.hoursContent,
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
            {t.contact.title}
            <span className="text-primary">{t.contact.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t.contact.subtitle}</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Form - Now on top/left */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">{t.contact.sendMessage}</h2>
                <ContactForm showCarSelect />
              </div>
            </div>

            {/* Contact Info - Now on right/bottom */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">{t.contact.ourCoordinates}</h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="whitespace-pre-line text-sm text-muted-foreground hover:text-primary"
                          target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="whitespace-pre-line text-sm text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map - At the bottom of contact info */}
              <div className="mt-8 aspect-video overflow-hidden rounded-lg bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.136208575001!2d-7.589869684799866!3d33.36718748073396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62f6b8a8a8a5%3A0x8a8a8a8a8a8a8a8a!2sA%C3%A9roport%20international%20Mohammed%20V!5e0!3m2!1sen!2sma!4v1699999999999!5m2!1sen!2sma"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Rent Car Anas - Aéroport Mohammed V"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="border-t border-border bg-muted/20 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-foreground">{t.contact.shareExperience}</h2>
            <p className="mt-2 text-muted-foreground">{t.contact.shareExperienceSubtitle}</p>
          </div>
          <ReviewForm />
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />
    </>
  )
}
