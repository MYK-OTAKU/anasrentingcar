"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Car } from "@/lib/types"

const formSchema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  startDate: z.date({
    required_error: "Date de début requise",
  }),
  endDate: z.date({
    required_error: "Date de fin requise",
  }),
  message: z.string().optional(),
})

interface CarReservationFormProps {
  car: Car
}

export function CarReservationForm({ car }: CarReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  // Calculate total days and price
  const startDate = form.watch("startDate")
  const endDate = form.watch("endDate")
  let totalDays = 0
  let totalPrice = 0

  if (startDate && endDate) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 because inclusive
    if (totalDays > 0) {
      totalPrice = totalDays * car.price_per_day
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Instead of saving to DB immediately which requires more setup,
    // let's direct to WhatsApp with pre-filled message including dates

    const formattedStartDate = format(values.startDate, "dd/MM/yyyy")
    const formattedEndDate = format(values.endDate, "dd/MM/yyyy")

    const message = `*Nouvelle Demande de Réservation*\n
🚗 Véhicule: ${car.brand} ${car.model}
💰 Prix: ${car.price_per_day} DH/jour
📅 Du: ${formattedStartDate}
📅 Au: ${formattedEndDate} (Total: ${totalDays} jours)
💵 Total estimé: ${totalPrice} DH
------------------
👤 Client: ${values.fullName}
📱 Tél: ${values.phone}
📧 Email: ${values.email}
📝 Message: ${values.message || "RAS"}`

    const whatsappUrl = `https://wa.me/212638083689?text=${encodeURIComponent(message)}`

    // Simulate API call delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank')
      setIsSubmitting(false)
      form.reset()
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet *</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone *</FormLabel>
              <FormControl>
                <Input placeholder="+212 6..." type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Du *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Date début</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Au *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Date fin</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < form.getValues("startDate")
                      }
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {totalPrice > 0 && (
          <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Durée:</span>
              <span className="font-medium">{totalDays} jours</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-primary">
              <span>Total estimé:</span>
              <span>{totalPrice.toFixed(0)} DH</span>
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optionnel)</FormLabel>
              <FormControl>
                <Textarea placeholder="Besoin d'un siège bébé ? D'un GPS ?" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 red-glow" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement...
            </>
          ) : (
            "Envoyer la demande (WhatsApp)"
          )}
        </Button>
      </form>
    </Form>
  )
}
