export default function SkillsSection() {
  const skills = [
    { name: "HTML5", icon: "🌐", level: 95 },
    { name: "CSS3", icon: "🎨", level: 90 },
    { name: "JavaScript", icon: "⚡", level: 92 },
    { name: "React", icon: "⚛️", level: 88 },
    { name: "Node.js", icon: "🟢", level: 85 },
    { name: "TypeScript", icon: "📘", level: 87 },
    { name: "Next.js", icon: "▲", level: 86 },
    { name: "MongoDB", icon: "🍃", level: 83 },
    { name: "PostgreSQL", icon: "🐘", level: 82 },
    { name: "Git", icon: "📦", level: 90 },
    { name: "Docker", icon: "🐳", level: 80 },
    { name: "Tailwind CSS", icon: "💨", level: 93 },
  ]

  return (
    <section id="skills" className="relative py-20 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">Habilidades Técnicas</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="glass-effect rounded-2xl p-6 text-center hover-lift group cursor-pointer">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{skill.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-gold transition-colors">
                {skill.name}
              </h3>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-gold to-soft-lilac transition-all duration-1000 group-hover:animate-pulse"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">{skill.level}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
