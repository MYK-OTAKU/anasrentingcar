"use client"

import { HeroReservationForm } from "@/components/forms/hero-reservation-form"
import { useI18n } from "@/lib/i18n/context"
import { CalendarCheck, Clock, MapPin, Shield } from "lucide-react"

export function ReservationSection() {
  const { t } = useI18n()

  const features = [
    {
      icon: MapPin,
      title: t.reservation.features.multipleLocations.title,
      description: t.reservation.features.multipleLocations.description,
    },
    {
      icon: CalendarCheck,
      title: t.reservation.features.flexibleBooking.title,
      description: t.reservation.features.flexibleBooking.description,
    },
    {
      icon: Clock,
      title: t.reservation.features.available247.title,
      description: t.reservation.features.available247.description,
    },
    {
      icon: Shield,
      title: t.reservation.features.fullInsurance.title,
      description: t.reservation.features.fullInsurance.description,
    },
  ]

  return (
    <section className="relative py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t.reservation.sectionTitle}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t.reservation.sectionSubtitle}
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
