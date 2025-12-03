"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Car } from "@/lib/types"
import { deleteCar } from "@/app/actions/cars"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2, Loader2 } from "lucide-react"

const categoryLabels: Record<string, string> = {
  citadine: "Citadine",
  suv: "SUV",
  berline: "Berline",
  utilitaire: "Utilitaire",
}

interface CarsTableProps {
  cars: Car[]
}

export function CarsTable({ cars }: CarsTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    
    const result = await deleteCar(id)

    if (!result.error) {
      router.refresh()
    } else {
      alert(result.error)
    }
    setDeletingId(null)
  }

  if (cars.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Aucun véhicule enregistré</p>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Véhicule</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix/jour</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>
                <div className="relative h-12 w-16 overflow-hidden rounded">
                  <Image
                    src={car.image_url || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">
                    {car.brand} {car.model}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {car.seats} places • {car.transmission === "manual" ? "Manuelle" : "Auto"}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{categoryLabels[car.category]}</Badge>
              </TableCell>
              <TableCell className="font-medium">{car.price_per_day} DH</TableCell>
              <TableCell>
                <Badge variant={car.available ? "default" : "outline"}>
                  {car.available ? "Disponible" : "Indisponible"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/admin/cars/${car.id}`}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Modifier</span>
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer ce véhicule ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible. Le véhicule {car.brand} {car.model} sera définitivement
                          supprimé.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(car.id)}
                          disabled={deletingId === car.id}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {deletingId === car.id ? "Suppression..." : "Supprimer"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
