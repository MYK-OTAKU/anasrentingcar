"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { isAdminEmail, getAdminEmails } from "@/lib/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Note: On ne vérifie plus si déjà connecté au chargement
  // Si l'utilisateur est admin, il sera redirigé après login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        console.error('Auth error:', authError)
        throw new Error(authError.message === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect'
          : authError.message)
      }

      console.log('User authenticated:', data.user?.email)

      // Vérification 1 : Email dans la liste autorisée (ADMIN_EMAILS)
      const userEmail = data.user?.email || ""
      const isAuthorized = isAdminEmail(userEmail)
      console.log('Checking authorization for:', userEmail)
      console.log('Is authorized:', isAuthorized)
      console.log('Admin emails list:', getAdminEmails())

      if (!isAuthorized) {
        console.error('Email not in ADMIN_EMAILS list')
        await supabase.auth.signOut()
        throw new Error("Accès non autorisé. Votre email n'est pas dans la liste des administrateurs.")
      }

      console.log('Email authorized in ADMIN_EMAILS')

      // Vérification 2 : Utilisateur dans la table admins
      console.log('Checking admin table for user ID:', data.user?.id)

      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('id, email')
        .eq('id', data.user?.id)
        .single()

      console.log('Admin check result:', { adminData, adminError })
      console.log('Admin error details:', adminError)

      // Vérifier si c'est une vraie erreur (pas juste un objet vide)
      const hasRealError = adminError && (adminError.message || adminError.code || adminError.details)

      if (hasRealError) {
        console.error('Database error when checking admin:', adminError)
        await supabase.auth.signOut()
        throw new Error(`Erreur de base de données: ${adminError.message || 'Vérifiez les RLS policies'}`)
      }

      if (!adminData) {
        console.error('Admin record not found in admins table')
        console.log('User ID being searched:', data.user?.id)
        await supabase.auth.signOut()
        throw new Error("Accès non autorisé. Vous devez être enregistré comme administrateur dans la table admins.")
      }

      console.log('Admin verified:', adminData.email)
      // Utiliser window.location pour forcer un rechargement complet
      // et permettre au serveur de récupérer la nouvelle session
      window.location.href = "/admin"
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo.png" alt="Rent Car Anas" width={48} height={48} className="h-12 w-auto" />
            <span className="text-xl font-bold text-foreground">
              Rent Car Anas
            </span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Administration</CardTitle>
            <CardDescription>Connectez-vous pour accéder au tableau de bord</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@rentcaranas.ma"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Retour au site
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
