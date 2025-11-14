"use client"

import Image from "next/image"

import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { Award, Clock, Heart, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

// AboutSection introduces the author and highlights proof points with stat cards.
const STAT_ACCENTS = {
  emerald: {
    ring: "ring-emerald-400/35 border-emerald-500/40",
    icon: "bg-emerald-500/10 text-white border border-emerald-400/40",
    value: "text-emerald-50",
    glow: "from-emerald-500/25 via-transparent to-transparent",
  },
  violet: {
    ring: "ring-indigo-400/30 border-indigo-400/40",
    icon: "bg-indigo-500/15 text-white border border-indigo-400/40",
    value: "text-indigo-100",
    glow: "from-indigo-500/25 via-transparent to-transparent",
  },
  amber: {
    ring: "ring-amber-400/35 border-amber-300/40",
    icon: "bg-amber-400/25 text-white border border-amber-300/40",
    value: "text-amber-50",
    glow: "from-amber-400/30 via-transparent to-transparent",
  },
  rose: {
    ring: "ring-rose-400/35 border-rose-400/40",
    icon: "bg-rose-500/15 text-white border border-rose-400/40",
    value: "text-rose-50",
    glow: "from-rose-500/25 via-transparent to-transparent",
  },
} as const

const ABOUT_STATS = [
  { icon: Users, labelKey: "clients", value: "50+", accent: "emerald", descriptionKey: "clients" },
  { icon: Award, labelKey: "projects", value: "120+", accent: "violet", descriptionKey: "projects" },
  { icon: Clock, labelKey: "experience", value: "8+", accent: "amber", descriptionKey: "experience" },
  { icon: Heart, labelKey: "satisfaction", value: "100%", accent: "rose", descriptionKey: "satisfaction" },
] as const

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <Reveal
      id="about"
      as="section"
      className="py-16 sm:py-20 px-4 bg-muted/30 relative overflow-hidden"
    >

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={t.about.title} subtitle={t.about.subtitle} />

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            {/* Image/Visual */}
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 transition-transform duration-500 border border-primary/20 hover:scale-[1.02]"
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Iskren Minkov"
                fill
                sizes="(min-width: 1024px) 480px, (min-width: 768px) 420px, 100vw"
                className="object-cover"
                priority
                itemProp="contentUrl"
              />
              <meta itemProp="caption" content="Iskren Minkov designing immersive web experiences" />
            </div>

            {/* Content */}
            <article
              itemScope
              itemType="https://schema.org/Person"
            >
              <meta itemProp="name" content="Iskren Minkov" />
              <meta itemProp="jobTitle" content="Senior Web Developer & SEO Strategist" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-primary">{t.about.tagline}</h3>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p itemProp="description">{t.about.description}</p>
                <p>{t.about.focus}</p>
                <p>{t.about.approach}</p>
                <p>{t.about.craft}</p>
              </div>
            </article>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ABOUT_STATS.map(({ icon: Icon, labelKey, value, accent, descriptionKey }, index) => {
              const accentStyle = STAT_ACCENTS[accent]
              return (
                <Reveal
                  key={labelKey}
                  className="h-full"
                >
                  <div className="h-full transition-transform duration-500 ease-out will-change-transform hover:-translate-y-4 hover:scale-[1.03]">
                    <Card
                      className={cn(
                        "group relative h-full overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-950/85 via-slate-950/30 to-slate-900/30 p-5 sm:p-6 ring-1 ring-inset hover:shadow-2xl text-left",
                        accentStyle.ring,
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0 opacity-60 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-80 bg-gradient-to-br",
                          accentStyle.glow,
                        )}
                      />
                      <div className="relative flex items-center gap-4 mb-5">
                        <div
                          className={cn(
                            "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border text-xl transition-transform duration-500 group-hover:scale-105 shrink-0",
                            accentStyle.icon,
                          )}
                        >
                          <Icon size={22} className="sm:w-7 sm:h-7" />
                        </div>
                        <span className="text-xs uppercase tracking-[0.35em] text-white/70">
                          {t.about.stats[labelKey as keyof typeof t.about.stats]}
                        </span>
                      </div>
                      <div className="relative space-y-2">
                        <p className={cn("text-4xl font-black leading-tight drop-shadow-sm", accentStyle.value)}>{value}</p>
                        <p className="text-sm text-muted-foreground">
                          {t.about.statDescriptions[descriptionKey as keyof typeof t.about.statDescriptions]}
                        </p>
                      </div>
                    </Card>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
