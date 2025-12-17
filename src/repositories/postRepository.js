import prisma from '../config/database.js';
import { createSlug } from '../utils/slugify.js';

export class PostRepository {
  async create(postData, tagNames = []) {
    return prisma.$transaction(async (tx) => {
      // Генерація унікального slug
      const baseSlug = createSlug(postData.title);
      const existingPosts = await tx.post.findMany({
        where: {
          slug: {
            startsWith: baseSlug,
          },
        },
        select: { slug: true },
      });
      
      let slug = baseSlug;
      let counter = 1;
      while (existingPosts.some(p => p.slug === slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      // Створення поста
      const post = await tx.post.create({
        data: {
          title: postData.title,
          slug,
          content: postData.content,
          excerpt: postData.excerpt,
          coverImageUrl: postData.coverImageUrl,
          status: postData.status || 'draft',
          publishedAt: postData.status === 'published' ? new Date() : null,
          author: {
            connect: { id: postData.authorId },
          },
          category: postData.categoryId
            ? { connect: { id: postData.categoryId } }
            : undefined,
        },
      });

      // Обробка тегів
      if (tagNames.length > 0) {
        for (const tagName of tagNames) {
          // Пошук або створення тега
          const tag = await tx.tag.upsert({
            where: { name: tagName },
            update: {
              usageCount: {
                increment: 1,
              },
            },
            create: {
              name: tagName,
              slug: createSlug(tagName),
              usageCount: 1,
            },
          });

          // Зв'язування поста з тегом
          await tx.postTag.create({
            data: {
              postId: post.id,
              tagId: tag.id,
            },
          });
        }
      }

      // Повернення поста з тегами
      return tx.post.findUnique({
        where: { id: post.id },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              fullName: true,
              avatarUrl: true,
            },
          },
          category: true,
          postTags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });
  }

  async findById(id) {
    return prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        category: true,
        postTags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            postLikes: true,
            comments: {
              where: { deletedAt: null },
            },
          },
        },
      },
    });
  }

  async findPublished(limit = 20, offset = 0) {
    return prisma.post.findMany({
      where: {
        status: 'published',
        deletedAt: null,
      },
      take: limit,
      skip: offset,
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        category: true,
        _count: {
          select: {
            postLikes: true,
            comments: {
              where: { deletedAt: null },
            },
          },
        },
      },
    });
  }

  async update(id, authorId, updateData) {
    // Перевірка прав доступу
    const post = await prisma.post.findFirst({
      where: {
        id,
        authorId,
        deletedAt: null,
      },
    });

    if (!post) {
      throw new Error('Post not found or unauthorized');
    }

    return prisma.post.update({
      where: { id },
      data: {
        ...updateData,
        publishedAt:
          updateData.status === 'published' && !post.publishedAt
            ? new Date()
            : undefined,
        updatedAt: new Date(),
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        category: true,
      },
    });
  }

  async softDelete(id, authorId) {
    // Перевірка прав
    const post = await prisma.post.findFirst({
      where: {
        id,
        authorId,
        deletedAt: null,
      },
    });

    if (!post) {
      throw new Error('Post not found or unauthorized');
    }

    return prisma.post.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async incrementViewCount(id) {
    return prisma.post.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }
}
