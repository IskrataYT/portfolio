import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServiceDetails } from "@/components/service-details"
import { servicesData, type ServiceSlug } from "@/lib/service-data"

// Dynamic service route shows the detailed offering page for each slug.
export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: ServiceSlug }> }): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug]

  if (!service) {
    return {
      title: "Service Not Found",
    }
  }

  const english = service.en

  return {
    title: `${english.title} - Iskren Minkov`,
    description: english.subtitle,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: ServiceSlug }> }) {
  const { slug } = await params
  const service = servicesData[slug]

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <ServiceDetails slug={slug} content={service} />
      <Footer />
    </main>
  )
}
