"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Loader2 } from "lucide-react"

interface ContactRequestWithCar {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  car_id?: string
  status: "new" | "in_progress" | "done"
  created_at: string
  cars?: { brand: string; model: string } | null
}

interface RequestsTableProps {
  requests: ContactRequestWithCar[]
}

const subjectLabels: Record<string, string> = {
  reservation: "Réservation",
  devis: "Devis",
  info: "Information",
  autre: "Autre",
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  new: { label: "Nouvelle", variant: "default" },
  in_progress: { label: "En cours", variant: "secondary" },
  done: { label: "Traitée", variant: "outline" },
}

export function RequestsTable({ requests }: RequestsTableProps) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleStatusChange = async (id: string, status: string) => {
    setLoadingId(id)
    const supabase = createClient()

    const { error } = await supabase.from("contact_requests").update({ status }).eq("id", id)

    if (!error) {
      router.refresh()
    }
    setLoadingId(null)
  }

  if (requests.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Aucune demande pour le moment</p>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contact</TableHead>
            <TableHead>Sujet</TableHead>
            <TableHead>Véhicule</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{request.name}</p>
                  <p className="text-sm text-muted-foreground">{request.email}</p>
                  {request.phone && <p className="text-sm text-muted-foreground">{request.phone}</p>}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{subjectLabels[request.subject] || request.subject}</Badge>
              </TableCell>
              <TableCell>
                {request.cars ? (
                  <span>
                    {request.cars.brand} {request.cars.model}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {new Date(request.created_at).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>
                <Select
                  value={request.status}
                  onValueChange={(value) => handleStatusChange(request.id, value)}
                  disabled={loadingId === request.id}
                >
                  <SelectTrigger className="w-32">
                    {loadingId === request.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <SelectValue />}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">
                      <Badge variant={statusLabels.new.variant}>{statusLabels.new.label}</Badge>
                    </SelectItem>
                    <SelectItem value="in_progress">
                      <Badge variant={statusLabels.in_progress.variant}>{statusLabels.in_progress.label}</Badge>
                    </SelectItem>
                    <SelectItem value="done">
                      <Badge variant={statusLabels.done.variant}>{statusLabels.done.label}</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Voir</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Demande de {request.name}</DialogTitle>
                      <DialogDescription>
                        {subjectLabels[request.subject] || request.subject} -{" "}
                        {new Date(request.created_at).toLocaleDateString("fr-FR")}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>{request.email}</p>
                      </div>
                      {request.phone && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                          <p>{request.phone}</p>
                        </div>
                      )}
                      {request.cars && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Véhicule</p>
                          <p>
                            {request.cars.brand} {request.cars.model}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Message</p>
                        <p className="whitespace-pre-wrap">{request.message}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
