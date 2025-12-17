import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

export async function cleanDatabase() {
  // Видалити всі дані в правильному порядку (враховуючи FK)
  await prisma.notification.deleteMany();
  await prisma.commentLike.deleteMany();
  await prisma.postLike.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.postTag.deleteMany();
  await prisma.follower.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
}

export async function setupTestDatabase() {
  await cleanDatabase();
}

export async function teardownTestDatabase() {
  await cleanDatabase();
  await prisma.$disconnect();
}

export { prisma };