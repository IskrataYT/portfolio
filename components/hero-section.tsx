"use client"

import Script from "next/script"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Reveal } from "@/components/reveal"

const HeroBackgroundCanvas = dynamic(
  () => import("./hero-background-canvas").then((mod) => ({ default: mod.HeroBackgroundCanvas })),
  { ssr: false, loading: () => null },
)

// HeroSection presents the landing hero with the animated background and CTA buttons.
const FEATURE_PILLS = [
  { icon: Code, label: "Clean Code" },
  { icon: Sparkles, label: "Creative Design" },
  { icon: Zap, label: "Fast Performance" },
]

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iskrenminkov.com"

const HERO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Iskren Minkov",
  jobTitle: "Web Developer & Digital Strategist",
  url: SITE_URL,
  image: `${SITE_URL}/icon-light-32x32.png`,
  sameAs: [
    "https://www.linkedin.com/in/iskrenminkov",
    "https://github.com/iskrenminkov",
    "https://dribbble.com/iskrenminkov",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Iskren Minkov Studio",
  },
  knowsAbout: [
    "Web design",
    "Next.js development",
    "Technical SEO",
    "Performance optimization",
    "Conversion rate optimization",
  ],
  areaServed: {
    "@type": "GeoCircle",
    name: "Remote worldwide",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "business",
    email: "hello@iskrenminkov.com",
    availableLanguage: ["English", "Bulgarian"],
  },
}

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <Reveal
      as="section"
      className="min-h-screen min-h-[100svh] md:min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      <HeroBackgroundCanvas />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%)",
        }}
      />

      <div className="absolute top-16 left-8 w-80 h-80 bg-primary/25 rounded-full blur-3xl animate-[hero-glow_12s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-[26rem] h-[26rem] bg-primary/15 rounded-full blur-3xl animate-[hero-glow_14s_ease-in-out_infinite_reverse] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <header
          className="max-w-4xl mx-auto text-center"
          itemScope
          itemType="https://schema.org/Person"
        >
          <meta itemProp="name" content="Iskren Minkov" />
          <meta itemProp="jobTitle" content="Web Developer & Digital Strategist" />
          <meta itemProp="url" content={SITE_URL} />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles size={16} className="animate-pulse" />
            <span>{t.hero.greeting}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance leading-tight">
            {t.hero.title.split(" ").map((word, i) => (
              <span key={i} className={i >= 2 ? "text-primary" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <p
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed"
            itemProp="description"
          >
            {t.hero.subtitle} {t.hero.seoNote}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="highlight" className="group w-full sm:w-auto">
              <Link href="/#projects" itemProp="url">
                {t.hero.cta}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-border hover:!border-primary sm:w-auto"
            >
              <Link href="/#contact">{t.hero.ctaSecondary}</Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div
            className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-12 sm:mt-16"
            aria-label="Core capabilities"
          >
            {FEATURE_PILLS.map(({ icon: Icon, label }, index) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <Icon size={18} className="text-primary shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </header>
      </div>

      <Script
        id="hero-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HERO_SCHEMA) }}
      />
    </Reveal>
  )
}
