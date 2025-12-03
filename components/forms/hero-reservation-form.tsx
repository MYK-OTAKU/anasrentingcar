"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Loader2, MapPin, Calendar, Clock, Phone } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { submitReservationForm } from "@/app/actions/reservation"

export function HeroReservationForm() {
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const locations = [
    { value: "casablanca", label: t.locations.casablanca },
    { value: "mohammed_v", label: t.locations.mohammedV },
    { value: "rabat", label: t.locations.rabat },
    { value: "marrakech", label: t.locations.marrakech },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      location: formData.get("location") as string,
      departureDate: formData.get("departureDate") as string,
      departureTime: formData.get("departureTime") as string,
      returnDate: formData.get("returnDate") as string,
      returnTime: formData.get("returnTime") as string,
      phone: formData.get("phone") as string,
    }

    try {
      const result = await submitReservationForm(data)
      if (result.success) {
        setIsSuccess(true)
      } else {
        setError(result.error || "Une erreur est survenue.")
      }
    } catch {
      setError("Une erreur est survenue.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-6 text-center shadow-xl">
        <CheckCircle2 className="mb-4 h-12 w-12 text-primary" />
        <h3 className="mb-2 text-lg font-semibold text-foreground">{t.reservation.success}</h3>
        <p className="text-sm text-muted-foreground">{t.reservation.successMessage}</p>
        <Button className="mt-4 bg-transparent" variant="outline" onClick={() => setIsSuccess(false)}>
          {t.reservation.newRequest}
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-card p-6 shadow-xl">
      <h2 className="mb-4 text-xl font-bold text-foreground">{t.reservation.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            {t.reservation.pickupLocation} *
          </Label>
          <Select name="location" required>
            <SelectTrigger id="location">
              <SelectValue placeholder={t.reservation.selectLocation} />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc.value} value={loc.value}>
                  {loc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Departure Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="departureDate" className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              {t.reservation.departureDate} *
            </Label>
            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departureTime" className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              {t.reservation.departureTime}
            </Label>
            <Input id="departureTime" name="departureTime" type="time" defaultValue="09:00" />
          </div>
        </div>

        {/* Return Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="returnDate" className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              {t.reservation.returnDate} *
            </Label>
            <Input
              id="returnDate"
              name="returnDate"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="returnTime" className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              {t.reservation.returnTime}
            </Label>
            <Input id="returnTime" name="returnTime" type="time" defaultValue="09:00" />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            {t.reservation.phone} *
          </Label>
          <Input id="phone" name="phone" type="tel" placeholder={t.reservation.phonePlaceholder} required />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.reservation.sending}
            </>
          ) : (
            t.reservation.startNow
          )}
        </Button>
      </form>
    </div>
  )
}
