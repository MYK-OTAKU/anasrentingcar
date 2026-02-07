"use client"

import Image from "next/image"
import { Users, Fuel, Settings, Check, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useI18n } from "@/lib/i18n/context"
import type { Car } from "@/lib/types"

interface CarDetailsModalProps {
    car: Car | null
    isOpen: boolean
    onClose: () => void
}

export function CarDetailsModal({ car, isOpen, onClose }: CarDetailsModalProps) {
    const { t, language } = useI18n()

    if (!car) return null

    const categoryLabels: Record<string, string> = {
        citadine: t.car.citadine,
        suv: t.car.suv,
        berline: t.car.berline,
        utilitaire: t.car.utilitaire,
    }

    const transmissionLabels: Record<string, string> = {
        manual: t.car.manual,
        automatic: t.car.automatic,
    }

    const fuelLabels: Record<string, string> = {
        essence: t.car.essence,
        diesel: t.car.diesel,
        electric: t.car.electric,
        hybrid: t.car.hybrid,
    }

    const whatsappNumber = "212638083689" // Updated phone number
    const whatsappMessage = encodeURIComponent(
        language === "fr"
            ? `Bonjour, je suis intéressé(e) par la location de: ${car.brand} ${car.model} (${categoryLabels[car.category]}) - ${car.price_per_day} DH/jour. Merci de me contacter.`
            : `Hello, I'm interested in renting: ${car.brand} ${car.model} (${categoryLabels[car.category]}) - ${car.price_per_day} DH/day. Please contact me.`,
    )
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center justify-between">
                        <span>{car.brand} {car.model}</span>
                        <span className="text-primary text-xl">{car.price_per_day} DH<span className="text-sm font-normal text-muted-foreground">/{t.car.perDay}</span></span>
                    </DialogTitle>
                    <DialogDescription>
                        {categoryLabels[car.category]} • {car.available ? <span className="text-green-500 font-medium flex items-center gap-1 inline-flex"><Check className="h-3 w-3" /> {t.common.available}</span> : <span className="text-destructive font-medium flex items-center gap-1 inline-flex"><X className="h-3 w-3" /> {t.common.unavailable}</span>}
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-6">
                    {/* Image */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <Image
                            src={car.image_url || "/placeholder.svg"}
                            alt={`${car.brand} ${car.model}`}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Key Features */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-3">
                            <Users className="mb-2 h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">{car.seats} {t.car.seats}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-3">
                            <Settings className="mb-2 h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">{transmissionLabels[car.transmission]}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-3">
                            <Fuel className="mb-2 h-5 w-5 text-primary" />
                            <span className="text-sm font-medium">{fuelLabels[car.fuel_type]}</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                        <h4 className="mb-2 font-semibold">{t.car.description}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {car.description}
                        </p>
                    </div>

                    <Separator />

                    {/* Features / Included */}
                    <div>
                        <h4 className="mb-2 font-semibold">Inclus dans la location</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Kilométrage : 200km/jour</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Assurance Responsabilité Civile</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Assistance 24/7</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Annulation gratuite (48h)</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter className="mt-6 sm:justify-between gap-4">
                    <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                        Fermer
                    </Button>
                    <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 red-glow">
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            {t.car.reserve}
                        </a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
