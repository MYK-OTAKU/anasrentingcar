"use client"

import { useState } from "react"
import { submitReview } from "@/app/actions/reviews"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Loader2, CheckCircle2 } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function ReviewForm() {
  const { t } = useI18n()
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.set("rating", rating.toString())

    const result = await submitReview(formData)

    if (result.error) {
      setError(result.error)
      setIsSubmitting(false)
    } else {
      setSuccess(true)
      setIsSubmitting(false)
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false)
        setRating(5)
        ;(e.target as HTMLFormElement).reset()
      }, 3000)
    }
  }

  if (success) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">{t.reviewForm.successTitle}</h3>
          <p className="text-green-700">{t.reviewForm.successMessage}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.reviewForm.title}</CardTitle>
        <CardDescription>{t.reviewForm.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="customer_name">{t.reviewForm.yourName} {t.reviewForm.required}</Label>
            <Input id="customer_name" name="customer_name" placeholder={t.reviewForm.namePlaceholder} required />
          </div>

          <div className="space-y-2">
            <Label>{t.reviewForm.yourRating} {t.reviewForm.required}</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                  aria-label={`${star} ${star > 1 ? t.reviewForm.starsPlural : t.reviewForm.stars}`}
                  title={`${star} ${star > 1 ? t.reviewForm.starsPlural : t.reviewForm.stars}`}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">{t.reviewForm.yourComment} {t.reviewForm.required}</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder={t.reviewForm.commentPlaceholder}
              rows={5}
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.reviewForm.submitting}
              </>
            ) : (
              t.reviewForm.submit
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
