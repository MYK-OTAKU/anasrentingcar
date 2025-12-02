import { ContactForm } from "@/components/forms/contact-form"

export function CtaContact() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
                Prêt à réserver votre véhicule ?
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Contactez-nous dès maintenant pour obtenir un devis personnalisé ou réserver votre voiture. Notre équipe
                vous répond sous 24h.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>Réponse garantie sous 24h</li>
                <li>Devis personnalisé gratuit</li>
                <li>Conseils sur le véhicule adapté à vos besoins</li>
              </ul>
            </div>
            <div className="bg-card p-8 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
