"use client"

import Image from "next/image"
import { Shield, Users, Clock, Award, MapPin, Car } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export default function AboutPage() {
  const { t } = useI18n()

  const values = [
    { icon: Shield, ...t.about.values.security },
    { icon: Users, ...t.about.values.service },
    { icon: Clock, ...t.about.values.flexibility },
    { icon: Award, ...t.about.values.quality },
  ]

  const stats = [
    { value: "10+", label: t.about.stats.experience },
    { value: "50+", label: t.about.stats.vehicles },
    { value: "5000+", label: t.about.stats.clients },
    { value: "24/7", label: t.about.stats.assistance },
  ]

  const team = [
    { name: "Yassine R.", role: t.about.team.founder, image: "/professional-man-portrait-business.png" },
    { name: "Sophie M.", role: t.about.team.customerService, image: "/professional-woman-customer-service.png" },
    { name: "Marc D.", role: t.about.team.fleetManager, image: "/professional-man-portrait-mechanic.jpg" },
  ]

  const reasons = [
    { icon: Car, ...t.about.reasons.fleet },
    { icon: MapPin, ...t.about.reasons.location },
    { icon: Shield, ...t.about.reasons.insurance },
    { icon: Clock, ...t.about.reasons.assistance24 },
    { icon: Users, ...t.about.reasons.advice },
    { icon: Award, ...t.about.reasons.transparent },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
                {t.about.title} <span className="text-primary">{t.about.titleHighlight}</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">{t.about.description1}</p>
              <p className="mt-4 text-muted-foreground">{t.about.description2}</p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/car-rental-agency-showroom-professional.jpg"
                  alt="Agence YR Location"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">{t.about.valuesTitle}</h2>
            <p className="mt-2 text-muted-foreground">{t.about.valuesSubtitle}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">{t.about.whyUs}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
                <reason.icon className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">{reason.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">{t.about.teamTitle}</h2>
            <p className="mt-2 text-muted-foreground">{t.about.teamSubtitle}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
