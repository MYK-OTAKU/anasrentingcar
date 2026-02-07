"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero_background_ana0.png"
          alt="Luxury car"
          fill
          className="object-cover"
          priority
        />
        {/* Stronger dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 h-full flex items-center justify-center">
        <div className="max-w-2xl text-center">
          {/* 5-Star Rating Badge - Improved visibility */}
          <div className="mb-6 flex flex-col items-center justify-center gap-3 animate-fade-in">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="h-6 w-6 text-primary drop-shadow-[0_2px_4px_rgba(255,0,0,0.5)]"
                  style={{ animationDelay: `${i * 100}ms` }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-bold text-white bg-primary/20 px-4 py-1.5 rounded-full border border-primary/30 backdrop-blur-sm">
              Excellence Garantie
            </span>
          </div>

          {/* Main Heading - Reduced size */}
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl animate-fade-in-up drop-shadow-lg">
            {t.hero.title}{" "}
            <span className="bg-gradient-to-r from-primary via-red-400 to-primary bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtitle - Improved visibility */}
          <p className="mt-4 text-pretty text-base text-gray-200 lg:text-lg animate-fade-in [animation-delay:200ms] drop-shadow-md">
            {t.hero.subtitle}
          </p>

          {/* Features List - Centered and compact */}
          <ul className="mt-6 space-y-2 inline-block text-left">
            {t.hero.features.map((item, index) => (
              <li
                key={item}
                className="flex items-center gap-2 animate-fade-in-left"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary drop-shadow-[0_2px_4px_rgba(255,0,0,0.5)]" />
                <span className="text-sm text-white/95 lg:text-base drop-shadow-md">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center animate-fade-in-up [animation-delay:600ms]">
            <Button
              size="default"
              asChild
              className="group bg-primary hover:bg-primary/90 text-white red-glow hover:scale-105 transition-all shadow-xl"
            >
              <Link href="/contact">
                {t.hero.viewVehicles}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="default"
              variant="outline"
              asChild
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-sm"
            >
              <Link href="/services">{t.hero.learnMore}</Link>
            </Button>
          </div>

          {/* Price Badge - Compact */}
          <div className="mt-6 inline-flex rounded-xl bg-black/50 backdrop-blur-md border border-primary/30 px-5 py-3 shadow-2xl animate-fade-in-up [animation-delay:700ms]">
            <div>
              <p className="text-xs font-medium text-gray-300">{t.hero.startingFrom}</p>
              <p className="mt-0.5 text-2xl font-bold text-primary">
                250 DH
                <span className="ml-2 text-sm font-normal text-gray-300">{t.hero.perDay}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
