import Link from "next/link"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

// NotFound covers unknown routes on the marketing site.
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 bg-muted/20">
        <div className="text-center max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Error 404</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-balance">
            The page you are looking for doesn&apos;t exist (yet).
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            It might have been moved, renamed, or removed. Let&apos;s get you back to somewhere helpful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
