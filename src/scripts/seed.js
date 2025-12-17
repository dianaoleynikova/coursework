import prisma from "../config/testDatabase.js";
import bcrypt from "bcrypt";

async function seed() {
  console.log(" Seeding database...");

  try {
    // Очистити БД
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

    // Створити користувачів
    const passwordHash = await bcrypt.hash("password123", 10);

    const users = await Promise.all([
      prisma.user.create({
        data: {
          username: "john_doe",
          email: "john@example.com",
          passwordHash,
          fullName: "John Doe",
          bio: "Software engineer and tech blogger",
          avatarUrl: "https://i.pravatar.cc/150?img=12",
        },
      }),
      prisma.user.create({
        data: {
          username: "jane_smith",
          email: "jane@example.com",
          passwordHash,
          fullName: "Jane Smith",
          bio: "Frontend developer and UI/UX enthusiast",
          avatarUrl: "https://i.pravatar.cc/150?img=5",
        },
      }),
      prisma.user.create({
        data: {
          username: "bob_wilson",
          email: "bob@example.com",
          passwordHash,
          fullName: "Bob Wilson",
          bio: "Data scientist and ML researcher",
          avatarUrl: "https://i.pravatar.cc/150?img=33",
        },
      }),
    ]);

    console.log(` Created ${users.length} users`);

    // Створити категорії
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: "Technology",
          slug: "technology",
          description: "Articles about technology and programming",
        },
      }),
      prisma.category.create({
        data: {
          name: "Design",
          slug: "design",
          description: "UI/UX design and visual arts",
        },
      }),
      prisma.category.create({
        data: {
          name: "Data Science",
          slug: "data-science",
          description: "Machine learning and data analysis",
        },
      }),
    ]);

    console.log(`Created ${categories.length} categories`);

    // Створити теги
    const tags = await Promise.all([
      prisma.tag.create({
        data: { name: "JavaScript", slug: "javascript", usageCount: 0 },
      }),
      prisma.tag.create({
        data: { name: "React", slug: "react", usageCount: 0 },
      }),
      prisma.tag.create({
        data: { name: "Node.js", slug: "nodejs", usageCount: 0 },
      }),
      prisma.tag.create({
        data: { name: "CSS", slug: "css", usageCount: 0 },
      }),
      prisma.tag.create({
        data: { name: "Python", slug: "python", usageCount: 0 },
      }),
      prisma.tag.create({
        data: {
          name: "Machine Learning",
          slug: "machine-learning",
          usageCount: 0,
        },
      }),
    ]);

    console.log(`Created ${tags.length} tags`);

    // Створити пости
    const posts = [];

    // Пости John Doe
    const johnPosts = await Promise.all([
      prisma.post.create({
        data: {
          authorId: users[0].id,
          categoryId: categories[0].id,
          title: "Getting Started with React Hooks",
          slug: "getting-started-with-react-hooks",
          content: `React Hooks have revolutionized the way we write React components. 
          In this article, we'll explore the basics of useState and useEffect...`,
          excerpt: "Learn the fundamentals of React Hooks",
          status: "published",
          publishedAt: new Date("2024-11-01"),
          viewCount: 150,
        },
      }),
      prisma.post.create({
        data: {
          authorId: users[0].id,
          categoryId: categories[0].id,
          title: "Building REST APIs with Node.js",
          slug: "building-rest-apis-with-nodejs",
          content: `Node.js is perfect for building REST APIs. Let's explore how to create 
          a robust API using Express and best practices...`,
          excerpt: "A comprehensive guide to Node.js APIs",
          status: "published",
          publishedAt: new Date("2024-11-15"),
          viewCount: 200,
        },
      }),
    ]);

    posts.push(...johnPosts);

    // Пости Jane Smith
    const janePosts = await Promise.all([
      prisma.post.create({
        data: {
          authorId: users[1].id,
          categoryId: categories[1].id,
          title: "Modern CSS Techniques",
          slug: "modern-css-techniques",
          content: `CSS has evolved significantly. Grid, Flexbox, and custom properties 
          have changed the game for web designers...`,
          excerpt: "Explore modern CSS features",
          status: "published",
          publishedAt: new Date("2024-11-10"),
          viewCount: 180,
        },
      }),
      prisma.post.create({
        data: {
          authorId: users[1].id,
          categoryId: categories[1].id,
          title: "UI Design Principles",
          slug: "ui-design-principles",
          content: `Good UI design is about more than just making things look pretty. 
          Let's discuss the fundamental principles...`,
          excerpt: "Core principles of UI design",
          status: "draft",
          viewCount: 0,
        },
      }),
    ]);

    posts.push(...janePosts);

    // Пости Bob Wilson
    const bobPosts = await Promise.all([
      prisma.post.create({
        data: {
          authorId: users[2].id,
          categoryId: categories[2].id,
          title: "Introduction to Machine Learning",
          slug: "introduction-to-machine-learning",
          content: `Machine Learning is transforming industries. In this beginner-friendly 
          guide, we'll cover the basics...`,
          excerpt: "ML basics for beginners",
          status: "published",
          publishedAt: new Date("2024-11-20"),
          viewCount: 250,
        },
      }),
    ]);

    posts.push(...bobPosts);

    console.log(`Created ${posts.length} posts`);

    // Додати теги до постів
    await prisma.postTag.createMany({
      data: [
        { postId: posts[0].id, tagId: tags[0].id }, // React Hooks - JavaScript
        { postId: posts[0].id, tagId: tags[1].id }, // React Hooks - React
        { postId: posts[1].id, tagId: tags[0].id }, // Node API - JavaScript
        { postId: posts[1].id, tagId: tags[2].id }, // Node API - Node.js
        { postId: posts[2].id, tagId: tags[3].id }, // CSS - CSS
        { postId: posts[4].id, tagId: tags[4].id }, // ML - Python
        { postId: posts[4].id, tagId: tags[5].id }, // ML - Machine Learning
      ],
    });

    // Оновити usageCount для тегів
    await prisma.tag.update({
      where: { id: tags[0].id },
      data: { usageCount: 3 },
    });
    await prisma.tag.update({
      where: { id: tags[1].id },
      data: { usageCount: 1 },
    });
    await prisma.tag.update({
      where: { id: tags[2].id },
      data: { usageCount: 1 },
    });
    await prisma.tag.update({
      where: { id: tags[3].id },
      data: { usageCount: 1 },
    });
    await prisma.tag.update({
      where: { id: tags[4].id },
      data: { usageCount: 1 },
    });
    await prisma.tag.update({
      where: { id: tags[5].id },
      data: { usageCount: 1 },
    });

    console.log("Added tags to posts");

    // Створити коментарі
    const comments = await Promise.all([
      prisma.comment.create({
        data: {
          postId: posts[0].id,
          authorId: users[1].id,
          content: "Great article! React Hooks really simplified my code.",
        },
      }),
      prisma.comment.create({
        data: {
          postId: posts[0].id,
          authorId: users[2].id,
          content: "Thanks for explaining useEffect so clearly!",
        },
      }),
      prisma.comment.create({
        data: {
          postId: posts[1].id,
          authorId: users[1].id,
          content: "This is exactly what I needed for my project.",
        },
      }),
    ]);

    console.log(`Created ${comments.length} comments`);

    // Створити лайки
    await prisma.postLike.createMany({
      data: [
        { userId: users[1].id, postId: posts[0].id },
        { userId: users[2].id, postId: posts[0].id },
        { userId: users[0].id, postId: posts[2].id },
        { userId: users[2].id, postId: posts[1].id },
        { userId: users[0].id, postId: posts[4].id },
        { userId: users[1].id, postId: posts[4].id },
      ],
    });

    console.log("Created post likes");

    // Створити підписки
    await prisma.follower.createMany({
      data: [
        { followerId: users[1].id, followingId: users[0].id }, // Jane follows John
        { followerId: users[2].id, followingId: users[0].id }, // Bob follows John
        { followerId: users[0].id, followingId: users[1].id }, // John follows Jane
        { followerId: users[2].id, followingId: users[1].id }, // Bob follows Jane
      ],
    });

    console.log("Created followers");

    // Створити сповіщення
    await prisma.notification.createMany({
      data: [
        {
          userId: users[0].id,
          type: "new_follower",
          relatedUserId: users[1].id,
          message: "Jane Smith started following you",
        },
        {
          userId: users[0].id,
          type: "post_like",
          relatedUserId: users[1].id,
          relatedPostId: posts[0].id,
          message:
            'Jane Smith liked your post "Getting Started with React Hooks"',
        },
        {
          userId: users[0].id,
          type: "comment",
          relatedUserId: users[1].id,
          relatedPostId: posts[0].id,
          relatedCommentId: comments[0].id,
          message: "Jane Smith commented on your post",
        },
      ],
    });

    console.log("Created notifications");

    console.log("\nDatabase seeded successfully!");
    console.log("\nSummary:");
    console.log(`   Users: ${users.length}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Tags: ${tags.length}`);
    console.log(`   Posts: ${posts.length}`);
    console.log(`   Comments: ${comments.length}`);
    console.log("\nTest credentials:");
    console.log(
      "   Email: john@example.com, jane@example.com, bob@example.com"
    );
    console.log("   Password: password123");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
