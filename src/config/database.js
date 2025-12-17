import { PrismaClient } from '@prisma/client';

// Singleton pattern для Prisma Client
let prisma;

export function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  return prisma;
}

export async function disconnectDatabase() {
  if (prisma) {
    await prisma.$disconnect();
  }
}

export default getPrismaClient();