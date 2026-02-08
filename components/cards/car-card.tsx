"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Fuel, Settings } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n/context"
import type { Car } from "@/lib/types"

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const { t, language } = useI18n()

  const categoryLabels: Record<string, string> = {
    citadine: t.car.citadine,
    suv: t.car.suv,
    berline: t.car.berline,
    utilitaire: t.car.utilitaire,
  }

  const transmissionLabels: Record<string, string> = {
    manual: t.car.manual,
    automatic: t.car.automatic,
  }

  const fuelLabels: Record<string, string> = {
    essence: t.car.essence,
    diesel: t.car.diesel,
    electric: t.car.electric,
    hybrid: t.car.hybrid,
  }

  const whatsappNumber = "212638083689"
  const whatsappMessage = encodeURIComponent(
    language === "fr"
      ? `Bonjour, je suis intéressé(e) par la location de: ${car.brand} ${car.model} (${categoryLabels[car.category]}) - ${car.price_per_day} DH/jour. Merci de me contacter.`
      : `Hello, I'm interested in renting: ${car.brand} ${car.model} (${categoryLabels[car.category]}) - ${car.price_per_day} DH/day. Please contact me.`,
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 duration-300 flex flex-col h-full">
      {/* Main Clickable Area - Covers the whole card */}
      <Link href={`/services/${car.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Voir les détails de {car.brand} {car.model}</span>
      </Link>

      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={car.image_url || "/placeholder.svg"}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground shadow-lg animate-fade-in z-20">
          {categoryLabels[car.category]}
        </Badge>
        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
          <span className="text-white font-bold text-lg border-2 border-white px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Voir détails
          </span>
        </div>
      </div>

      <CardContent className="p-4 flex-grow relative">
        <div className="block mb-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {car.brand} {car.model}
          </h3>
        </div>
        <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {car.seats} {t.car.seats}
          </span>
          <span className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            {transmissionLabels[car.transmission]}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            {fuelLabels[car.fuel_type]}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{car.description}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t p-4 mt-auto relative z-20">
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{car.price_per_day} DH</span>
            <span className="text-sm text-muted-foreground"> {t.car.perDay}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          {/* Le bouton Détails est visuel seulement, le clic est géré par le lien global z-10 */}
          <Button variant="outline" className="w-full hover:bg-primary/5 hover:text-primary hover:border-primary/30 pointer-events-none">
            Détails
          </Button>

          {/* IMPORTANT: Le bouton WhatsApp doit être CLIKABLE, donc z-30 (au dessus du lien z-10 et du footer z-20) */}
          <Button className="w-full bg-primary hover:bg-primary/90 red-glow pointer-events-auto relative z-30" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              {t.car.reserve}
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
