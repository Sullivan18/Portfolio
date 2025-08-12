import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const message = (body.message || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO,
      CONTACT_FROM,
    } = process.env as Record<string, string | undefined>;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      return NextResponse.json({ ok: false, error: "Configuração de email ausente." }, { status: 500 });
    }

    const isGmail = /gmail\.com$/i.test(SMTP_HOST);
    const port = Number(SMTP_PORT) || 587;
    const secure = port === 465;

    const transporter = nodemailer.createTransport(
      isGmail
        ? {
            service: "gmail",
            auth: { user: SMTP_USER, pass: SMTP_PASS },
          }
        : {
            host: SMTP_HOST,
            port,
            secure,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
          }
    );

    const fromAddress = CONTACT_FROM || SMTP_USER;
    const toAddress = CONTACT_TO;

    await transporter.sendMail({
      from: `Portfolio Contact <${fromAddress}>`,
      to: toAddress,
      replyTo: email,
      subject: `Novo contato de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.5; color:#0f172a">
          <h2 style="margin:0 0 12px">Novo contato do portfólio</h2>
          <p style="margin:0 0 8px"><strong>Nome:</strong> ${name}</p>
          <p style="margin:0 0 8px"><strong>Email:</strong> ${email}</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0" />
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("CONTACT_POST_ERROR", error);
    return NextResponse.json({ ok: false, error: "Falha ao enviar." }, { status: 500 });
  }
}


