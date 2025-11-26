import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { getProjects, getTestimonials } from "@/lib/contentful"

export const revalidate = 300

// HomePage assembles the marketing sections and fetches CMS-driven content.
export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([getProjects(), getTestimonials()])

  return (
    <main
      className="min-h-screen"
      itemScope
      itemType="https://schema.org/WebPage"
      itemProp="mainContentOfPage"
      aria-label="Iskren Minkov portfolio and services"
    >
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
