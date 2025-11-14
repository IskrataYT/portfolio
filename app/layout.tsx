import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Inter, Bricolage_Grotesque } from "next/font/google"
import Script from "next/script"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"
import { cookies } from "next/headers"

// RootLayout wires up fonts, theme defaults, analytics, and the language provider.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-heading" })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iskrenminkov.com"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const storedLanguage =
    typeof cookieStore?.get === "function" ? cookieStore.get("language")?.value : undefined
  const initialLanguage = storedLanguage === "bg" ? "bg" : "en"

  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} scroll-smooth dark`}>
      <body className={`font-sans antialiased`}>
        <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
        <Analytics />
        <Script
          id="site-person-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  )
}
