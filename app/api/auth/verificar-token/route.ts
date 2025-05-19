import { NextResponse } from 'next/server';
import { getResetTokenData } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Token no proporcionado' },
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

    return NextResponse.json(
      { valid: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al verificar token:', error);
    return NextResponse.json(
      { message: 'Error al verificar token' },
      { status: 500 }
    );
  }
}