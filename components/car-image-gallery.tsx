"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CarImageGalleryProps {
    images: string[]
    title: string
}

export function CarImageGallery({ images, title }: CarImageGalleryProps) {
    const [mainImage, setMainImage] = useState(images[0] || "/placeholder.svg")
    const [selectedIndex, setSelectedIndex] = useState(0)

    // Si pas d'images ou tableau vide
    if (!images || images.length === 0) {
        return (
            <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden rounded-lg border border-border/50 shadow-md bg-black/5">
                <Image
                    src="/placeholder.svg"
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden rounded-lg border border-border/50 shadow-md bg-black/5">
                <Image
                    src={mainImage}
                    alt={title}
                    fill
                    className="object-contain transition-all duration-300"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setMainImage(image)
                                setSelectedIndex(index)
                            }}
                            className={cn(
                                "relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                                selectedIndex === index
                                    ? "border-primary ring-2 ring-primary/20"
                                    : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={image}
                                alt={`${title} - Vue ${index + 1}`}
                                fill
                                className="object-cover "
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
