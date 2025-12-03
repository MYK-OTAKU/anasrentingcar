"use client"

import { useEffect, useState } from "react"
import { ReviewCard } from "@/components/cards/review-card"
import { useI18n } from "@/lib/i18n/context"
import { createClient } from "@/lib/supabase/client"
import type { Review } from "@/lib/types"

export function ReviewsSection() {
  const { t } = useI18n()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadReviews() {
      const supabase = createClient()
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("approved", true)
        .order("display_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(4) // Maximum 4 avis sur la homepage

      setReviews(data || [])
      setLoading(false)
    }

    loadReviews()
  }, [])

  if (loading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              {t.reviews.title} <span className="text-primary">{t.reviews.titleHighlight}</span>
            </h2>
            <p className="mt-2 text-muted-foreground">{t.reviews.subtitle}</p>
          </div>
          <div className="text-center text-muted-foreground">{t.common.loading}</div>
        </div>
      </section>
    )
  }

  if (reviews.length === 0) {
    return (
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              {t.reviews.title} <span className="text-primary">{t.reviews.titleHighlight}</span>
            </h2>
            <p className="mt-2 text-muted-foreground">{t.reviews.subtitle}</p>
          </div>
          <div className="text-center text-muted-foreground">{t.reviews.noReviews}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            {t.reviews.title} <span className="text-primary">{t.reviews.titleHighlight}</span>
          </h2>
          <p className="mt-2 text-muted-foreground">{t.reviews.subtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
