import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { contactSchema, type ContactFormValues } from "@/lib/validation/contact"

// POST /api/contact validates form data and delivers it via MailerSend.
const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY
const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL
const TO_EMAIL = process.env.CONTACT_FORM_TO_EMAIL || FROM_EMAIL

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;"
      case "<":
        return "&lt;"
      case ">":
        return "&gt;"
      case '"':
        return "&quot;"
      case "'":
        return "&#039;"
      default:
        return char
    }
  })

export async function POST(req: Request) {
  const submissionId = Date.now().toString(36)
  console.log("[Contact] Request received", { submissionId })

  if (!MAILERSEND_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
    console.error("[Contact] Missing MailerSend configuration", {
      submissionId,
      hasApiKey: Boolean(MAILERSEND_API_KEY),
      hasFromEmail: Boolean(FROM_EMAIL),
      hasToEmail: Boolean(TO_EMAIL),
    })
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 })
  }

  let payload: ContactFormValues
  try {
    const body = await req.json()
    payload = contactSchema.parse(body)
    console.log("[Contact] Payload validated", {
      submissionId,
      name: payload.name,
      email: payload.email,
      hasPhone: Boolean(payload.phone?.trim()),
      hasService: Boolean(payload.service?.trim()),
    })
  } catch (error) {
    if (error instanceof ZodError) {
      console.warn("[Contact] Validation failed", {
        submissionId,
        issues: error.issues.map((issue) => issue.message),
      })
      return NextResponse.json(
        {
          error: "Please check your entries and try again.",
          issues: error.issues.map((issue) => issue.message),
        },
        { status: 422 },
      )
    }

    console.error("[Contact] Malformed request body", { submissionId, error })
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 })
  }

  const { name, email, phone, service, message } = payload
  console.log("[Contact] Preparing MailerSend payload", { submissionId })

  const plainContent = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone?.trim() ? phone : "N/A"}`,
    `Service: ${service?.trim() ? service : "N/A"}`,
    "",
    message,
  ].join("\n")

  const htmlContent = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone?.trim() || "N/A")}</p>
    <p><strong>Service:</strong> ${escapeHtml(service?.trim() || "N/A")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `

  const mailersendResponse = await fetch("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILERSEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: FROM_EMAIL, name: "Portfolio Contact Form" },
      to: [{ email: TO_EMAIL }],
      reply_to: { email, name },
      subject: `New inquiry from ${name}`,
      text: plainContent,
      html: htmlContent,
    }),
  })

  if (!mailersendResponse.ok) {
    const errorText = await mailersendResponse.text()
    console.error("[Contact] MailerSend error", {
      submissionId,
      status: mailersendResponse.status,
      body: errorText,
    })
    return NextResponse.json({ error: "Unable to send message right now." }, { status: 502 })
  }

  console.log("[Contact] MailerSend accepted message", { submissionId })
  return NextResponse.json({ success: true })
}
