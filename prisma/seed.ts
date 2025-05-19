import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
  // Crear usuario administrador
  const adminPassword = await hashPassword('12345678');
  const admin = await prisma.user.upsert({
    where: { email: 'vangamarca4@gmail.com' },
    update: {},
    create: {
      email: 'vangamarca4@gmail.com',
      name: 'marco',
      password: adminPassword,
      role: 'administrador',
    },
  });

  // Crear usuario normal
  const userPassword = await hashPassword('12345678');
  const user = await prisma.user.upsert({
    where: { email: 'usuario@gmail.com' },
    update: {},
    create: {
      email: 'usuario1@gmail.com',
      name: 'Usuario Normal',
      password: 12345678,
      role: 'cobros',
    },
  });

  console.log({ admin, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });