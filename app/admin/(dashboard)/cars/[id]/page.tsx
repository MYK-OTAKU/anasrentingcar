import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CarForm } from "@/components/admin/car-form"

interface EditCarPageProps {
  params: Promise<{ id: string }>
}

async function getCar(id: string) {
  const supabase = await createClient()
  const { data } = await supabase.from("cars").select("*").eq("id", id).single()
  return data
}

export default async function EditCarPage({ params }: EditCarPageProps) {
  const { id } = await params
  const car = await getCar(id)

  if (!car) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Modifier le véhicule</h2>
        <p className="text-muted-foreground">
          {car.brand} {car.model}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du véhicule</CardTitle>
        </CardHeader>
        <CardContent>
          <CarForm car={car} />
        </CardContent>
      </Card>
    </div>
  )
}
