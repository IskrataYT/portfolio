"use client"

import * as React from "react"

// HeroBackgroundCanvas paints the animated grid trails that sit behind the hero copy.
const GRID_SPACING = 60
const TRAIL_COUNT = 14
const MIN_TRAIL_SPEED = 30
const MAX_TRAIL_SPEED = 110
const TRAIL_HISTORY_LENGTH = 16
const TRAIL_MARGIN = GRID_SPACING

type Trail = {
  orientation: "horizontal" | "vertical"
  fixedCoord: number
  position: number
  direction: 1 | -1
  speed: number
  history: Array<{ x: number; y: number }>
  opacity: number
}

function randomGridCoordinate(size: number) {
  const segments = Math.max(1, Math.round(size / GRID_SPACING))
  return Math.min(size, Math.round(Math.random() * segments) * GRID_SPACING)
}

function createTrail(width: number, height: number): Trail {
  const orientation: Trail["orientation"] = Math.random() > 0.5 ? "horizontal" : "vertical"
  const direction: Trail["direction"] = Math.random() > 0.5 ? 1 : -1
  const speed = MIN_TRAIL_SPEED + Math.random() * (MAX_TRAIL_SPEED - MIN_TRAIL_SPEED)
  const opacity = 0.3 + Math.random() * 0.3

  if (orientation === "horizontal") {
    const fixedCoord = randomGridCoordinate(height)
    const position = direction === 1 ? -TRAIL_MARGIN : width + TRAIL_MARGIN
    return { orientation, fixedCoord, position, direction, speed, history: [], opacity }
  }

  const fixedCoord = randomGridCoordinate(width)
  const position = direction === 1 ? -TRAIL_MARGIN : height + TRAIL_MARGIN
  return { orientation, fixedCoord, position, direction, speed, history: [], opacity }
}

function respawnTrail(trail: Trail, width: number, height: number) {
  const next = createTrail(width, height)
  trail.orientation = next.orientation
  trail.fixedCoord = next.fixedCoord
  trail.position = next.position
  trail.direction = next.direction
  trail.speed = next.speed
  trail.history = []
  trail.opacity = next.opacity
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save()
  ctx.strokeStyle = "rgba(255,255,255,0.05)"
  ctx.lineWidth = 1
  ctx.beginPath()

  for (let x = 0; x <= width; x += GRID_SPACING) {
    ctx.moveTo(x + 0.5, 0)
    ctx.lineTo(x + 0.5, height)
  }

  for (let y = 0; y <= height; y += GRID_SPACING) {
    ctx.moveTo(0, y + 0.5)
    ctx.lineTo(width, y + 0.5)
  }

  ctx.stroke()
  ctx.restore()
}

function updateAndDrawTrail(
  ctx: CanvasRenderingContext2D,
  trail: Trail,
  delta: number,
  width: number,
  height: number,
) {
  trail.position += trail.direction * trail.speed * delta

  let x = trail.orientation === "horizontal" ? trail.position : trail.fixedCoord
  let y = trail.orientation === "horizontal" ? trail.fixedCoord : trail.position

  trail.history.unshift({ x, y })
  if (trail.history.length > TRAIL_HISTORY_LENGTH) {
    trail.history.pop()
  }

  const outOfBounds =
    (trail.orientation === "horizontal" &&
      ((trail.direction === 1 && x > width + TRAIL_MARGIN) || (trail.direction === -1 && x < -TRAIL_MARGIN))) ||
    (trail.orientation === "vertical" &&
      ((trail.direction === 1 && y > height + TRAIL_MARGIN) || (trail.direction === -1 && y < -TRAIL_MARGIN)))

  if (outOfBounds) {
    respawnTrail(trail, width, height)
    x = trail.orientation === "horizontal" ? trail.position : trail.fixedCoord
    y = trail.orientation === "horizontal" ? trail.fixedCoord : trail.position
  }

  if (trail.history.length < 2) {
    return
  }

  const head = trail.history[0]
  const tail = trail.history[trail.history.length - 1]

  ctx.save()
  ctx.lineCap = "round"

  const gradient = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y)
  gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
  gradient.addColorStop(0.4, `rgba(255, 255, 255, ${0.08 * trail.opacity})`)
  gradient.addColorStop(1, `rgba(255, 255, 255, ${0.28 * trail.opacity})`)

  ctx.strokeStyle = gradient
  ctx.lineWidth = 1.6

  ctx.beginPath()
  ctx.moveTo(tail.x, tail.y)
  ctx.lineTo(head.x, head.y)
  ctx.stroke()

  const activeSegmentLength = GRID_SPACING * 1.4
  const headStart = { x: head.x, y: head.y }

  if (trail.orientation === "horizontal") {
    headStart.x = head.x - trail.direction * activeSegmentLength
  } else {
    headStart.y = head.y - trail.direction * activeSegmentLength
  }

  ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * trail.opacity})`
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(headStart.x, headStart.y)
  ctx.lineTo(head.x, head.y)
  ctx.stroke()

  ctx.restore()
}

export function HeroBackgroundCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const update = () => setIsMobile(mediaQuery.matches)
    update()

    const handler = () => update()
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler)
    } else {
      mediaQuery.addListener(handler)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler)
      } else {
        mediaQuery.removeListener(handler)
      }
    }
  }, [])

  React.useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = { width: wrapper.clientWidth, height: wrapper.clientHeight }
    let trails: Trail[] = []

    const ensureTrailCount = () => {
      if (!trails.length) {
        trails = Array.from({ length: TRAIL_COUNT }, () => createTrail(size.width, size.height))
      } else if (trails.length < TRAIL_COUNT) {
        trails = trails.concat(Array.from({ length: TRAIL_COUNT - trails.length }, () => createTrail(size.width, size.height)))
      } else if (trails.length > TRAIL_COUNT) {
        trails = trails.slice(0, TRAIL_COUNT)
      }
    }

    const drawStaticGrid = () => {
      ctx.clearRect(0, 0, size.width, size.height)
      drawGrid(ctx, size.width, size.height)
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const nextWidth = wrapper.clientWidth
      const nextHeight = wrapper.clientHeight

      if (nextWidth === 0 || nextHeight === 0) {
        return
      }

      size.width = nextWidth
      size.height = nextHeight

      canvas.width = Math.max(1, Math.floor(size.width * dpr))
      canvas.height = Math.max(1, Math.floor(size.height * dpr))
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      trails.forEach((trail) => {
        if (trail.orientation === "horizontal") {
          trail.fixedCoord = Math.min(size.height, Math.max(0, trail.fixedCoord))
        } else {
          trail.fixedCoord = Math.min(size.width, Math.max(0, trail.fixedCoord))
        }
      })

      ensureTrailCount()

      if (isMobile) {
        drawStaticGrid()
      }
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrapper)

    let animationFrameId: number | null = null
    let lastTime = performance.now()

    const render = (time: number) => {
      const delta = Math.min(0.05, (time - lastTime) / 1000 || 0)
      lastTime = time

      ctx.clearRect(0, 0, size.width, size.height)
      drawGrid(ctx, size.width, size.height)
      trails.forEach((trail) => updateAndDrawTrail(ctx, trail, delta, size.width, size.height))

      animationFrameId = window.requestAnimationFrame(render)
    }

    if (!isMobile) {
      animationFrameId = window.requestAnimationFrame(render)
    } else {
      drawStaticGrid()
    }

    return () => {
      resizeObserver.disconnect()
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isMobile])

  return (
    <div ref={wrapperRef} className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
