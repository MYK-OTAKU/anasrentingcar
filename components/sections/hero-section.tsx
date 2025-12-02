"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      <div className="absolute inset-0">
        <Image
          src="/yellow-chevrolet-camaro-with-black-racing-stripes.jpg"
          alt="Chevrolet Camaro jaune"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
              {t.hero.title} <span className="text-primary">{t.hero.titleHighlight}</span>
            </h1>
            <p className="mt-4 text-pretty text-base text-muted-foreground lg:text-lg">{t.hero.subtitle}</p>
            <ul className="mt-6 space-y-3">
              {t.hero.features.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground/80 lg:text-base">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/services">
                  {t.hero.viewVehicles}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">{t.hero.learnMore}</Link>
              </Button>
            </div>
            {/* Price badge */}
            <div className="mt-8 inline-flex w-fit rounded-xl bg-card/80 backdrop-blur-sm p-4 shadow-lg">
              <div>
                <p className="text-sm text-muted-foreground">{t.hero.startingFrom}</p>
                <p className="text-2xl font-bold text-primary">
                  250 DH
                  <span className="text-base font-normal text-muted-foreground">{t.hero.perDay}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative h-80 w-full lg:h-[400px]">
              <Image
                src="/yellow-camaro-side-view-no-background.jpg"
                alt="Chevrolet Camaro jaune"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
