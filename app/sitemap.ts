import type { MetadataRoute } from "next"
import { servicesData } from "@/lib/service-data"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iskrenminkov.com"
const siteUpdatedAt = process.env.NEXT_PUBLIC_SITE_LAST_UPDATED ?? new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteUpdatedAt)

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ]

  const serviceEntries: MetadataRoute.Sitemap = Object.keys(servicesData).map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...baseEntries, ...serviceEntries]
}
