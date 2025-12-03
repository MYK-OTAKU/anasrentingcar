"use server"

import { Resend } from "resend"
import { createServerClient } from "@/lib/supabase/server"
import type { ContactFormData } from "@/lib/types"

export async function submitContactForm(data: ContactFormData) {
  try {
    const supabase = await createServerClient()

    // Save to database
    const { error: dbError } = await supabase.from("contact_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      car_id: data.car_id || null,
      status: "new",
    })

    if (dbError) {
      console.error("Database error:", dbError)
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const recipientEmail = process.env.CONTACT_EMAIL || "m2017koita@gmail.com"
      
      await resend.emails.send({
        from: "YR Location <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: `Nouveau message de contact - ${data.subject}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Téléphone:</strong> ${data.phone || "Non renseigné"}</p>
          <p><strong>Sujet:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
          ${data.car_id ? `<p><strong>Véhicule ID:</strong> ${data.car_id}</p>` : ""}
        `,
      })
      console.log(`Email sent to ${recipientEmail}`)
    } else {
      console.log("[v0] RESEND_API_KEY not set, skipping email")
    }

    return { success: true }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return { success: false, error: "Une erreur est survenue. Veuillez réessayer." }
  }
}
