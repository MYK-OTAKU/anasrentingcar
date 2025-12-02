import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CarForm } from "@/components/admin/car-form"

export default function NewCarPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Nouveau véhicule</h2>
        <p className="text-muted-foreground">Ajoutez un nouveau véhicule à votre flotte</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du véhicule</CardTitle>
        </CardHeader>
        <CardContent>
          <CarForm />
        </CardContent>
      </Card>
    </div>
  )
}
