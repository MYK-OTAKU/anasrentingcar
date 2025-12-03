"use client"

import { Shield, Clock, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n/context"

export function ServicesSection() {
  const { t } = useI18n()

  const services = [
    {
      icon: Shield,
      title: t.whyChoose.security.title,
      description: t.whyChoose.security.description,
    },
    {
      icon: Clock,
      title: t.whyChoose.service247.title,
      description: t.whyChoose.service247.description,
    },
    {
      icon: Star,
      title: t.whyChoose.premium.title,
      description: t.whyChoose.premium.description,
    },
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {t.whyChoose.title} <span className="text-primary">{t.whyChoose.titleHighlight}</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">{t.whyChoose.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
