"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Review } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
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
import { Check, X, Trash2, Star } from "lucide-react"

interface ReviewsTableProps {
  reviews: Review[]
}

export function ReviewsTable({ reviews }: ReviewsTableProps) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleApprove = async (id: string, approved: boolean) => {
    setLoadingId(id)
    const supabase = createClient()

    const { error } = await supabase.from("reviews").update({ approved }).eq("id", id)

    if (!error) {
      router.refresh()
    }
    setLoadingId(null)
  }

  const handleDelete = async (id: string) => {
    setLoadingId(id)
    const supabase = createClient()

    const { error } = await supabase.from("reviews").delete().eq("id", id)

    if (!error) {
      router.refresh()
    }
    setLoadingId(null)
  }

  if (reviews.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Aucun avis pour le moment</p>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="max-w-md">Commentaire</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">{review.customer_name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="max-w-md">
                <p className="line-clamp-2">{review.comment}</p>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {new Date(review.created_at).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>
                <Badge variant={review.approved ? "default" : "secondary"}>
                  {review.approved ? "Publié" : "En attente"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {!review.approved ? (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleApprove(review.id, true)}
                      disabled={loadingId === review.id}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="sr-only">Approuver</span>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleApprove(review.id, false)}
                      disabled={loadingId === review.id}
                    >
                      <X className="h-4 w-4 text-yellow-600" />
                      <span className="sr-only">Masquer</span>
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer cet avis ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irréversible. L&apos;avis de {review.customer_name} sera définitivement
                          supprimé.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(review.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Supprimer
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
