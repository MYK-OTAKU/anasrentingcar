"use client"

import { HeroReservationForm } from "@/components/forms/hero-reservation-form"
import { useI18n } from "@/lib/i18n/context"
import { CalendarCheck, Clock, MapPin, Shield } from "lucide-react"

export function ReservationSection() {
  const { t } = useI18n()

  const features = [
    {
      icon: MapPin,
      title: t.locale === "fr" ? "Plusieurs agences" : "Multiple locations",
      description: t.locale === "fr" ? "Casablanca, Rabat, Marrakech" : "Casablanca, Rabat, Marrakech",
    },
    {
      icon: CalendarCheck,
      title: t.locale === "fr" ? "Réservation flexible" : "Flexible booking",
      description: t.locale === "fr" ? "Annulation gratuite 24h avant" : "Free cancellation 24h before",
    },
    {
      icon: Clock,
      title: t.locale === "fr" ? "Disponible 24/7" : "Available 24/7",
      description: t.locale === "fr" ? "Service aéroport inclus" : "Airport service included",
    },
    {
      icon: Shield,
      title: t.locale === "fr" ? "Assurance complète" : "Full insurance",
      description: t.locale === "fr" ? "Tous risques incluse" : "All risks included",
    },
  ]

  return (
    <section className="relative bg-muted/50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t.locale === "fr" ? "Réservez votre véhicule" : "Book your vehicle"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t.locale === "fr"
              ? "Remplissez le formulaire ci-dessous pour une réservation rapide"
              : "Fill out the form below for a quick reservation"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left side - Features */}
          <div className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-lg bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Reservation Form */}
          <div className="lg:col-span-3">
            <HeroReservationForm />
          </div>
        </div>
      </div>
    </section>
  )
}
