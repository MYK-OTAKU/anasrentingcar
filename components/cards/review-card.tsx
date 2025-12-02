import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Review } from "@/lib/types"

interface ReviewCardProps {
  review: Review
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
            />
          ))}
        </div>
        <p className="mb-4 text-muted-foreground">{review.comment}</p>
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">{review.customer_name}</span>
          <span className="text-sm text-muted-foreground">{formatDate(review.created_at)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
