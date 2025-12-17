import prisma from '../config/database.js';
import bcrypt from 'bcrypt';

export class UserRepository {
  async create(userData) {
    const passwordHash = await bcrypt.hash(
      userData.password,
      parseInt(process.env.BCRYPT_ROUNDS) || 10
    );

    return prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        passwordHash,
        fullName: userData.fullName,
        bio: userData.bio,
        avatarUrl: userData.avatarUrl,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        bio: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }

  async findById(id) {
    return prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        bio: true,
        avatarUrl: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async findByUsername(username) {
    return prisma.user.findFirst({
      where: {
        username,
        deletedAt: null,
      },
    });
  }

  async findByEmail(email) {
    return prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  async update(id, userData) {
    return prisma.user.update({
      where: { id },
      data: {
        ...userData,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        bio: true,
        avatarUrl: true,
        updatedAt: true,
      },
    });
  }

  async softDelete(id) {
    return prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async search(searchTerm, limit = 20) {
    return prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: searchTerm, mode: 'insensitive' } },
          { fullName: { contains: searchTerm, mode: 'insensitive' } },
        ],
        isActive: true,
        deletedAt: null,
      },
      take: limit,
      select: {
        id: true,
        username: true,
        fullName: true,
        bio: true,
        avatarUrl: true,
      },
    });
  }
}