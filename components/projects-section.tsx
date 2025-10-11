"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo",
      image: "/modern-ecommerce-website.png",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/josuejoshua",
      demo: "https://demo.com",
    },
    {
      title: "Task Management App",
      description: "Aplicativo de gerenciamento de tarefas com colaboração em tempo real",
      image: "/task-management-dashboard.png",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      github: "https://github.com/josuejoshua",
      demo: "https://demo.com",
    },
    {
      title: "Social Media Dashboard",
      description: "Dashboard analítico para gerenciar múltiplas redes sociais",
      image: "/social-media-analytics-dashboard.png",
      tech: ["React", "Express", "MongoDB", "Chart.js"],
      github: "https://github.com/josuejoshua",
      demo: "https://demo.com",
    },
    {
      title: "Weather Forecast App",
      description: "Aplicativo de previsão do tempo com dados em tempo real e mapas interativos",
      image: "/weather-app-interface.png",
      tech: ["React", "OpenWeather API", "Leaflet", "Tailwind"],
      github: "https://github.com/josuejoshua",
      demo: "https://demo.com",
    },
  ]

  return (
    <section id="projects" className="relative py-20 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">Projetos</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="glass-effect rounded-3xl overflow-hidden hover-lift group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue via-dark-blue/50 to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-neon-gold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-soft-lilac/20 text-soft-lilac rounded-full text-sm border border-soft-lilac/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => window.open(project.github, "_blank")}
                    variant="outline"
                    className="flex-1 border-neon-gold text-neon-gold hover:bg-neon-gold hover:text-dark-blue transition-all"
                  >
                    GitHub
                  </Button>
                  <Button
                    onClick={() => window.open(project.demo, "_blank")}
                    className="flex-1 bg-soft-lilac hover:bg-soft-lilac/90 text-white transition-all"
                  >
                    Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
