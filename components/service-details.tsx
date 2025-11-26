"use client"

import Link from "next/link"
import { ArrowRight, Check, Clock, Mail, Megaphone, Package, Palette, Search, Target, Wrench, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import type { ServiceSlug, ServiceContent } from "@/lib/service-data"
import type { Language } from "@/lib/translations"

// ServiceDetails powers the individual service pages with localized copy and CTAs.
type ServiceDetailsProps = {
  slug: ServiceSlug
  content: Record<Language, ServiceContent>
}

const ICON_MAP: Record<ServiceSlug, LucideIcon> = {
  "web-design-suite": Palette,
  "website-audit": Search,
  "website-redesign-seo": Wrench,
  "email-design": Mail,
  "ad-design": Megaphone,
  "full-brand-package": Package,
}

const BENEFIT_ICONS = [Target, Zap, Clock]

export function ServiceDetails({ slug, content }: ServiceDetailsProps) {
  const { language, t } = useLanguage()
  const copy = content[language] ?? content.en
  const Icon = ICON_MAP[slug]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary shrink-0">
              <Icon size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">{copy.title}</h1>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl text-pretty leading-relaxed">{copy.subtitle}</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t.servicePage.whatIOffer}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{copy.description}</p>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.servicePage.pricingLabel}</p>
                    <p className="text-3xl font-bold text-primary">{copy.pricing.starting}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{copy.pricing.description}</p>
                <Button asChild size="lg" variant="highlight" className="w-full">
                  <Link href="/#contact">{t.servicePage.quoteCta}</Link>
                </Button>
              </Card>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">{t.servicePage.whatsIncluded}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {copy.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.servicePage.benefitsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {copy.benefits.map((benefit, index) => {
              const BenefitIcon = BENEFIT_ICONS[index % BENEFIT_ICONS.length]
              return (
                <Card key={benefit.title} className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                    <BenefitIcon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-2">
        <div className="container mx-auto max-w-8xl">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.servicePage.processTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
            {copy.process.map((step, index) => (
              <div key={step.title} className="relative lg:pr-28">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed ml-13">{step.description}</p>
                {index < copy.process.length - 1 && (
                  <span className="hidden lg:flex absolute inset-y-0 right-0 w-24 translate-x-1/2 items-center justify-center">
                    <ArrowRight size={48} className="text-muted-foreground/60" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/40 border-t border-border/60">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{t.servicePage.tag}</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-balance">{t.servicePage.ctaTitle}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">{t.servicePage.ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="highlight" className="min-w-[200px]">
              <Link href="/#contact">{t.servicePage.ctaPrimary}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px]">
              <Link href="/#services">{t.servicePage.ctaSecondary}</Link>
            </Button>
          </div>
          <Card className="mt-10 inline-flex flex-col gap-1 px-6 py-4 border-primary/20 bg-card/70">
            <div className="text-sm text-muted-foreground">{t.servicePage.responseLabel}</div>
            <div className="text-2xl font-semibold text-primary">{t.servicePage.responseValue}</div>
            <div className="text-xs text-muted-foreground/80">{t.servicePage.responseFootnote}</div>
          </Card>
        </div>
      </section>
    </>
  )
}
