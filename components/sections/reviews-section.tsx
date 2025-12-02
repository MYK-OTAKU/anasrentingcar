import { ReviewCard } from "@/components/cards/review-card"
import { mockReviews } from "@/lib/mock-data"

export function ReviewsSection() {
  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Ce que disent nos clients</h2>
          <p className="mt-2 text-muted-foreground">Découvrez les témoignages de nos clients satisfaits</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
