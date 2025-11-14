"use client"

import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from "react"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

// Lightweight wrapper that applies the shared scroll reveal animation to any element.
export type RevealProps<T extends ElementType = "div"> = {
  as?: T
  children: ReactNode
  disableReveal?: boolean
} & Omit<ComponentPropsWithoutRef<T>, "as" | "ref" | "children">

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  disableReveal = false,
  ...rest
}: RevealProps<T>) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()
  const Component = (as ?? "div") as ElementType

  const revealClasses = disableReveal ? undefined : cn("reveal", isVisible && "reveal-visible")

  return (
    <Component
      ref={ref as Ref<never>}
      className={cn(revealClasses, className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
