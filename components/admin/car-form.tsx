"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Car } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface CarFormProps {
  car?: Car
}

export function CarForm({ car }: CarFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      category: formData.get("category") as string,
      seats: Number.parseInt(formData.get("seats") as string),
      transmission: formData.get("transmission") as string,
      fuel_type: formData.get("fuel_type") as string,
      price_per_day: Number.parseFloat(formData.get("price_per_day") as string),
      description: formData.get("description") as string,
      image_url: formData.get("image_url") as string,
      available: formData.get("available") === "on",
    }

    const supabase = createClient()

    try {
      if (car) {
        const { error: updateError } = await supabase.from("cars").update(data).eq("id", car.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from("cars").insert(data)
        if (insertError) throw insertError
      }

      router.push("/admin/cars")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="brand">Marque *</Label>
          <Input id="brand" name="brand" defaultValue={car?.brand} placeholder="Renault" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Modèle *</Label>
          <Input id="model" name="model" defaultValue={car?.model} placeholder="Clio" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie *</Label>
          <Select name="category" defaultValue={car?.category || "citadine"}>
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="citadine">Citadine</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="berline">Berline</SelectItem>
              <SelectItem value="utilitaire">Utilitaire</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="seats">Nombre de places *</Label>
          <Input id="seats" name="seats" type="number" min="1" max="9" defaultValue={car?.seats || 5} required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission *</Label>
          <Select name="transmission" defaultValue={car?.transmission || "manual"}>
            <SelectTrigger id="transmission">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manuelle</SelectItem>
              <SelectItem value="automatic">Automatique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fuel_type">Carburant *</Label>
          <Select name="fuel_type" defaultValue={car?.fuel_type || "essence"}>
            <SelectTrigger id="fuel_type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="essence">Essence</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electric">Électrique</SelectItem>
              <SelectItem value="hybrid">Hybride</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price_per_day">Prix par jour (€) *</Label>
        <Input
          id="price_per_day"
          name="price_per_day"
          type="number"
          min="0"
          step="0.01"
          defaultValue={car?.price_per_day}
          placeholder="35.00"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">URL de l&apos;image</Label>
        <Input id="image_url" name="image_url" type="url" defaultValue={car?.image_url} placeholder="https://..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={car?.description}
          placeholder="Description du véhicule..."
          rows={4}
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch id="available" name="available" defaultChecked={car?.available ?? true} />
        <Label htmlFor="available">Véhicule disponible à la location</Label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {car ? "Mise à jour..." : "Création..."}
            </>
          ) : car ? (
            "Mettre à jour"
          ) : (
            "Créer le véhicule"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Annuler
        </Button>
      </div>
    </form>
  )
}
