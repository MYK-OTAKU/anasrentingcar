"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Loader2 } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"
import { useI18n } from "@/lib/i18n/context"
import type { ContactFormData } from "@/lib/types"

interface ContactFormProps {
  selectedCarId?: string
  showCarSelect?: boolean
}

export function ContactForm({ selectedCarId, showCarSelect = false }: ContactFormProps) {
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      car_id: (formData.get("car_id") as string) || selectedCarId || undefined,
    }

    try {
      const result = await submitContactForm(data)
      if (result.success) {
        setIsSuccess(true)
      } else {
        setError(result.error || "Une erreur est survenue. Veuillez réessayer.")
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-primary/5 p-8 text-center">
        <CheckCircle2 className="mb-4 h-12 w-12 text-primary" />
        <h3 className="mb-2 text-xl font-semibold text-foreground">{t.form.successTitle}</h3>
        <p className="text-muted-foreground">{t.form.successMessage}</p>
        <Button className="mt-4 bg-transparent" variant="outline" onClick={() => setIsSuccess(false)}>
          {t.form.sendAnother}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            {t.form.fullName} {t.form.required}
          </Label>
          <Input id="name" name="name" placeholder={t.form.fullNamePlaceholder} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            {t.form.email} {t.form.required}
          </Label>
          <Input id="email" name="email" type="email" placeholder={t.form.emailPlaceholder} required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">{t.form.phone}</Label>
          <Input id="phone" name="phone" type="tel" placeholder={t.form.phonePlaceholder} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">
            {t.form.subject} {t.form.required}
          </Label>
          <Select name="subject" required>
            <SelectTrigger id="subject">
              <SelectValue placeholder={t.form.selectSubject} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reservation">{t.form.reservation}</SelectItem>
              <SelectItem value="devis">{t.form.quote}</SelectItem>
              <SelectItem value="info">{t.form.info}</SelectItem>
              <SelectItem value="autre">{t.form.other}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showCarSelect && (
        <div className="space-y-2">
          <Label htmlFor="car_id">{t.form.vehicle}</Label>
          <Select name="car_id" defaultValue={selectedCarId}>
            <SelectTrigger id="car_id">
              <SelectValue placeholder={t.form.selectVehicle} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Renault Clio - 350 DH/jour</SelectItem>
              <SelectItem value="2">Peugeot 3008 - 650 DH/jour</SelectItem>
              <SelectItem value="3">Mercedes Classe C - 950 DH/jour</SelectItem>
              <SelectItem value="4">Citroën C3 - 300 DH/jour</SelectItem>
              <SelectItem value="5">Renault Kangoo - 450 DH/jour</SelectItem>
              <SelectItem value="6">Tesla Model 3 - 850 DH/jour</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">
          {t.form.message} {t.form.required}
        </Label>
        <Textarea id="message" name="message" placeholder={t.form.messagePlaceholder} rows={5} required />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t.form.submitting}
          </>
        ) : (
          t.form.submit
        )}
      </Button>
    </form>
  )
}
