import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import FooterSection from "@/components/footer-section"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-blue overflow-x-hidden">
      <ParticleBackground />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
