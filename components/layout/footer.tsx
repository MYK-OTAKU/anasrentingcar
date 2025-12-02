"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useI18n()

  const whatsappLink = "https://wa.me/212600000000"

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="YR Location" width={40} height={40} className="h-10 w-auto" />
              <span className="text-lg font-bold text-foreground">YR Location</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t.footer.navigation}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Nos services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Location courte durée</li>
              <li className="text-sm text-muted-foreground">Location longue durée</li>
              <li className="text-sm text-muted-foreground">Location utilitaire</li>
              <li className="text-sm text-muted-foreground">Livraison aéroport</li>
            </ul>
          </div>

          {/* Contact - Updated with Moroccan info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Bd Yacoub El Mansour
                  <br />
                  Casablanca, Maroc
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+212600000000" className="text-sm text-muted-foreground hover:text-primary">
                  +212 6 00 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="mailto:contact@yr-location.ma" className="text-sm text-muted-foreground hover:text-primary">
                  contact@yr-location.ma
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Lun - Sam: 8h - 19h
                  <br />
                  Dim: 9h - 17h
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} YR Location. {t.footer.rights}
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Mentions légales
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
