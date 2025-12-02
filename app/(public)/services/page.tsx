"use client"

import { useState, useMemo } from "react"
import { CarCard } from "@/components/cards/car-card"
import { CarsFilter } from "@/components/sections/cars-filter"
import { mockCars } from "@/lib/mock-data"
import { useI18n } from "@/lib/i18n/context"

export default function ServicesPage() {
  const { t } = useI18n()
  const [filters, setFilters] = useState({ category: "", priceRange: "", sortBy: "" })

  const filteredCars = useMemo(() => {
    let result = [...mockCars]

    // Filter by category
    if (filters.category && filters.category !== "all") {
      result = result.filter((car) => car.category === filters.category)
    }

    // Filter by price range (in DH)
    if (filters.priceRange && filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      if (max) {
        result = result.filter((car) => car.price_per_day >= min && car.price_per_day <= max)
      } else {
        // "900+" case
        result = result.filter((car) => car.price_per_day >= 900)
      }
    }

    // Sort
    if (filters.sortBy === "price-asc") {
      result.sort((a, b) => a.price_per_day - b.price_per_day)
    } else if (filters.sortBy === "price-desc") {
      result.sort((a, b) => b.price_per_day - a.price_per_day)
    }

    return result
  }, [filters])

  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
            {t.services.title} <span className="text-primary">{t.services.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t.services.subtitle}</p>
        </div>
      </section>

      {/* Filters and Cars */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <CarsFilter onFilterChange={setFilters} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          {filteredCars.length === 0 && (
            <div className="mt-8 text-center text-muted-foreground">Aucun véhicule ne correspond à vos critères.</div>
          )}
        </div>
      </section>
    </>
  )
}
