import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestsTable } from "@/components/admin/requests-table"

async function getRequests() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("contact_requests")
    .select("*, cars(brand, model)")
    .order("created_at", { ascending: false })
  return data || []
}

export default async function AdminRequestsPage() {
  const requests = await getRequests()
  const newCount = requests.filter((r) => r.status === "new").length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Demandes de contact</h2>
        <p className="text-muted-foreground">Gérez les demandes de vos clients ({newCount} nouvelles)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des demandes ({requests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <RequestsTable requests={requests} />
        </CardContent>
      </Card>
    </div>
  )
}
