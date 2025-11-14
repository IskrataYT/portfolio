"use client"

import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// SectionHeader animates section titles with the staggered letter reveal effect.
type SectionHeaderProps = {
  title: string
  subtitle: string
  align?: "left" | "center"
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  const alignmentClasses = align === "left" ? "text-left" : "text-center"
  const subtitleAlignment = align === "left" ? "mx-0" : "mx-auto"
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.25 })
  const characters = Array.from(title)

  return (
    <div
      ref={ref}
      className={cn("mb-12 sm:mb-16 space-y-4 reveal", alignmentClasses, className, isVisible && "reveal-visible")}
    >
      <h2
        aria-label={title}
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold text-balance title-reveal",
          titleClassName,
          isVisible && "title-reveal-visible",
        )}
      >
        {characters.map((char, index) => (
          <span key={`${char}-${index}`} style={{ "--char-index": index } as CSSProperties}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
      <p
        className={cn(
          "text-base sm:text-lg text-muted-foreground max-w-2xl text-pretty leading-relaxed",
          subtitleAlignment,
          subtitleClassName,
        )}
      >
        {subtitle}
      </p>
    </div>
  )
}
