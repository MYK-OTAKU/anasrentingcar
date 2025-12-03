"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Review } from "@/lib/types"
import { approveReview, deleteReview, updateReviewPriority } from "@/app/actions/reviews"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Check, X, Trash2, Star, Loader2, Save } from "lucide-react"

interface ReviewsTableProps {
  reviews: Review[]
}

export function ReviewsTable({ reviews }: ReviewsTableProps) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [editingPriority, setEditingPriority] = useState<{ [key: string]: number }>({})

  const handleApprove = async (id: string) => {
    setLoadingId(id)
    
    const result = await approveReview(id)

    if (!result.error) {
      router.refresh()
    } else {
      alert(result.error)
    }
    setLoadingId(null)
  }

  const handleDelete = async (id: string) => {
    setLoadingId(id)
    
    const result = await deleteReview(id)

    if (!result.error) {
      router.refresh()
    } else {
      alert(result.error)
    }
    setLoadingId(null)
  }

  const handlePriorityChange = (id: string, value: string) => {
    const numValue = parseInt(value) || 999
    setEditingPriority({ ...editingPriority, [id]: numValue })
  }

  const handleSavePriority = async (id: string) => {
    const priority = editingPriority[id]
    if (priority === undefined) return

    setLoadingId(id)
    const result = await updateReviewPriority(id, priority)

    if (!result.error) {
      const newEditing = { ...editingPriority }
      delete newEditing[id]
      setEditingPriority(newEditing)
      router.refresh()
    } else {
      alert(result.error)
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
            <TableHead>Priorité</TableHead>
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
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="999"
                    value={editingPriority[review.id] ?? review.display_order ?? 999}
                    onChange={(e) => handlePriorityChange(review.id, e.target.value)}
                    className="w-20"
                    disabled={loadingId === review.id}
                  />
                  {editingPriority[review.id] !== undefined && editingPriority[review.id] !== (review.display_order ?? 999) && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSavePriority(review.id)}
                      disabled={loadingId === review.id}
                      title="Enregistrer la priorité"
                    >
                      {loadingId === review.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 text-green-600" />
                      )}
                    </Button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={review.approved ? "default" : "secondary"}>
                  {review.approved ? "Publié" : "En attente"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {!review.approved && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleApprove(review.id)}
                      disabled={loadingId === review.id}
                      title="Approuver et publier"
                    >
                      {loadingId === review.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                      <span className="sr-only">Approuver</span>
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon" disabled={loadingId === review.id} title="Supprimer">
                        {loadingId === review.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-destructive" />
                        )}
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
