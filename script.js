// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden")
})

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll("a")
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden")
  })
})

// Typing Effect
const skills = ["React", "Laravel", "Node.js", "Flutter", "Python", "SQL Server", "PHP"]
let skillIndex = 0
let charIndex = 0
let isDeleting = false
const typingSpeed = 100
const deletingSpeed = 50
const pauseTime = 2000

function typeSkill() {
  const typingText = document.getElementById("typing-text")
  const currentSkill = skills[skillIndex]

  if (isDeleting) {
    typingText.textContent = currentSkill.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingText.textContent = currentSkill.substring(0, charIndex + 1)
    charIndex++
  }

  if (!isDeleting && charIndex === currentSkill.length) {
    isDeleting = true
    setTimeout(typeSkill, pauseTime)
    return
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false
    skillIndex = (skillIndex + 1) % skills.length
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed
  setTimeout(typeSkill, speed)
}

// Start typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeSkill, 500)
})

// Particles Animation
const canvas = document.getElementById("particles-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []
const particleCount = 100

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2 + 1
    this.speedX = Math.random() * 1 - 0.5
    this.speedY = Math.random() * 1 - 0.5
    this.color = Math.random() > 0.5 ? "#FFD700" : "#A37FFF"
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > canvas.width || this.x < 0) {
      this.speedX *= -1
    }

    if (this.y > canvas.height || this.y < 0) {
      this.speedY *= -1
    }
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw()

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        ctx.strokeStyle = `rgba(255, 215, 0, ${1 - distance / 100})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }

  requestAnimationFrame(animateParticles)
}

initParticles()
animateParticles()

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Form Validation and Submission
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const message = document.getElementById("message").value.trim()

  // Basic validation
  if (name === "" || email === "" || message === "") {
    alert("Por favor, preencha todos os campos.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um email válido.")
    return
  }

  // Success message
  alert("Mensagem enviada com sucesso! Entrarei em contacto em breve.")
  contactForm.reset()
})

// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})
