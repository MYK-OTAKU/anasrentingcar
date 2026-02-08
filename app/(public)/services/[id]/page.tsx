import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Fuel, Settings, Users, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CarReservationForm } from "@/components/forms/car-reservation-form"
import { CarImageGallery } from "@/components/car-image-gallery"

export const dynamic = "force-dynamic"

interface CarDetailsPageProps {
  params: {
    id: string
  }
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: car, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !car) {
    notFound()
  }

  // Translation helpers (server-side simple mapping)
  const categoryLabels: Record<string, string> = {
    citadine: "Citadine",
    suv: "SUV",
    berline: "Berline",
    utilitaire: "Utilitaire",
  }

  const transmissionLabels: Record<string, string> = {
    manual: "Manuelle",
    automatic: "Automatique",
  }

  const fuelLabels: Record<string, string> = {
    essence: "Essence",
    diesel: "Diesel",
    electric: "Électrique",
    hybrid: "Hybride",
  }

  // Prepare images array (fallback to image_url if images array is empty or undefined)
  const carImages = car.images && car.images.length > 0 ? car.images : (car.image_url ? [car.image_url] : [])

  return (
    <div className="min-h-screen bg-background py-8 lg:py-12">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="pl-0 hover:bg-transparent hover:text-primary">
            <Link href="/services" className="flex items-center gap-2 text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Price Header (Mobile only) */}
            <div className="lg:hidden">
              <h1 className="text-2xl font-bold text-foreground mb-1">{car.brand} {car.model}</h1>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-primary border-primary text-xs">
                  {categoryLabels[car.category] || car.category}
                </Badge>
                {car.available ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-none text-xs">
                    Disponible
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-xs">Non disponible</Badge>
                )}
              </div>
              <p className="text-2xl font-bold text-primary">
                {car.price_per_day} DH <span className="text-sm font-normal text-muted-foreground">/ jour</span>
              </p>
            </div>

            {/* Gallery */}
            <CarImageGallery images={carImages} title={`${car.brand} ${car.model}`} />

            {/* Car Specs */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-muted/30 border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <Users className="mb-1 h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">Sièges</span>
                  <span className="font-semibold text-foreground">{car.seats}</span>
                </CardContent>
              </Card>
              <Card className="bg-muted/30 border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <Settings className="mb-1 h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">Boîte</span>
                  <span className="font-semibold text-foreground text-sm">{transmissionLabels[car.transmission] || car.transmission}</span>
                </CardContent>
              </Card>
              <Card className="bg-muted/30 border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <Fuel className="mb-1 h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">Carburant</span>
                  <span className="font-semibold text-foreground text-sm">{fuelLabels[car.fuel_type] || car.fuel_type}</span>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Description</h2>
              <Separator />
              <p className="text-muted-foreground leading-relaxed text-base">
                {car.description || "Aucune description disponible pour ce véhicule."}
              </p>

              <div className="mt-6 pt-2">
                <h3 className="text-lg font-semibold mb-4">Ce qui est inclus</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Kilométrage : 200km / jour</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Assurance Responsabilité Civile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Assistance routière 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Deuxième conducteur offert</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Modification gratuite (48h)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Surcharge aéroport incluse</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar - Reservation Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Desktop Header */}
              <div className="hidden lg:block space-y-2">
                <h1 className="text-2xl font-bold text-foreground">{car.brand} {car.model}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-primary border-primary text-xs">
                    {categoryLabels[car.category] || car.category}
                  </Badge>
                  {car.available ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-none text-xs">
                      Disponible
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">Non disponible</Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-2 pb-3 border-b">
                  <p className="text-3xl font-bold text-primary">{car.price_per_day} DH</p>
                  <span className="text-sm text-muted-foreground">/ jour</span>
                </div>
              </div>

              {/* Reservation Card */}
              <Card className="overflow-hidden border-primary/20 shadow-lg">
                <div className="bg-primary p-3 text-primary-foreground text-center font-semibold text-base">
                  Réserver ce véhicule
                </div>
                <CardContent className="p-4">
                  <CarReservationForm car={car} />

                  <Separator className="my-4" />

                  <div className="space-y-2 text-center">
                    <p className="text-xs text-muted-foreground">Besoin d'aide ? Contactez-nous</p>
                    <Button variant="ghost" className="w-full gap-2 h-8 text-sm hover:text-primary" asChild>
                      <a href="tel:0638083689">
                        <Phone className="h-3 w-3" /> 06 38 08 36 89
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
