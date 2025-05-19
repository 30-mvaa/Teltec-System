import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { findUserByEmail, storeResetToken } from '@/lib/auth';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'El correo electrónico es requerido' },
        { status: 400 }
      );
    }

    // Verificar si el correo existe en la base de datos
    const user = await findUserByEmail(email);
    
    // Por seguridad, no revelamos si el correo existe o no
    if (!user) {
      return NextResponse.json(
        { message: 'Si el correo existe, recibirás instrucciones para restablecer tu contraseña.' },
        { status: 200 }
      );
    }

    // Generar token único
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora de validez

    // Guardar el token en la base de datos
    await storeResetToken(user.id, resetToken, resetTokenExpiry);

    // Construir URL de restablecimiento
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/restablecer-password/${resetToken}`;

    // Enviar correo electrónico
    await sendEmail({
      to: email,
      subject: 'Recuperación de contraseña - TelTec',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetUrl}. Este enlace expirará en 1 hora.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Recuperación de contraseña</h2>
          <p>Has solicitado restablecer tu contraseña en TelTec.</p>
          <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Restablecer contraseña</a>
          </p>
          <p>O copia y pega el siguiente enlace en tu navegador:</p>
          <p style="word-break: break-all; color: #3b82f6;"><a href="${resetUrl}">${resetUrl}</a></p>
          <p>Este enlace expirará en 1 hora.</p>
          <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="color: #6b7280; font-size: 14px;">TelTec - Sistema de Administración</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Si el correo existe, recibirás instrucciones para restablecer tu contraseña.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    return NextResponse.json(
      { message: 'Ocurrió un error al procesar la solicitud.' },
      { status: 500 }
    );
  }
}