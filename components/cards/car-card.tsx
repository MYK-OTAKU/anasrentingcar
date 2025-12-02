"use client"

import Image from "next/image"
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

  const whatsappNumber = "212600000000" // Replace with actual number
  const whatsappMessage = encodeURIComponent(
    language === "fr"
      ? `Bonjour, je suis intéressé(e) par la location de: ${car.brand} ${car.model} (${categoryLabels[car.category]}) - ${car.price_per_day} DH/jour. Merci de me contacter.`
      : `Hello, I'm interested in renting: ${car.brand} ${car.model} (${categoryLabels[car.category]}) - ${car.price_per_day} DH/day. Please contact me.`,
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={car.image_url || "/placeholder.svg"}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
          {categoryLabels[car.category]}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-foreground">
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
      <CardFooter className="flex flex-col gap-3 border-t p-4">
        <div className="flex w-full items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{car.price_per_day} DH</span>
            <span className="text-sm text-muted-foreground"> {t.car.perDay}</span>
          </div>
        </div>
        <Button asChild className="w-full">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            {t.car.reserve}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
