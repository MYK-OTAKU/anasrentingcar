/**
 * Vérifie si un email est dans la liste des admins autorisés
 */
export function isAdminEmail(email: string): boolean {
  const adminEmails = process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || ""
  const emailList = adminEmails.split(",").map((e) => e.trim().toLowerCase())
  return emailList.includes(email.toLowerCase())
}

/**
 * Récupère la liste des emails admins autorisés
 */
export function getAdminEmails(): string[] {
  const adminEmails = process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || ""
  return adminEmails.split(",").map((e) => e.trim()).filter(Boolean)
}
