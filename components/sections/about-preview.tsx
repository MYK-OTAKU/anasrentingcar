"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Clock, Award } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function AboutPreview() {
  const { t } = useI18n()

  const features = [
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
      icon: Award,
      title: t.whyChoose.premium.title,
      description: t.whyChoose.premium.description,
    },
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">{t.aboutPreview.title}</h2>
            <p className="mt-4 text-pretty text-muted-foreground">{t.aboutPreview.description1}</p>
            <p className="mt-4 text-muted-foreground">{t.aboutPreview.description2}</p>
            <Button className="mt-6 bg-transparent" variant="outline" asChild>
              <Link href="/about">{t.aboutPreview.learnMore}</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-1">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
