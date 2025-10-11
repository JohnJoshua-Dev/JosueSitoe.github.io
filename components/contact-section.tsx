"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem")
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Erro ao enviar mensagem")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="relative py-20 px-4 z-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">Contato</h2>

        <div className="glass-effect rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <p className="text-xl text-gray-300 mb-4">Vamos trabalhar juntos? Entre em contato!</p>
            <a
              href="mailto:josue.joshua@example.com"
              className="text-2xl text-neon-gold hover:text-soft-lilac transition-colors font-semibold"
            >
              josue.joshua@example.com
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-gold transition-colors text-white placeholder-gray-500"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-gold transition-colors text-white placeholder-gray-500"
                placeholder="seu.email@exemplo.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-gold transition-colors text-white placeholder-gray-500 resize-none"
                placeholder="Sua mensagem..."
              />
            </div>

            {status === "success" && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                Mensagem enviada com sucesso! Entrarei em contato em breve.
              </div>
            )}

            {status === "error" && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-neon-gold to-soft-lilac hover:opacity-90 text-dark-blue font-bold py-4 text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
