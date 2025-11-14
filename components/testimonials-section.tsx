"use client"

import Image from "next/image"
import Script from "next/script"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SectionHeader } from "@/components/section-header"
import { cn } from "@/lib/utils"
import type { TestimonialEntry } from "@/lib/contentful"
import { Reveal } from "@/components/reveal"

// TestimonialsSection showcases social proof with animated testimonial cards.
type TestimonialsSectionProps = {
  testimonials?: TestimonialEntry[]
}

const CARD_LAYOUT = [
  { span: "md:col-span-7", glow: "from-primary/20 via-slate-900/40 to-slate-900/70" },
  { span: "md:col-span-5", glow: "from-rose-500/20 via-slate-900/40 to-slate-900/70" },
  { span: "md:col-span-6", glow: "from-amber-400/25 via-slate-900/40 to-slate-900/70" },
  { span: "md:col-span-6", glow: "from-emerald-400/25 via-slate-900/40 to-slate-900/70" },
  { span: "md:col-span-5", glow: "from-indigo-500/20 via-slate-900/40 to-slate-900/70" },
  { span: "md:col-span-7", glow: "from-cyan-400/20 via-slate-900/40 to-slate-900/70" },
]

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iskrenminkov.com"

export function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const { t } = useLanguage()
  const reviewsSchema =
    testimonials.length === 0
      ? null
      : {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: testimonials.map((testimonial, index) => ({
            "@type": "Review",
            position: index + 1,
            author: {
              "@type": "Person",
              name: testimonial.name,
            },
            reviewBody: testimonial.content,
            reviewRating: {
              "@type": "Rating",
              ratingValue: testimonial.rating,
              bestRating: 5,
              worstRating: 1,
            },
            publisher: {
              "@type": "Organization",
              name: "Iskren Minkov Studio",
            },
            datePublished: testimonial.partnershipYear ? `${testimonial.partnershipYear}-01-01` : undefined,
            url: SITE_URL,
          })),
        }

  return (
    <Reveal
      id="testimonials"
      as="section"
      aria-labelledby="testimonials-heading"
      className="py-20 px-4 relative overflow-hidden bg-background"
    >

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={t.testimonials.title} subtitle={t.testimonials.subtitle} />

          {/* Testimonials Grid */}
          {testimonials.length === 0 ? (
            <Reveal as="p" className="text-center text-muted-foreground">
              {t.testimonials.empty ?? "Testimonials coming soon."}
            </Reveal>
          ) : (
            <div className="grid gap-6 auto-rows-[1fr] md:grid-cols-12" role="list" aria-label="Client testimonials">
              {testimonials.map((testimonial, index) => {
                const layout = CARD_LAYOUT[index % CARD_LAYOUT.length]
                const quoteId = `testimonial-${testimonial.id}`
                return (
                  <Reveal
                    key={testimonial.id}
                    className={cn("col-span-12", layout.span)}
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <article
                      aria-labelledby={`${quoteId}-author`}
                      itemScope
                      itemType="https://schema.org/Review"
                    >
                      <Card
                        className={cn(
                          "group relative h-full overflow-hidden border border-white/10 bg-gradient-to-br p-6 sm:p-8 backdrop-blur",
                          layout.glow,
                        )}
                      >
                      <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
                      <span className="absolute -right-12 top-1/2 h-36 w-36 rounded-full bg-primary/20 blur-3xl opacity-40 group-hover:opacity-70 transition-opacity" />
                      <div className="flex flex-col gap-6 h-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-amber-300" aria-label={`${testimonial.rating} star rating`}>
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                size={18}
                                fill="currentColor"
                                className="drop-shadow-[0_0_12px_rgba(251,191,36,0.45)]"
                              />
                            ))}
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.4em] text-white/70">
                            {testimonial.job}
                          </span>
                        </div>

                        <blockquote
                          id={quoteId}
                          className="relative text-base text-foreground/90 leading-relaxed pl-6"
                          itemProp="reviewBody"
                        >
                          <span className="absolute left-0 top-0 text-4xl text-primary/40 font-serif">“</span>
                          {testimonial.content}
                          <span className="text-primary/40 font-serif">”</span>
                        </blockquote>

                        <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-white/5">
                          <div className="flex items-center gap-3">
                            <Image
                              src={
                                testimonial.photoUrl ||
                                `https://source.boringavatars.com/marble/120/${encodeURIComponent(testimonial.name)}?colors=0f172a,1e293b,3b82f6`
                              }
                              alt={testimonial.name}
                              width={52}
                              height={52}
                              className="h-12 w-12 rounded-2xl object-cover border border-white/10"
                            />
                            <div>
                              <p id={`${quoteId}-author`} className="font-semibold" itemProp="author" itemScope itemType="https://schema.org/Person">
                                <span itemProp="name">{testimonial.name}</span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {testimonial.partnershipYear ? `Partner since ${testimonial.partnershipYear}` : testimonial.job}
                              </p>
                            </div>
                          </div>
                          <span className="hidden sm:block text-xs font-mono uppercase tracking-[0.3em] text-white/60">
                            Impact
                          </span>
                        </div>
                      </div>
                      </Card>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          )}
        </div>
      </div>
      {reviewsSchema && (
        <Script
          id="testimonials-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
        />
      )}
    </Reveal>
  )
}
