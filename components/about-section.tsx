import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">Sobre Mim</h2>

        <div className="glass-effect rounded-3xl p-8 md:p-12 hover-lift">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
              <div className="absolute inset-0 rounded-full glow-gold animate-pulse" />
              <Image
                src="/professional-developer-portrait.png"
                alt="Josué Joshua"
                width={256}
                height={256}
                className="rounded-full relative z-10 border-4 border-neon-gold"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-neon-gold mb-4">Josué Rafael Sitoe</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Sou um desenvolvedor Fullstack de Moçambique, apaixonado por tecnologia e inovação. Com experiência em
                desenvolvimento web moderno, crio soluções digitais que combinam funcionalidade, performance e design
                elegante.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Especializado em React, Node.js, e tecnologias modernas de desenvolvimento web. Sempre em busca de novos
                desafios e oportunidades para crescer profissionalmente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
