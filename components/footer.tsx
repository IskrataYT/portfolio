"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Footer consolidates navigation links, service shortcuts, and social profiles.
export function Footer() {
  const { t } = useLanguage()
  const serviceLinks = [
    { href: "/services/web-design-suite", label: t.footer.serviceLinks.suite },
    { href: "/services/website-audit", label: t.footer.serviceLinks.audit },
    { href: "/services/website-redesign-seo", label: t.footer.serviceLinks.redesign },
    { href: "/services/email-design", label: t.footer.serviceLinks.email },
    { href: "/services/ad-design", label: t.footer.serviceLinks.ads },
    { href: "/services/full-brand-package", label: t.footer.serviceLinks.brand },
  ]

  return (
    <footer className="border-t border-border bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold font-mono mb-4 block">
              IM
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{t.footer.services}</h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">{t.footer.connect}</h3>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:iskren@example.com"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Iskren Minkov. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
