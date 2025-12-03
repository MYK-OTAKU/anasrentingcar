import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReviewsTable } from "@/components/admin/reviews-table"

async function getReviews() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false })
  return data || []
}

export default async function AdminReviewsPage() {
  const reviews = await getReviews()
  const pendingCount = reviews.filter((r) => !r.approved).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Avis clients</h2>
        <p className="text-muted-foreground">Gérez les avis de vos clients ({pendingCount} en attente)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des avis ({reviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewsTable reviews={reviews} />
        </CardContent>
      </Card>
    </div>
  )
}
