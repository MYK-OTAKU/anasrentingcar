"use server"

import { createClient } from "@/lib/supabase/server"

export async function submitReview(formData: FormData) {
  try {
    const customer_name = formData.get("customer_name") as string
    const rating = parseInt(formData.get("rating") as string)
    const comment = formData.get("comment") as string

    if (!customer_name || !rating || !comment) {
      return { error: "Tous les champs sont requis" }
    }

    if (rating < 1 || rating > 5) {
      return { error: "La note doit être entre 1 et 5" }
    }

    const supabase = await createClient()

    const { error } = await supabase.from("reviews").insert({
      customer_name,
      rating,
      comment,
      approved: false, // Les avis doivent être approuvés par l'admin
    })

    if (error) {
      console.error("Erreur lors de la soumission de l'avis:", error)
      return { error: "Une erreur s'est produite lors de la soumission de votre avis" }
    }

    return { success: true }
  } catch (error) {
    console.error("Erreur lors de la soumission de l'avis:", error)
    return { error: "Une erreur inattendue s'est produite" }
  }
}

export async function approveReview(id: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("reviews").update({ approved: true }).eq("id", id)

    if (error) {
      console.error("Erreur lors de l'approbation de l'avis:", error)
      return { error: "Une erreur s'est produite lors de l'approbation" }
    }

    return { success: true }
  } catch (error) {
    console.error("Erreur lors de l'approbation de l'avis:", error)
    return { error: "Une erreur inattendue s'est produite" }
  }
}

export async function deleteReview(id: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("reviews").delete().eq("id", id)

    if (error) {
      console.error("Erreur lors de la suppression de l'avis:", error)
      return { error: "Une erreur s'est produite lors de la suppression" }
    }

    return { success: true }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'avis:", error)
    return { error: "Une erreur inattendue s'est produite" }
  }
}

export async function updateReviewPriority(id: string, displayOrder: number) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from("reviews").update({ display_order: displayOrder }).eq("id", id)

    if (error) {
      console.error("Erreur lors de la mise à jour de la priorité:", error)
      return { error: "Une erreur s'est produite lors de la mise à jour" }
    }

    return { success: true }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la priorité:", error)
    return { error: "Une erreur inattendue s'est produite" }
  }
}
