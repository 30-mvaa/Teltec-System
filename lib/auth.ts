import bcrypt from 'bcrypt';
import { prisma } from './prisma';

// Función para hashear contraseñas
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Función para verificar contraseñas
export async function verifyPassword(storedPassword: string, suppliedPassword: string): Promise<boolean> {
  return bcrypt.compare(suppliedPassword, storedPassword);
}

// Función para buscar un usuario por email
export async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        password: true // Incluye la contraseña para verificación
      }
    });
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    return null;
  }
}

// Función para almacenar un token de restablecimiento
export async function storeResetToken(email: string, token: string, expiry: Date) {
  try {
    await prisma.user.update({
      where: { email },
      data: { 
        resetToken: token, 
        resetTokenExpiry: expiry 
      },
    });
    return true;
  } catch (error) {
    console.error('Error al almacenar token:', error);
    return false;
  }
}

// Función para obtener datos de un token de restablecimiento
export async function getResetTokenData(token: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
      select: {
        id: true,
        email: true,
      },
    });
    
    return user ? { userId: user.id, email: user.email } : null;
  } catch (error) {
    console.error('Error al obtener datos del token:', error);
    return null;
  }
}

// Función para actualizar la contraseña de un usuario
export async function updateUserPassword(userId: string, hashedPassword: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    return true;
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    return false;
  }
}

// Función para crear un usuario (útil para pruebas o registro)
export async function createUser(userData: { 
  email: string; 
  password: string; 
  name: string; 
  role?: string;
}) {
  try {
    const hashedPassword = await hashPassword(userData.password);
    
    return await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        role: userData.role || 'usuario',
      },
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
}