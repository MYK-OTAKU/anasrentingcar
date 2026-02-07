"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CarCard } from "@/components/cards/car-card"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { createClient } from "@/lib/supabase/client"
import type { Car } from "@/lib/types"

export function CarsPreview() {
  const { t } = useI18n()
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCars() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('available', true)
          .limit(3)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching cars:', error)
        } else {
          setCars(data || [])
        }
      } catch (err) {
        console.error('Failed to fetch cars:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  if (loading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center text-muted-foreground">Chargement des véhicules...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              {t.carsPreview.title} <span className="text-primary">{t.carsPreview.titleHighlight}</span>
            </h2>
            <p className="mt-2 text-muted-foreground">{t.carsPreview.subtitle}</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/services">
              {t.carsPreview.viewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  )
}
