"use client"

import { useEffect, useRef, useState } from "react"

// useScrollReveal wires an IntersectionObserver to toggle the `.reveal-visible` class.
type UseScrollRevealOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -5% 0px",
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return { ref, isVisible }
}
