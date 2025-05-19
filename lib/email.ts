// lib/email.ts
import nodemailer from 'nodemailer';

type EmailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  // Crear un transporte reutilizable usando SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true para 465, false para otros puertos
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  // Enviar correo con el objeto de transporte definido
  const info = await transporter.sendMail({
    from: `"TelTec" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    text,
    html,
  });

  console.log('Mensaje enviado: %s', info.messageId);
  return info;
}