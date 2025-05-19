import { NextResponse } from 'next/server';
import { getResetTokenData, hashPassword, updateUserPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Verificar si el token existe y es válido
    const tokenData = await getResetTokenData(token);

    if (!tokenData) {
      return NextResponse.json(
        { message: 'Token inválido o expirado' },
        { status: 400 }
      );
    }

    // Validar la contraseña
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);

    // Actualizar la contraseña del usuario y eliminar el token
    await updateUserPassword(tokenData.userId, hashedPassword);

    return NextResponse.json(
      { message: 'Contraseña actualizada correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    return NextResponse.json(
      { message: 'Ocurrió un error al procesar la solicitud.' },
      { status: 500 }
    );
  }
}