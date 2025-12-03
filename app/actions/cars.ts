"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function uploadCarImage(formData: FormData) {
  const file = formData.get("file") as File
  if (!file) {
    return { error: "Aucun fichier fourni" }
  }

  const supabase = await createClient()

  // Vérifier l'authentification admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Non authentifié" }
  }

  const { data: adminData } = await supabase.from("admins").select("id").eq("id", user.id).single()
  if (!adminData) {
    return { error: "Non autorisé" }
  }

  try {
    // Créer un nom de fichier unique
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `cars/${fileName}`

    // Upload vers Supabase Storage
    const { error: uploadError } = await supabase.storage.from("car-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return { error: uploadError.message }
    }

    // Obtenir l'URL publique
    const {
      data: { publicUrl },
    } = supabase.storage.from("car-images").getPublicUrl(filePath)

    return { url: publicUrl }
  } catch (error) {
    console.error("Error uploading image:", error)
    return { error: "Erreur lors de l'upload de l'image" }
  }
}

export async function createCar(formData: FormData) {
  const supabase = await createClient()

  // Vérifier l'authentification admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Non authentifié" }
  }

  const { data: adminData } = await supabase.from("admins").select("id").eq("id", user.id).single()
  if (!adminData) {
    return { error: "Non autorisé" }
  }

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
    available: formData.get("available") === "true",
  }

  const { error } = await supabase.from("cars").insert(data)

  if (error) {
    console.error("Error creating car:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/cars")
  return { success: true }
}

export async function updateCar(id: string, formData: FormData) {
  console.log("=== UPDATE CAR ACTION STARTED ===")
  console.log("Car ID:", id)
  
  const supabase = await createClient()

  // Vérifier l'authentification admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  console.log("User:", user?.email)
  
  if (!user) {
    console.error("No user authenticated")
    return { error: "Non authentifié" }
  }

  const { data: adminData } = await supabase.from("admins").select("id").eq("id", user.id).single()
  
  console.log("Admin check:", adminData)
  
  if (!adminData) {
    console.error("User is not an admin")
    return { error: "Non autorisé" }
  }

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
    available: formData.get("available") === "true",
  }

  console.log("Updating car with data:", JSON.stringify(data, null, 2))

  const { data: updateResult, error } = await supabase.from("cars").update(data).eq("id", id).select()

  if (error) {
    console.error("Error updating car:", error)
    return { error: error.message }
  }

  console.log("Car updated successfully:", updateResult)
  console.log("=== UPDATE CAR ACTION COMPLETED ===")
  
  revalidatePath("/admin/cars")
  revalidatePath(`/admin/cars/${id}`)
  return { success: true, data: updateResult }
}

export async function deleteCar(id: string) {
  const supabase = await createClient()

  // Vérifier l'authentification admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Non authentifié" }
  }

  const { data: adminData } = await supabase.from("admins").select("id").eq("id", user.id).single()
  if (!adminData) {
    return { error: "Non autorisé" }
  }

  // Récupérer l'image URL avant de supprimer
  const { data: car } = await supabase.from("cars").select("image_url").eq("id", id).single()

  // Supprimer la voiture
  const { error } = await supabase.from("cars").delete().eq("id", id)

  if (error) {
    console.error("Error deleting car:", error)
    return { error: error.message }
  }

  // Supprimer l'image du storage si elle existe
  if (car?.image_url && car.image_url.includes("car-images")) {
    const filePath = car.image_url.split("/car-images/").pop()
    if (filePath) {
      await supabase.storage.from("car-images").remove([`cars/${filePath}`])
    }
  }

  revalidatePath("/admin/cars")
  return { success: true }
}
