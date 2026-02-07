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

  return (
    <div className="min-h-screen bg-background py-16 lg:py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
            <Link href="/services" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour aux véhicules
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Price Header (Mobile only) */}
            <div className="lg:hidden">
              <h1 className="text-3xl font-bold text-foreground mb-2">{car.brand} {car.model}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-primary border-primary">
                  {categoryLabels[car.category] || car.category}
                </Badge>
                {car.available ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-none">
                    Disponible
                  </Badge>
                ) : (
                  <Badge variant="destructive">Non disponible</Badge>
                )}
              </div>
              <p className="text-3xl font-bold text-primary">
                {car.price_per_day} DH <span className="text-sm font-normal text-muted-foreground">/ jour</span>
              </p>
            </div>

            {/* Main Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 shadow-2xl bg-black/5">
              <Image
                src={car.image_url || "/placeholder.svg"}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Car Specs */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-muted/30 border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Users className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Sièges</span>
                  <span className="font-bold text-foreground">{car.seats}</span>
                </CardContent>
              </Card>
              <Card className="bg-muted/30 border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Settings className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Boîte</span>
                  <span className="font-bold text-foreground">{transmissionLabels[car.transmission] || car.transmission}</span>
                </CardContent>
              </Card>
              <Card className="bg-muted/30 border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Fuel className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Carburant</span>
                  <span className="font-bold text-foreground">{fuelLabels[car.fuel_type] || car.fuel_type}</span>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Description</h2>
              <Separator />
              <p className="text-muted-foreground leading-relaxed text-lg">
                {car.description || "Aucune description disponible pour ce véhicule."}
              </p>

              <div className="mt-8 pt-4">
                <h3 className="text-xl font-semibold mb-6">Ce qui est inclus</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Kilométrage : 200km / jour</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Assurance Responsabilité Civile</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Assistance routière 24/7</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Deuxième conducteur offert</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Modification gratuite (48h)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Surcharge aéroport incluse</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar - Reservation Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Desktop Header */}
              <div className="hidden lg:block space-y-4">
                <h1 className="text-3xl font-bold text-foreground">{car.brand} {car.model}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-primary border-primary">
                    {categoryLabels[car.category] || car.category}
                  </Badge>
                  {car.available ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-none">
                      Disponible
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Non disponible</Badge>
                  )}
                </div>
                <div className="flex items-baseline gap-2 pb-4 border-b">
                  <p className="text-4xl font-bold text-primary">{car.price_per_day} DH</p>
                  <span className="text-muted-foreground">/ jour</span>
                </div>
              </div>

              {/* Reservation Card */}
              <Card className="overflow-hidden border-primary/20 shadow-xl">
                <div className="bg-primary p-4 text-primary-foreground text-center font-semibold text-lg">
                  Réserver ce véhicule
                </div>
                <CardContent className="p-6">
                  <CarReservationForm car={car} />

                  <Separator className="my-6" />

                  <div className="space-y-4 text-center">
                    <p className="text-sm text-muted-foreground">Besoin d'aide ? Contactez-nous</p>
                    <Button variant="outline" className="w-full gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30" asChild>
                      <a href="tel:0638083689">
                        <Phone className="h-4 w-4" /> 06 38 08 36 89
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
