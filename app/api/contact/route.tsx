import { type NextRequest, NextResponse } from "next/server"

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    if (name.length < 2) {
      return NextResponse.json({ error: "Nome deve ter pelo menos 2 caracteres" }, { status: 400 })
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Mensagem deve ter pelo menos 10 caracteres" }, { status: 400 })
    }

    // Here you would integrate with an email service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES

    // For now, we'll just log the data and return success
    console.log("[v0] Contact form submission:", {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Integrate with email service
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'contact@yourdomain.com',
    //   to: 'josue.joshua@example.com',
    //   subject: `Nova mensagem de ${name}`,
    //   html: `
    //     <h2>Nova mensagem do site</h2>
    //     <p><strong>Nome:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Mensagem:</strong></p>
    //     <p>${message}</p>
    //   `,
    // })

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso!",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ error: "Erro ao processar sua mensagem. Tente novamente." }, { status: 500 })
  }
}
