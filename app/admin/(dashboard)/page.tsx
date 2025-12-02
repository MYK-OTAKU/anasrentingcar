import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Star, MessageSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

async function getStats() {
  const supabase = await createClient()

  // Get counts - using service role for admin access
  const [carsResult, reviewsResult, requestsResult, newRequestsResult] = await Promise.all([
    supabase.from("cars").select("id", { count: "exact", head: true }),
    supabase.from("reviews").select("id", { count: "exact", head: true }).eq("approved", true),
    supabase.from("contact_requests").select("id", { count: "exact", head: true }),
    supabase.from("contact_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
  ])

  return {
    totalCars: carsResult.count || 0,
    totalReviews: reviewsResult.count || 0,
    totalRequests: requestsResult.count || 0,
    newRequests: newRequestsResult.count || 0,
  }
}

async function getRecentRequests() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return data || []
}

export default async function AdminDashboardPage() {
  const stats = await getStats()
  const recentRequests = await getRecentRequests()

  const statCards = [
    {
      title: "Véhicules",
      value: stats.totalCars,
      icon: Car,
      href: "/admin/cars",
      color: "text-blue-500",
    },
    {
      title: "Avis publiés",
      value: stats.totalReviews,
      icon: Star,
      href: "/admin/reviews",
      color: "text-yellow-500",
    },
    {
      title: "Demandes totales",
      value: stats.totalRequests,
      icon: MessageSquare,
      href: "/admin/requests",
      color: "text-green-500",
    },
    {
      title: "Nouvelles demandes",
      value: stats.newRequests,
      icon: TrendingUp,
      href: "/admin/requests?status=new",
      color: "text-primary",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Tableau de bord</h2>
        <p className="text-muted-foreground">Vue d&apos;ensemble de votre activité</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Demandes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          {recentRequests.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Aucune demande pour le moment</p>
          ) : (
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{request.name}</p>
                    <p className="text-sm text-muted-foreground">{request.email}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        request.status === "new"
                          ? "bg-primary/10 text-primary"
                          : request.status === "in_progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.status === "new"
                        ? "Nouvelle"
                        : request.status === "in_progress"
                          ? "En cours"
                          : "Traitée"}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(request.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              ))}
              <Link href="/admin/requests" className="block text-center text-sm text-primary hover:underline">
                Voir toutes les demandes
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
