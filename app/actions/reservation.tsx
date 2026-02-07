"use server"

import { Resend } from "resend"
import { createServerClient } from "@/lib/supabase/server"

interface ReservationData {
  location: string
  departureDate: string
  departureTime: string
  returnDate: string
  returnTime: string
  phone: string
}

const locationLabels: Record<string, string> = {
  casablanca: "HILMANI CAR (AGENCE CASABLANCA)",
  mohammed_v: "AÉROPORT INTERNATIONAL MOHAMMED V DE CASABLANCA",
  rabat: "RABAT - SALÉ AIRPORT",
  marrakech: "MARRAKECH MENARA AIRPORT",
}

export async function submitReservationForm(data: ReservationData) {
  try {
    // Validate data
    if (!data.location || !data.departureDate || !data.returnDate || !data.phone) {
      return { success: false, error: "Veuillez remplir tous les champs obligatoires." }
    }

    const locationLabel = locationLabels[data.location] || data.location

    // Save to Supabase
    const supabase = await createServerClient()
    const { error: dbError } = await supabase.from("contact_requests").insert({
      name: `Réservation - ${data.phone}`,
      email: "reservation@yr-location.ma",
      phone: data.phone,
      subject: "reservation",
      message: `
Lieu de prise en charge: ${locationLabel}
Date de départ: ${data.departureDate} à ${data.departureTime}
Date de retour: ${data.returnDate} à ${data.returnTime}
Téléphone: ${data.phone}
      `.trim(),
      status: "new",
    })

    if (dbError) {
      console.error("Database error:", dbError)
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: "Tourisme Car <onboarding@resend.dev>",
        to: ["m2017koita@gmail.com"],
        subject: `Nouvelle réservation - ${data.phone}`,
        html: `
          <h2>Nouvelle demande de réservation</h2>
          <p><strong>Lieu de prise en charge:</strong> ${locationLabel}</p>
          <p><strong>Date de départ:</strong> ${data.departureDate} à ${data.departureTime}</p>
          <p><strong>Date de retour:</strong> ${data.returnDate} à ${data.returnTime}</p>
          <p><strong>Téléphone:</strong> ${data.phone}</p>
        `,
      })
    } else {
      console.log("[v0] RESEND_API_KEY not set, skipping email")
    }

    return { success: true }
  } catch (error) {
    console.error("Reservation submission error:", error)
    return { success: false, error: "Une erreur est survenue. Veuillez réessayer." }
  }
}
