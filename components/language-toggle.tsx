"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { useLanguage } from "@/contexts/language-context"
import { type Language } from "@/lib/translations"
import { cn } from "@/lib/utils"

// LanguageToggle switches the UI copy between English and Bulgarian with a sliding pill.
const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "bg", label: "БГ" },
]

type LanguageToggleProps = {
  variant?: "inline" | "mobile"
  className?: string
}

export function LanguageToggle({ variant = "inline", className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Record<Language, HTMLButtonElement | null>>({
    en: null,
    bg: null,
  })
  const [highlightStyle, setHighlightStyle] = useState<{ width: number; left: number }>()

  const updateHighlight = useCallback(() => {
    const container = containerRef.current
    const activeButton = buttonRefs.current[language]
    if (!container || !activeButton) return

    const containerRect = container.getBoundingClientRect()
    const activeRect = activeButton.getBoundingClientRect()

    setHighlightStyle({
      width: activeRect.width,
      left: activeRect.left - containerRect.left,
    })
  }, [language, variant])

  useEffect(() => {
    updateHighlight()
    const handleResize = () => updateHighlight()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateHighlight])

  const containerClasses =
    variant === "mobile"
      ? "relative grid grid-cols-2 rounded-2xl border border-border/80 bg-background/90 p-1 gap-1 w-full overflow-hidden shadow-inner"
      : "relative inline-grid grid-cols-2 items-center rounded-full border border-white/15 bg-card/60 p-1 gap-1 shadow-inner backdrop-blur overflow-hidden"

  return (
    <div
      role="group"
      aria-label="Select language"
      ref={containerRef}
      className={cn(containerClasses, className)}
    >
      {highlightStyle && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1 bottom-1 rounded-[inherit] bg-white text-background shadow-lg shadow-black/15 transition-[transform,width] duration-300 ease-out"
          style={{
            width: `${highlightStyle.width}px`,
            transform: `translateX(${highlightStyle.left}px)`,
          }}
        />
      )}
      {LANGUAGES.map(({ code, label }) => {
        const isActive = language === code
        return (
          <button
            key={code}
            type="button"
            ref={(node) => {
              buttonRefs.current[code] = node
              if (node && isActive) {
                requestAnimationFrame(() => {
                  updateHighlight()
                })
              }
            }}
            onClick={() => {
              if (!isActive) {
                setLanguage(code)
              }
            }}
            className={cn(
              "relative z-[1] px-3 py-1 text-xs font-semibold uppercase rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              variant === "mobile" ? "text-sm" : "text-xs",
              isActive ? "text-background" : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={isActive}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
