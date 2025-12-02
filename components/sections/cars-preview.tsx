import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CarCard } from "@/components/cards/car-card"
import { mockCars } from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"

export function CarsPreview() {
  // Show first 3 cars for preview
  const previewCars = mockCars.slice(0, 3)

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Notre gamme de véhicules</h2>
            <p className="mt-2 text-muted-foreground">Découvrez notre sélection de voitures pour tous vos besoins</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/services">
              Voir tous les véhicules
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  )
}
