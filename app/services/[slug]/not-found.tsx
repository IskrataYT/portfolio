import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AlertCircle } from "lucide-react"

// ServiceNotFound provides a graceful fallback when a service slug is invalid.
export default function ServiceNotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 text-destructive mb-6">
            <AlertCircle size={40} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The service you're looking for doesn't exist or may have been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/#services">View All Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
