import { UserRepository } from "../../src/repositories/userRepository.js";
import {
  setupTestDatabase,
  teardownTestDatabase,
  prisma,
} from "../helpers/testSetup.js";

describe("UserRepository Integration Tests", () => {
  let userRepo;

  beforeAll(async () => {
    await setupTestDatabase();
    userRepo = new UserRepository();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  // Закоментовано очистку після кожного тесту, щоб бачити дані в Prisma Studio
  // afterEach(async () => {
  //   await prisma.user.deleteMany();
  // });

  describe("create", () => {
    test("should create a new user with valid data", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        fullName: "Test User",
        bio: "This is a test bio",
      };

      const user = await userRepo.create(userData);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.username).toBe("testuser");
      expect(user.email).toBe("test@example.com");
      expect(user.fullName).toBe("Test User");
      expect(user).not.toHaveProperty("passwordHash");
    });

    test("should throw error when creating user with duplicate username", async () => {
      await userRepo.create({
        username: "testuser",
        email: "test1@example.com",
        password: "password123",
      });

      await expect(
        userRepo.create({
          username: "testuser",
          email: "test2@example.com",
          password: "password123",
        })
      ).rejects.toThrow();
    });

    test("should throw error when creating user with duplicate email", async () => {
      await userRepo.create({
        username: "testuser1",
        email: "test@example.com",
        password: "password123",
      });

      await expect(
        userRepo.create({
          username: "testuser2",
          email: "test@example.com",
          password: "password123",
        })
      ).rejects.toThrow();
    });
  });

  describe("findById", () => {
    test("should find user by id", async () => {
      const createdUser = await userRepo.create({
        username: "testuser2",
        email: "test2@example.com",
        password: "password123",
      });

      const foundUser = await userRepo.findById(createdUser.id);

      expect(foundUser).not.toBeNull();
      expect(foundUser.id).toBe(createdUser.id);
      expect(foundUser.username).toBe("testuser2");
    });

    test("should return null for non-existent user", async () => {
      const user = await userRepo.findById(999999);
      expect(user).toBeNull();
    });

    test("should not find soft-deleted user", async () => {
      const createdUser = await userRepo.create({
        username: "testuser3",
        email: "test3@example.com",
        password: "password123",
      });

      await userRepo.softDelete(createdUser.id);

      const foundUser = await userRepo.findById(createdUser.id);
      expect(foundUser).toBeNull();
    });
  });

  describe("update", () => {
    test("should update user data", async () => {
      const createdUser = await userRepo.create({
        username: "testuser4",
        email: "test4@example.com",
        password: "password123",
        fullName: "Old Name",
      });

      const updatedUser = await userRepo.update(createdUser.id, {
        fullName: "New Name",
        bio: "Updated bio",
      });

      expect(updatedUser.fullName).toBe("New Name");
      expect(updatedUser.bio).toBe("Updated bio");
      expect(updatedUser.updatedAt).toBeDefined();
    });
  });

  describe("search", () => {
    beforeEach(async () => {
      await userRepo.create({
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
        fullName: "John Doe",
      });

      await userRepo.create({
        username: "jane_smith",
        email: "jane@example.com",
        password: "password123",
        fullName: "Jane Smith",
      });

      await userRepo.create({
        username: "bob_johnson",
        email: "bob@example.com",
        password: "password123",
        fullName: "Bob Johnson",
      });
    });

    test("should search users by username", async () => {
      const results = await userRepo.search("john");

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((u) => u.username === "john_doe")).toBe(true);
    });

    test("should search users by full name", async () => {
      const results = await userRepo.search("Smith");

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((u) => u.fullName === "Jane Smith")).toBe(true);
    });

    test("should return empty array when no matches", async () => {
      const results = await userRepo.search("nonexistent");
      expect(results).toEqual([]);
    });
  });
});
