"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const skills = ["Fullstack Developer", "React Specialist", "Node.js Expert", "UI/UX Enthusiast"]
  const [skillIndex, setSkillIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentSkill = skills[skillIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentSkill.length) {
            setDisplayText(currentSkill.substring(0, charIndex + 1))
            setCharIndex(charIndex + 1)
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentSkill.substring(0, charIndex - 1))
            setCharIndex(charIndex - 1)
          } else {
            setIsDeleting(false)
            setSkillIndex((skillIndex + 1) % skills.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, skillIndex, skills])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 z-10">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="text-white">Olá, Eu sou </span>
          <span className="text-gradient">Josué Joshua</span>
        </h1>

        <div className="h-16 mb-8">
          <p className="text-2xl md:text-3xl text-neon-gold font-heading">
            {displayText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Desenvolvedor Fullstack apaixonado por criar experiências digitais inovadoras e funcionais
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => scrollToSection("projects")}
            className="bg-neon-gold text-dark-blue hover:bg-neon-gold/90 glow-gold px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
          >
            Ver Projetos
          </Button>
          <Button
            onClick={() => window.open("/cv.pdf", "_blank")}
            variant="outline"
            className="border-2 border-soft-lilac text-soft-lilac hover:bg-soft-lilac hover:text-white glow-lilac px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
          >
            Download CV
          </Button>
        </div>
      </div>
    </section>
  )
}
