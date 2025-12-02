import type { Metadata } from "next"
import Image from "next/image"
import { Shield, Users, Clock, Award, MapPin, Car } from "lucide-react"

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez YR Location, votre agence de location de voitures de confiance à Paris. Notre histoire, nos valeurs et notre engagement.",
}

const values = [
  {
    icon: Shield,
    title: "Sécurité",
    description: "Tous nos véhicules sont régulièrement contrôlés et entretenus pour garantir votre sécurité.",
  },
  {
    icon: Users,
    title: "Service client",
    description: "Une équipe dédiée et à l'écoute pour vous accompagner avant, pendant et après votre location.",
  },
  {
    icon: Clock,
    title: "Flexibilité",
    description: "Des formules adaptées à vos besoins : courte durée, longue durée, kilométrage illimité.",
  },
  {
    icon: Award,
    title: "Qualité",
    description: "Une flotte récente et variée pour répondre à toutes vos exigences de confort et de performance.",
  },
]

const stats = [
  { value: "10+", label: "Années d'expérience" },
  { value: "50+", label: "Véhicules disponibles" },
  { value: "5000+", label: "Clients satisfaits" },
  { value: "24/7", label: "Assistance disponible" },
]

const team = [
  { name: "Yassine R.", role: "Fondateur & Directeur", image: "/professional-man-portrait-business.png" },
  { name: "Sophie M.", role: "Responsable Clientèle", image: "/professional-woman-customer-service.png" },
  { name: "Marc D.", role: "Chef de Parc", image: "/professional-man-portrait-mechanic.jpg" },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
                À propos de <span className="text-primary">YR Location</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Fondée en 2014, YR Location est née de la passion d'un entrepreneur pour l'automobile et le service
                client. Notre mission : rendre la location de voiture accessible, simple et agréable pour tous.
              </p>
              <p className="mt-4 text-muted-foreground">
                Implantée au coeur de Paris, notre agence a su se développer en gardant ses valeurs fondamentales :
                qualité de service, transparence des prix et respect du client. Aujourd'hui, nous sommes fiers de
                compter plus de 5000 clients satisfaits.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/car-rental-agency-showroom-professional.jpg" alt="Agence YR Location" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Nos valeurs</h2>
            <p className="mt-2 text-muted-foreground">Les principes qui guident notre engagement envers vous</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Pourquoi nous choisir ?</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
              <Car className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Flotte récente</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tous nos véhicules ont moins de 3 ans et sont régulièrement renouvelés.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
              <MapPin className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Emplacement idéal</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Situés en plein coeur de Paris, facilement accessible en transport.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
              <Shield className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Assurance complète</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Plusieurs formules d'assurance pour rouler en toute sérénité.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
              <Clock className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Assistance 24h/24</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Une ligne dédiée disponible jour et nuit en cas de besoin.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
              <Users className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Conseils personnalisés</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Notre équipe vous guide pour choisir le véhicule adapté.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg bg-card p-6 shadow-sm">
              <Award className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Prix transparents</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pas de frais cachés, le prix affiché est le prix final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">Notre équipe</h2>
            <p className="mt-2 text-muted-foreground">Des professionnels passionnés à votre service</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
