"use client"

import { useState, useMemo, useEffect } from "react"
import { CarCard } from "@/components/cards/car-card"
import { CarsFilter } from "@/components/sections/cars-filter"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n/context"
import { createClient } from "@/lib/supabase/client"
import type { Car } from "@/lib/types"
import { Loader2 } from "lucide-react"
import Image from "next/image"

const CARS_PER_PAGE = 9

export default function ServicesPage() {
  const { t } = useI18n()
  const [filters, setFilters] = useState({ category: "", priceRange: "", sortBy: "" })
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(CARS_PER_PAGE)

  useEffect(() => {
    async function fetchCars() {
      const supabase = createClient()
      const { data } = await supabase
        .from("cars")
        .select("*")
        .eq("available", true)
        .order("created_at", { ascending: false })

      setCars(data || [])
      setLoading(false)
    }
    fetchCars()
  }, [])

  const filteredCars = useMemo(() => {
    let result = [...cars]

    // Filter by category
    if (filters.category && filters.category !== "all") {
      result = result.filter((car) => car.category === filters.category)
    }

    // Filter by price range
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
  }, [cars, filters])

  const displayedCars = filteredCars.slice(0, displayCount)
  const hasMore = displayCount < filteredCars.length

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero_background_anas1.png"
            alt="Showroom Rent Car Anas"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h1 className="text-balance text-4xl font-bold text-white sm:text-5xl drop-shadow-lg">
            {t.services.title} <span className="text-primary">{t.services.titleHighlight}</span>
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-200 drop-shadow-md">{t.services.subtitle}</p>
        </div>
      </section>

      {/* Filters and Cars */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <CarsFilter onFilterChange={setFilters} />

          {loading ? (
            <div className="mt-8 flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayedCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              {filteredCars.length === 0 && (
                <div className="mt-8 text-center text-muted-foreground">{t.services.noResults}</div>
              )}

              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <Button
                    onClick={() => setDisplayCount((prev) => prev + CARS_PER_PAGE)}
                    size="lg"
                    variant="outline"
                  >
                    {t.common.loadMore} ({filteredCars.length - displayCount} {t.common.remaining})
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
