import { PostRepository } from "../../src/repositories/postRepository.js";
import { UserRepository } from "../../src/repositories/userRepository.js";
import {
  setupTestDatabase,
  teardownTestDatabase,
  prisma,
} from "../helpers/testSetup.js";

describe("PostRepository Integration Tests", () => {
  let postRepo;
  let userRepo;
  let testUser;
  let testCategory;

  beforeAll(async () => {
    await setupTestDatabase();
    postRepo = new PostRepository();
    userRepo = new UserRepository();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  // Закоментовано очистку після кожного тесту, щоб бачити дані в Prisma Studio
  // beforeEach(async () => {
  //   testUser = await userRepo.create({
  //     username: 'postauthor',
  //     email: 'author@example.com',
  //     password: 'password123',
  //     fullName: 'Post Author',
  //   });

  //   testCategory = await prisma.category.create({
  //     data: {
  //       name: 'Technology',
  //       slug: 'technology',
  //       description: 'Tech articles',
  //     },
  //   });
  // });

  // afterEach(async () => {
  //   await prisma.postTag.deleteMany();
  //   await prisma.post.deleteMany();
  //   await prisma.tag.deleteMany();
  //   await prisma.category.deleteMany();
  //   await prisma.user.deleteMany();
  // });
});
