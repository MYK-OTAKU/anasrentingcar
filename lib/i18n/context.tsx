"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language, type Translations } from "./translations"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "fr" || saved === "en" || saved === "ar")) {
      setLanguageState(saved)
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr"
    } else {
      // Set default direction
      document.documentElement.dir = "ltr"
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
    // Set text direction for Arabic
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  const t = translations[language]

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
