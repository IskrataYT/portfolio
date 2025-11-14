"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import Script from "next/script"
import { useLanguage } from "@/contexts/language-context"
import { SectionHeader } from "@/components/section-header"
import { contactSchema, type ContactFormValues } from "@/lib/validation/contact"
import { Reveal } from "@/components/reveal"

// ContactSection renders the form, validation errors, and quick contact cards.
export function ContactSection() {
  const { t } = useLanguage()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iskrenminkov.com"

  const [formData, setFormData] = useState<ContactFormValues>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFieldErrors([])
    setIsSubmitting(true)

    const validation = contactSchema.safeParse(formData)
    if (!validation.success) {
      setFieldErrors(validation.error.issues.map((issue) => issue.message))
      setIsSubmitting(false)
      return
    }

    const payload = validation.data

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)

        if (response.status === 422 && Array.isArray(data?.issues)) {
          setFieldErrors(data.issues as string[])
        } else {
          setError(data?.error || t.contact.form.errorMessage)
        }

        return
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
      setFieldErrors([])
      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    } catch (err) {
      console.error("Contact form submission failed", err)
      setError(t.contact.form.errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactPointSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${siteUrl}/#contact`,
    mainEntity: {
      "@type": "Person",
      name: "Iskren Minkov",
      email: "hello@iskrenminkov.com",
      telephone: "+359 888 123 456",
      areaServed: "Worldwide",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "business",
        availableLanguage: ["English", "Bulgarian"],
        email: "hello@iskrenminkov.com",
        telephone: "+359 888 123 456",
      },
    },
  }

  return (
    <Reveal
      id="contact"
      as="section"
      aria-label="Contact Iskren Minkov"
      itemScope
      itemType="https://schema.org/ContactPage"
      className="py-16 sm:py-20 px-4 bg-muted/30"
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} />
          <p className="text-sm sm:text-base text-muted-foreground/90 mb-8">{t.contact.intro}</p>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <Reveal style={{ transitionDelay: "0ms" }}>
                <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow" itemScope itemType="https://schema.org/ContactPoint">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">{t.contact.info.email}</h3>
                      <a
                        className="text-xs sm:text-sm text-muted-foreground break-words underline-offset-2 hover:underline"
                        href="mailto:hello@iskrenminkov.com"
                        itemProp="email"
                      >
                        hello@iskrenminkov.com
                      </a>
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal style={{ transitionDelay: "80ms" }}>
                <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow" itemScope itemType="https://schema.org/ContactPoint">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">{t.contact.info.phone}</h3>
                      <a className="text-xs sm:text-sm text-muted-foreground" href="tel:+359888123456" itemProp="telephone">
                        +359 888 123 456
                      </a>
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal style={{ transitionDelay: "160ms" }}>
                <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow" itemScope itemType="https://schema.org/Place">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm sm:text-base">{t.contact.info.location}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground" itemProp="areaServed">
                        {t.contact.info.locationValue}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal
                className="p-4 sm:p-6 rounded-lg bg-primary/5 border border-primary/20"
                style={{ transitionDelay: "240ms" }}
              >
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{t.contact.info.response}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{t.contact.info.responseValue}</p>
              </Reveal>
            </div>

            {/* Contact Form */}
            <Reveal className="lg:col-span-2" style={{ transitionDelay: "120ms" }}>
              <Card className="p-6 sm:p-8" itemScope itemType="https://schema.org/Message">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{t.contact.form.successTitle}</h3>
                    <p className="text-muted-foreground text-center">{t.contact.form.successMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" aria-live="polite">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          {t.contact.form.name} *
                        </label>
                        <Input
                          id="name"
                          placeholder={t.contact.form.namePlaceholder}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          disabled={isSubmitting}
                          autoComplete="name"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          {t.contact.form.email} *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t.contact.form.emailPlaceholder}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          disabled={isSubmitting}
                          autoComplete="email"
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          {t.contact.form.phone}
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t.contact.form.phonePlaceholder}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={isSubmitting}
                          autoComplete="tel"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium mb-2">
                          {t.contact.form.service}
                        </label>
                        <Input
                          id="service"
                          placeholder={t.contact.form.servicePlaceholder}
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          disabled={isSubmitting}
                          autoComplete="organization-title"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {t.contact.form.message} *
                      </label>
                      <Textarea
                        id="message"
                        placeholder={t.contact.form.messagePlaceholder}
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        disabled={isSubmitting}
                        aria-required="true"
                        aria-describedby="contact-message-help"
                      />
                      <p id="contact-message-help" className="mt-2 text-xs text-muted-foreground">
                        {t.contact.form.messageHelp}
                      </p>
                    </div>

                    {(error || fieldErrors.length > 0) && (
                      <div
                        className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
                        role="alert"
                      >
                        <p className="font-semibold">{t.contact.form.errorTitle}</p>
                        {error && <p>{error}</p>}
                        {fieldErrors.length > 0 && (
                          <ul className="mt-2 list-disc space-y-1 pl-5">
                            {fieldErrors.map((issue, index) => (
                              <li key={`${issue}-${index}`}>{issue}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    <Button type="submit" size="lg" variant="highlight" className="w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? t.contact.form.sending : t.contact.form.send}
                    </Button>
                  </form>
                )}
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
      <Script
        id="contact-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }}
      />
    </Reveal>
  )
}
