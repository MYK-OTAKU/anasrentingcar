"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import type { Car } from "@/lib/types"
import { createCar, updateCar, uploadCarImage } from "@/app/actions/cars"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, X, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CarFormProps {
  car?: Car
}

export function CarForm({ car }: CarFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState(car?.image_url || "")
  const [available, setAvailable] = useState(car?.available ?? true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const result = await uploadCarImage(formData)

      if (result.error) {
        setError(result.error)
      } else if (result.url) {
        setImageUrl(result.url)
      }
    } catch (err) {
      setError("Erreur lors de l'upload de l'image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.set("image_url", imageUrl)
    formData.set("available", available.toString())

    console.log("Form data:", {
      brand: formData.get("brand"),
      model: formData.get("model"),
      image_url: imageUrl,
      available: available,
    })

    try {
      const result = car ? await updateCar(car.id, formData) : await createCar(formData)

      console.log("Action result:", result)

      if (result.error) {
        console.error("Error from action:", result.error)
        setError(result.error)
      } else {
        console.log("Success! Redirecting...")
        router.push("/admin/cars")
        router.refresh()
      }
    } catch (err) {
      console.error("Exception:", err)
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Bouton retour */}
      <Link href="/admin/cars">
        <Button type="button" variant="outline" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </Button>
      </Link>

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
        <Label htmlFor="price_per_day">Prix par jour (DH) *</Label>
        <Input
          id="price_per_day"
          name="price_per_day"
          type="number"
          min="0"
          step="0.01"
          defaultValue={car?.price_per_day}
          placeholder="350.00"
          required
        />
      </div>

      {/* Section Upload d'image */}
      <div className="space-y-2">
        <Label>Image du véhicule *</Label>
        <div className="space-y-4">
          {imageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image src={imageUrl} alt="Aperçu" fill className="object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => setImageUrl("")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex-1"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Upload en cours...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {imageUrl ? "Changer l'image" : "Choisir une image"}
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Formats acceptés : JPG, PNG, WebP. Taille maximale : 50MB
          </p>
        </div>
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
        <Switch 
          id="available" 
          checked={available}
          onCheckedChange={setAvailable}
        />
        <Label htmlFor="available">Véhicule disponible à la location</Label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading || !imageUrl}>
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
