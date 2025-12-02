"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Fuel, Settings, MessageCircle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n/context"
import type { Car } from "@/lib/types"

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const { t } = useI18n()

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
    `Bonjour, je suis intéressé(e) par la location de: ${car.brand} ${car.model} (${categoryLabels[car.category]}) - ${car.price_per_day} DH/jour. Merci de me contacter.`,
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
        <div className="flex w-full gap-2">
          <Button asChild className="flex-1">
            <Link href={`/contact?car=${car.id}`}>{t.car.reserve}</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="flex-shrink-0 border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-transparent"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
