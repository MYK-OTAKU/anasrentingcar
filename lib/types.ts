// Car types
export interface Car {
  id: string
  brand: string
  model: string
  category: "citadine" | "suv" | "berline" | "utilitaire"
  seats: number
  transmission: "manual" | "automatic"
  fuel_type: "essence" | "diesel" | "electric" | "hybrid"
  price_per_day: number
  description: string
  image_url: string
  available: boolean
  created_at: string
  updated_at?: string
}

// Review types
export interface Review {
  id: string
  customer_name: string
  rating: number
  comment: string
  approved: boolean
  display_order?: number
  created_at: string
}

// Contact request types
export interface ContactRequest {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  car_id?: string
  status: "new" | "in_progress" | "done"
  created_at: string
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  car_id?: string
}

// Filter types
export interface CarFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  transmission?: string
  fuel_type?: string
}
