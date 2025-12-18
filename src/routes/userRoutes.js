import express from "express";
import { UserRepository } from "../repositories/userRepository.js";
import {
  validateUserCreate,
  validateUserUpdate,
} from "../middleware/validateRequest.js";

const router = express.Router();
const userRepo = new UserRepository();

// ========== POST /api/users - Створити користувача ==========
router.post("/", validateUserCreate, async (req, res, next) => {
  try {
    const { username, email, password, fullName, bio, avatarUrl } = req.body;

    const user = await userRepo.create({
      username,
      email,
      password,
      fullName,
      bio,
      avatarUrl,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// ========== GET /api/users/search?q=query - Пошук користувачів ==========
router.get("/search", async (req, res, next) => {
  try {
    const query = req.query.q || "";
    const limit = parseInt(req.query.limit) || 20;

    const users = await userRepo.search(query, limit);

    res.json({
      success: true,
      data: users,
      query: query,
      count: users.length,
    });
  } catch (error) {
    next(error);
  }
});

// ========== GET /api/users/username/:username - Пошук за username ==========
router.get("/username/:username", async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await userRepo.findByUsername(username);

    if (!user) {
      return res.status(404).json({
        error: "Not Found",
        message: `User with username "${username}" not found`,
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// ========== GET /api/users/email/:email - Пошук за email ==========
router.get("/email/:email", async (req, res, next) => {
  try {
    const { email } = req.params;

    const user = await userRepo.findByEmail(email);

    if (!user) {
      return res.status(404).json({
        error: "Not Found",
        message: `User with email "${email}" not found`,
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// ========== GET /api/users/:id - Отримати користувача ==========
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Validation Error",
        message: "ID must be a number",
      });
    }

    const user = await userRepo.findById(id);

    if (!user) {
      return res.status(404).json({
        error: "Not Found",
        message: `User with ID ${id} not found`,
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// ========== GET /api/users - Список користувачів ==========
router.get("/", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    // Використовуємо search з порожнім query для отримання всіх користувачів
    const users = await userRepo.search("", limit);

    res.json({
      success: true,
      data: users,
      pagination: {
        limit,
        offset,
        count: users.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ========== PUT /api/users/:id - Оновити користувача ==========
router.put("/:id", validateUserUpdate, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Validation Error",
        message: "ID must be a number",
      });
    }

    const { fullName, bio, avatarUrl } = req.body;

    const user = await userRepo.update(id, {
      fullName,
      bio,
      avatarUrl,
    });

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// ========== DELETE /api/users/:id - Видалити користувача (soft) ==========
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Validation Error",
        message: "ID must be a number",
      });
    }

    await userRepo.softDelete(id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
