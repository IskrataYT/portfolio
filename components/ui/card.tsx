"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Card adds cursor-tracking glow and glassmorphism styling shared by multiple sections.
const GLOW_PROXIMITY = 64
const HIDDEN_GLOW_POSITION = -200
const GLOW_EASING = 1
const GLOW_REST_THRESHOLD = 0.1
const GLOW_OPACITY_STRONG = 0.85
const GLOW_OPACITY_MEDIUM = 0.45
const GLOW_OPACITY_SOFT = 0.2

function Card({
  className,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  children,
  style,
  ...props
}: React.ComponentProps<"div">) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const animationFrameRef = React.useRef<number>()
  const targetPositionRef = React.useRef({
    x: HIDDEN_GLOW_POSITION,
    y: HIDDEN_GLOW_POSITION,
  })
  const currentPositionRef = React.useRef({
    x: HIDDEN_GLOW_POSITION,
    y: HIDDEN_GLOW_POSITION,
  })
  const setGlowOpacity = React.useCallback((intensity: number) => {
    const card = cardRef.current
    if (!card) return

    const clamped = Math.max(0, Math.min(intensity, 1))
    card.style.setProperty("--card-glow-opacity", clamped.toFixed(3))
    card.style.setProperty(
      "--card-glow-opacity-strong",
      (clamped * GLOW_OPACITY_STRONG).toFixed(3),
    )
    card.style.setProperty(
      "--card-glow-opacity-medium",
      (clamped * GLOW_OPACITY_MEDIUM).toFixed(3),
    )
    card.style.setProperty(
      "--card-glow-opacity-soft",
      (clamped * GLOW_OPACITY_SOFT).toFixed(3),
    )
  }, [])

  const [glowEnabled, setGlowEnabled] = React.useState(false)

  const glowFillStyle = React.useMemo(
    () =>
      ({
        background:
          "radial-gradient(260px circle at var(--card-cursor-glow-x, 50%) var(--card-cursor-glow-y, 50%), rgba(56, 189, 248, 0.12), rgba(14, 116, 144, 0.04) 45%, transparent 80%)",
        transition:
          "opacity 1500ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 1100ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      } as React.CSSProperties),
    []
  );

  const borderGradientStyle = React.useMemo(
    () =>
      ({
        background:
          "linear-gradient(rgba(10,11,15,0.95), rgba(10,11,15,0.95)) padding-box, radial-gradient(180px circle at var(--card-border-glow-x, 50%) var(--card-border-glow-y, 50%), rgba(59,130,246,var(--card-glow-opacity-strong,0)), rgba(37,99,235,var(--card-glow-opacity-medium,0)) 60%, rgba(14,165,233,var(--card-glow-opacity-soft,0)) 75%, transparent 80%) border-box",
        boxShadow: "0 10px 25px rgba(15, 23, 42, 0.35)",
        transition:
          "background 1500ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 950ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform, box-shadow",
      } as React.CSSProperties),
    [],
  );

  const animateGlow = React.useCallback(() => {
    const card = cardRef.current
    if (!card) {
      animationFrameRef.current = undefined
      return
    }

    const target = targetPositionRef.current
    const current = currentPositionRef.current

    const nextX = current.x + (target.x - current.x) * GLOW_EASING
    const nextY = current.y + (target.y - current.y) * GLOW_EASING

    const nextPosition = { x: nextX, y: nextY }
    currentPositionRef.current = nextPosition

    card.style.setProperty("--card-border-glow-x", `${nextX}%`)
    card.style.setProperty("--card-border-glow-y", `${nextY}%`)

    const hasSettled =
      Math.abs(nextX - target.x) < GLOW_REST_THRESHOLD &&
      Math.abs(nextY - target.y) < GLOW_REST_THRESHOLD

    if (hasSettled) {
      currentPositionRef.current = target
      animationFrameRef.current = undefined
      return
    }

    animationFrameRef.current = window.requestAnimationFrame(animateGlow)
  }, [])

  const startAnimation = React.useCallback(() => {
    if (animationFrameRef.current) return
    animationFrameRef.current = window.requestAnimationFrame(animateGlow)
  }, [animateGlow])

  const setGlowTarget = React.useCallback(
    (x: number, y: number) => {
      targetPositionRef.current = { x, y }
      startAnimation()
    },
    [startAnimation],
  )

  const resetGlow = React.useCallback(() => {
    setGlowTarget(HIDDEN_GLOW_POSITION, HIDDEN_GLOW_POSITION)
    setGlowOpacity(0)
  }, [setGlowOpacity, setGlowTarget])

  const updateCursorGlow = React.useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const clampedX = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    const clampedY = Math.min(Math.max(clientY - rect.top, 0), rect.height)

    const percentX = (clampedX / rect.width) * 100
    const percentY = (clampedY / rect.height) * 100

    card.style.setProperty("--card-cursor-glow-x", `${percentX}%`)
    card.style.setProperty("--card-cursor-glow-y", `${percentY}%`)
  }, [])

  const resetCursorGlow = React.useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty("--card-cursor-glow-x", "50%")
    card.style.setProperty("--card-cursor-glow-y", "50%")
  }, [])

  const updateGlowFromPoint = React.useCallback(
    (clientX: number, clientY: number) => {
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const outsideLeft = rect.left - clientX
      const outsideRight = clientX - rect.right
      const outsideTop = rect.top - clientY
      const outsideBottom = clientY - rect.bottom

      const deltaX = outsideLeft > 0 ? outsideLeft : outsideRight > 0 ? outsideRight : 0
      const deltaY = outsideTop > 0 ? outsideTop : outsideBottom > 0 ? outsideBottom : 0
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance > GLOW_PROXIMITY) {
        resetGlow()
        return
      }

      const proximityFactor = Math.max(0, 1 - distance / GLOW_PROXIMITY)

      const clampedX = Math.min(Math.max(clientX - rect.left, 0), rect.width)
      const clampedY = Math.min(Math.max(clientY - rect.top, 0), rect.height)

      const percentX = (clampedX / rect.width) * 100
      const percentY = (clampedY / rect.height) * 100

      setGlowTarget(percentX, percentY)
      setGlowOpacity(proximityFactor)
    },
    [resetGlow, setGlowOpacity, setGlowTarget],
  )

  React.useEffect(() => {
    const updateCapability = () => {
      if (typeof window === "undefined") return
      const prefersFinePointer = window.matchMedia("(pointer: fine)").matches
      const prefersHover = window.matchMedia("(hover: hover)").matches
      setGlowEnabled(prefersFinePointer && prefersHover)
    }

    updateCapability()

    const handleResize = () => updateCapability()
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  React.useEffect(() => {
    if (!glowEnabled) {
      resetGlow()
      resetCursorGlow()
      return
    }

    const handleWindowPointerMove = (event: PointerEvent) => {
      updateGlowFromPoint(event.clientX, event.clientY)
    }

    const handleWindowPointerLeave = () => {
      resetGlow()
    }

    window.addEventListener("pointermove", handleWindowPointerMove)
    window.addEventListener("pointerleave", handleWindowPointerLeave)

    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove)
      window.removeEventListener("pointerleave", handleWindowPointerLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = undefined
      }
    }
  }, [glowEnabled, resetGlow, resetCursorGlow, updateGlowFromPoint])

  const handlePointerEnter = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (glowEnabled) {
        updateGlowFromPoint(event.clientX, event.clientY)
        updateCursorGlow(event.clientX, event.clientY)
      }
      onPointerEnter?.(event)
    },
    [glowEnabled, onPointerEnter, updateCursorGlow, updateGlowFromPoint],
  )

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (glowEnabled) {
        updateGlowFromPoint(event.clientX, event.clientY)
        updateCursorGlow(event.clientX, event.clientY)
      }
      onPointerMove?.(event)
    },
    [glowEnabled, onPointerMove, updateCursorGlow, updateGlowFromPoint],
  )

  const handlePointerLeave = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (glowEnabled) {
        resetCursorGlow()
      }
      onPointerLeave?.(event)
    },
    [glowEnabled, onPointerLeave, resetCursorGlow],
  )

  return (
    <div
      ref={cardRef}
      data-slot="card"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group/card relative isolate flex flex-col gap-6 rounded-xl border border-transparent bg-transparent py-6 text-card-foreground transform-gpu transition-[transform,box-shadow,color,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [--card-border-glow-x:-200%] [--card-border-glow-y:-200%] [--card-cursor-glow-x:50%] [--card-cursor-glow-y:50%] [--card-glow-opacity:0] [--card-glow-opacity-strong:0] [--card-glow-opacity-medium:0] [--card-glow-opacity-soft:0]",
        "[&>*:not([data-card-overlay])]:relative [&>*:not([data-card-overlay])]:z-[2]",
        className
      )}
      style={{ ...borderGradientStyle, ...style }}
      {...props}
    >
      <span
        data-card-overlay="fill"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 blur-2xl mix-blend-screen transition-opacity duration-1200 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/card:opacity-60"
        style={glowFillStyle}
      />
      {children}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
