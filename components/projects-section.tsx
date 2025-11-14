"use client"

import { useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SectionHeader } from "@/components/section-header"
import type { ProjectEntry } from "@/lib/contentful"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

// ProjectsSection renders Contentful projects with an interactive media tilt.
type ProjectsSectionProps = {
  projects?: ProjectEntry[]
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const { t } = useLanguage()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iskrenminkov.com"
  const projectsSchema =
    projects.length === 0
      ? null
      : {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: projects.map((project, index) => ({
            "@type": "CreativeWork",
            position: index + 1,
            name: project.title,
            description: project.description,
            genre: project.category,
            keywords: project.tags.join(", "),
            url: project.link || `${siteUrl}/#projects`,
          })),
        }

  return (
    <Reveal
      id="projects"
      as="section"
      className="relative overflow-hidden bg-muted/25 px-4 py-24"
    >

      <div className="container relative z-10 mx-auto max-w-6xl">
        <SectionHeader
          title={t.projects.title}
          subtitle={t.projects.subtitle}
          align="left"
          className="max-w-3xl"
          subtitleClassName="text-base sm:text-lg text-muted-foreground/90"
        />
        <p className="text-sm sm:text-base text-muted-foreground/90 max-w-3xl mb-12">
          {t.projects.description}
        </p>

        {projects.length === 0 ? (
          <Reveal as="p" className="text-center text-muted-foreground">
            {t.projects.empty ?? "Projects coming soon."}
          </Reveal>
        ) : (
          <div className="space-y-16" role="list" aria-label="Featured project case studies">
            {projects.map((project, index) => {
              const isReversed = index % 2 === 1
              return (
                <Reveal
                  key={project.id}
                  as="article"
                  role="listitem"
                  aria-labelledby={`project-${project.id}-title`}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                  className="relative"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <meta itemProp="name" content={project.title} />
                  <meta itemProp="description" content={project.description} />
                  <div
                    className={cn(
                      "flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12",
                      isReversed && "lg:flex-row-reverse",
                    )}
                  >
                    <div className={cn("lg:w-[55%]", isReversed && "lg:pl-6")}>
                      <Card className="gap-6 border-white/10 bg-background/95 px-6 py-6 shadow-2xl backdrop-blur sm:px-8 sm:py-8">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                          <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[0.65rem] text-primary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{project.category}</span>
                        </div>
                        <div className="space-y-4">
                          <h3
                            id={`project-${project.id}-title`}
                            className="text-2xl font-semibold text-balance sm:text-3xl"
                          >
                            {project.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted-foreground" itemProp="description">
                            {project.description}
                          </p>
                          {project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2" aria-label="Project capabilities">
                              {project.tags.map((tag, tagIndex) => (
                                <span
                                  key={`${project.id}-${tag}-${tagIndex}`}
                                  className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
                                  itemProp="keywords"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                      <div className={cn("mt-4 flex", isReversed ? "justify-end" : "justify-start")}>
                        {project.link ? (
                          <Button size="lg" className="gap-2" asChild>
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label={`Open ${project.title} case study`}
                              itemProp="url"
                            >
                              {t.projects.viewProject}
                              <ExternalLink className="size-4" />
                            </Link>
                          </Button>
                        ) : (
                          <Button size="lg" disabled>
                            {t.projects.viewProject}
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className={cn("relative lg:w-[45%]", isReversed && "lg:pr-6")}>
                      <InteractiveProjectMedia imageUrl={project.imageUrl} title={project.title} />
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
      {projectsSchema && (
        <Script
          id="projects-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        />
      )}
    </Reveal>
  )
}

type InteractiveProjectMediaProps = {
  imageUrl?: string
  title: string
  className?: string
}

function InteractiveProjectMedia({ imageUrl, title, className }: InteractiveProjectMediaProps) {
  const [transformStyle, setTransformStyle] = useState("perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)")
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 })

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const relativeX = (event.clientX - rect.left) / rect.width - 0.5
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5

    const rotateX = (-relativeY) * 12
    const rotateY = relativeX * 12

    setTransformStyle(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`)
    setShine({
      x: (relativeX + 0.5) * 100,
      y: (relativeY + 0.5) * 100,
      opacity: 0.25,
    })
  }

  const handlePointerLeave = () => {
    setTransformStyle("perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)")
    setShine((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      className={cn(
        "relative h-72 overflow-hidden rounded-[28px] border border-white/20 bg-muted/20 shadow-[0_30px_70px_rgba(15,23,42,0.35)] transition-transform duration-300 ease-out will-change-transform sm:h-80 lg:h-96",
        className,
      )}
      style={{ transform: transformStyle }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        fill
        sizes="(min-width: 1024px) 420px, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: shine.opacity,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.35), transparent 55%)`,
        }}
      />
    </div>
  )
}
