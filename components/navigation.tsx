"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/language-toggle"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

// Navigation renders the sticky top bar with desktop + mobile menus and language controls.
export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navAnimated, setNavAnimated] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => setNavAnimated(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-[background-color,transform,opacity,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "bg-background/95 border-b border-border shadow-lg shadow-primary/5"
          : "bg-background/80",
        navAnimated ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8",
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold font-mono hover:text-primary transition-colors"
            aria-label="Iskren Minkov home"
            title="Iskren Minkov"
          >
            IM
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
              {t.nav.about}
            </Link>
            <Link href="/#services" className="text-sm font-medium hover:text-primary transition-colors">
              {t.nav.services}
            </Link>
            <Link href="/#projects" className="text-sm font-medium hover:text-primary transition-colors">
              {t.nav.projects}
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              {t.nav.testimonials}
            </Link>
            <LanguageToggle />
            <Button asChild size="sm" variant="highlight">
              <Link href="/#contact">{t.nav.contact}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link
              href="/#about"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/#services"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.services}
            </Link>
            <Link
              href="/#projects"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.projects}
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.testimonials}
            </Link>
            <LanguageToggle variant="mobile" className="w-full" />
            <Button asChild className="w-full" size="sm" variant="highlight">
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                {t.nav.contact}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
