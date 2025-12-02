import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Clock, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Sécurité garantie",
    description: "Tous nos véhicules sont régulièrement contrôlés et entretenus.",
  },
  {
    icon: Clock,
    title: "Service 24h/24",
    description: "Une assistance disponible à tout moment pour votre tranquillité.",
  },
  {
    icon: Award,
    title: "Qualité premium",
    description: "Une flotte récente et variée pour répondre à tous vos besoins.",
  },
]

export function AboutPreview() {
  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              Votre partenaire de confiance depuis plus de 10 ans
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              YR Location est une agence de location de voitures implantée au coeur de Paris. Notre mission : vous
              offrir une expérience de location simple, transparente et au meilleur rapport qualité-prix.
            </p>
            <p className="mt-4 text-muted-foreground">
              Que vous soyez un particulier, un professionnel ou un touriste, nous avons le véhicule adapté à vos
              besoins. Notre équipe passionnée est à votre écoute pour vous accompagner dans votre choix.
            </p>
            <Button className="mt-6 bg-transparent" variant="outline" asChild>
              <Link href="/about">En savoir plus sur nous</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-1">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
