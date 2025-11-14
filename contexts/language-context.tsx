"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language } from "@/lib/translations"

// LanguageContext stores the selected locale and exposes translated copy helpers.
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.en
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

type LanguageProviderProps = {
  children: ReactNode
  initialLanguage?: Language
}

export function LanguageProvider({ children, initialLanguage = "en" }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("language") as Language)) || null
    if (saved && (saved === "en" || saved === "bg") && saved !== language) {
      setLanguage(saved)
    }
  }, [language])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
      document.cookie = `language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`
    }
  }

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
