"use client"

import Script from "next/script"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Search, Wrench, Mail, Megaphone, Package, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { SectionHeader } from "@/components/section-header"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

// ServicesSection highlights each engagement offering with reveal + hover effects.
const SERVICE_CONFIG = [
  { icon: Palette, slug: "web-design-suite", tags: ["Strategy", "UX", "SEO"] },
  { icon: Search, slug: "website-audit", tags: ["Performance", "UX", "SEO"] },
  { icon: Wrench, slug: "website-redesign-seo", tags: ["Redesign", "Content", "SEO"] },
  { icon: Mail, slug: "email-design", tags: ["Email", "Responsive"] },
  { icon: Megaphone, slug: "ad-design", tags: ["Paid Media", "Creatives"] },
  { icon: Package, slug: "full-brand-package", tags: ["Brand", "Multichannel", "Launch"] },
]

const ACCENT_BACKDROPS = [
  "from-primary/25 via-primary/5 to-transparent",
  "from-emerald-400/25 via-emerald-400/5 to-transparent",
  "from-amber-400/30 via-amber-400/5 to-transparent",
  "from-pink-400/25 via-pink-400/5 to-transparent",
  "from-sky-400/25 via-sky-400/5 to-transparent",
  "from-fuchsia-400/25 via-fuchsia-400/5 to-transparent",
]

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iskrenminkov.com"

export function ServicesSection() {
  const { t } = useLanguage()

  const services = SERVICE_CONFIG.map(({ icon, slug, tags }) => {
    const key = slug as keyof typeof t.services.items
    return {
      icon,
      slug,
      title: t.services.items[key].title,
      description: t.services.items[key].description,
      tags,
    }
  })

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
      serviceType: service.tags.join(", "),
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  }

  return (
    <Reveal
      id="services"
      as="section"
      className="py-20 px-4 relative overflow-hidden bg-background"
    >

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />
          <p className="text-sm sm:text-base text-muted-foreground/90 max-w-3xl mx-auto mb-10 text-center">
            {t.services.description}
          </p>

          {/* Services Grid */}
          <div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(260px,auto)] mb-12"
            role="list"
            aria-label="List of web design and marketing services"
          >
            {services.map((service, index) => {
              const Icon = service.icon
              const accentClass = ACCENT_BACKDROPS[index % ACCENT_BACKDROPS.length]
              const headingId = `${service.slug}-title`

              return (
                <Reveal
                  key={service.slug}
                  className="h-full"
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <div className="h-full transition-transform duration-500 ease-out will-change-transform hover:-translate-y-4 hover:scale-[1.03]">
                    <article aria-labelledby={headingId} itemScope itemType="https://schema.org/Service" className="h-full">
                      <Card
                        className={cn(
                          "group relative isolate flex h-full flex-col border border-white/10 bg-card/70 p-6 lg:p-7 backdrop-blur-xl hover:shadow-2xl hover:shadow-primary/20",
                          "overflow-hidden",
                        )}
                      >
                      <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                      <div
                        className={cn(
                          "absolute inset-0 -z-10 opacity-80 bg-gradient-to-br",
                          accentClass,
                          "transition-opacity duration-500 group-hover:opacity-100",
                        )}
                      />
                      <div className="absolute inset-[1px] -z-10 rounded-[--radius] border border-white/5" />
                      <div className="absolute inset-y-0 right-0 w-24 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center shadow-inner shadow-white/20 group-hover:scale-105 transition-transform">
                            <Icon size={26} />
                          </div>
                          <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <span className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2" role="list" aria-label="Service focus areas">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] uppercase tracking-[0.25em] text-white/70 rounded-full border border-white/15 px-3 py-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <meta itemProp="serviceType" content={service.tags.join(", ")} />
                        <h3
                          id={headingId}
                          itemProp="name"
                          className={cn(
                            "text-2xl font-semibold leading-tight",
                            "group-hover:text-white transition-colors duration-300",
                          )}
                        >
                          {service.title}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed max-w-xl" itemProp="description">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                        <Link
                          href={`/services/${service.slug}`}
                          className="group/button inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-all duration-300 px-4 py-2 rounded-full border border-white/20 hover:bg-primary/80 hover:text-white"
                          aria-label={`Learn more about ${service.title}`}
                          itemProp="url"
                        >
                          {t.services.learnMore}
                          <ArrowRight size={18} className="transition-transform group-hover/button:translate-x-1" />
                        </Link>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      </div>
                      </Card>
                    </article>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* CTA */}
          <Reveal
            className="text-center"
            style={{ transitionDelay: `${services.length * 90}ms` }}
          >
            <p className="text-muted-foreground mb-4">{t.services.notSure}</p>
            <Button asChild size="lg" variant="highlight">
              <Link href="/#contact">{t.services.discuss}</Link>
            </Button>
          </Reveal>
        </div>
      </div>

      <Script
        id="services-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </Reveal>
  )
}
