import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Inter, Bricolage_Grotesque } from "next/font/google"
import Script from "next/script"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

// RootLayout wires up fonts, theme defaults, analytics, and the language provider.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-heading" })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iskrenminkov.com"
const siteUpdatedAt = process.env.NEXT_PUBLIC_SITE_LAST_UPDATED ?? new Date().toISOString()

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Iskren Minkov",
  url: siteUrl,
  jobTitle: "Web Developer & Digital Strategist",
  worksFor: { "@type": "Organization", name: "Iskren Minkov Studio" },
  sameAs: [
    "https://www.linkedin.com/in/iskrenminkov",
    "https://github.com/iskrenminkov",
  ],
  email: "hello@iskrenminkov.com",
  image: `${siteUrl}/icon-light-32x32.png`,
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Iskren Minkov Studio",
  url: siteUrl,
  logo: `${siteUrl}/icon-light-32x32.png`,
  sameAs: ["https://www.linkedin.com/in/iskrenminkov", "https://github.com/iskrenminkov"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "hello@iskrenminkov.com",
      contactType: "customer support",
      availableLanguage: ["English", "Bulgarian"],
    },
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Iskren Minkov",
  url: siteUrl,
  description:
    "Iskren Minkov is a senior web developer and SEO strategist crafting lightning-fast, search-ready experiences.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

const structuredData = [personSchema, organizationSchema, websiteSchema]

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: "Iskren Minkov - Web Developer & Designer",
  description:
    "Iskren Minkov is a senior web developer and SEO strategist crafting lightning-fast, search-ready experiences.",
  keywords: [
    "Iskren Minkov",
    "web developer",
    "Next.js consultant",
    "technical SEO",
    "web design",
  ],
  authors: [{ name: "Iskren Minkov", url: siteUrl }],
  openGraph: {
    title: "Iskren Minkov · Web Developer & Digital Strategist",
    description:
      "Portfolio, services, and case studies from Iskren Minkov—crafting performant, SEO-optimized experiences.",
    url: siteUrl,
    siteName: "Iskren Minkov Studio",
    type: "website",
    updatedTime: siteUpdatedAt,
    images: [{ url: `${siteUrl}/icon-light-32x32.png` }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@iskrenminkov",
    title: "Iskren Minkov · Web Developer & Digital Strategist",
    description:
      "High-performing, search-friendly web experiences built by Iskren Minkov.",
  },
  generator: "v0.app",
  other: {
    "og:updated_time": siteUpdatedAt,
    "last-modified": siteUpdatedAt,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { color: "#0c111d", media: "(prefers-color-scheme: dark)" },
    { color: "#f7f7f2", media: "(prefers-color-scheme: light)" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} scroll-smooth dark`}>
      <body className={`font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
        <Script
          id="site-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}
