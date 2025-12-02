import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { CarsTable } from "@/components/admin/cars-table"

async function getCars() {
  const supabase = await createClient()
  const { data } = await supabase.from("cars").select("*").order("created_at", { ascending: false })
  return data || []
}

export default async function AdminCarsPage() {
  const cars = await getCars()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Véhicules</h2>
          <p className="text-muted-foreground">Gérez votre flotte de véhicules</p>
        </div>
        <Button asChild>
          <Link href="/admin/cars/new">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un véhicule
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des véhicules ({cars.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <CarsTable cars={cars} />
        </CardContent>
      </Card>
    </div>
  )
}
