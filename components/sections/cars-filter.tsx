"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal, X } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

interface CarsFilterProps {
  onFilterChange?: (filters: { category: string; priceRange: string; sortBy: string }) => void
}

export function CarsFilter({ onFilterChange }: CarsFilterProps) {
  const { t } = useI18n()
  const [category, setCategory] = useState<string>("")
  const [priceRange, setPriceRange] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("")

  const hasFilters = category || priceRange || sortBy

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    onFilterChange?.({ category: value, priceRange, sortBy })
  }

  const handlePriceChange = (value: string) => {
    setPriceRange(value)
    onFilterChange?.({ category, priceRange: value, sortBy })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    onFilterChange?.({ category, priceRange, sortBy: value })
  }

  const clearFilters = () => {
    setCategory("")
    setPriceRange("")
    setSortBy("")
    onFilterChange?.({ category: "", priceRange: "", sortBy: "" })
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filtres :</span>
      </div>

      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder={t.filters.category} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t.filters.allCategories}</SelectItem>
          <SelectItem value="citadine">{t.car.citadine}</SelectItem>
          <SelectItem value="suv">{t.car.suv}</SelectItem>
          <SelectItem value="berline">{t.car.berline}</SelectItem>
          <SelectItem value="utilitaire">{t.car.utilitaire}</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priceRange} onValueChange={handlePriceChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t.filters.priceRange} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t.filters.allPrices}</SelectItem>
          <SelectItem value="0-300">{t.filters.under300}</SelectItem>
          <SelectItem value="300-600">{t.filters.between300and600}</SelectItem>
          <SelectItem value="600-900">{t.filters.between600and900}</SelectItem>
          <SelectItem value="900+">{t.filters.over900}</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t.filters.sortBy} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">{t.filters.sortDefault}</SelectItem>
          <SelectItem value="price-asc">{t.filters.sortPriceAsc}</SelectItem>
          <SelectItem value="price-desc">{t.filters.sortPriceDesc}</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="mr-1 h-4 w-4" />
          Effacer
        </Button>
      )}
    </div>
  )
}
