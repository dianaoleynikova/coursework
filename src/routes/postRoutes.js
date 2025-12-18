import express from "express";
import { PostRepository } from "../repositories/postRepository.js";
import { validatePostCreate } from "../middleware/validateRequest.js";

const router = express.Router();
const postRepo = new PostRepository();

router.post("/", validatePostCreate, async (req, res, next) => {
  try {
    const {
      authorId,
      categoryId,
      title,
      content,
      excerpt,
      coverImageUrl,
      status,
      tags,
    } = req.body;

    const post = await postRepo.create(
      {
        authorId,
        categoryId,
        title,
        content,
        excerpt,
        coverImageUrl,
        status: status || "draft",
      },
      tags || []
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Validation Error",
        message: "ID must be a number",
      });
    }

    const post = await postRepo.findById(id);

    if (!post) {
      return res.status(404).json({
        error: "Not Found",
        message: `Post with ID ${id} not found`,
      });
    }

    await postRepo.incrementViewCount(id);

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const posts = await postRepo.findPublished(limit, offset);

    res.json({
      success: true,
      data: posts,
      pagination: {
        limit,
        offset,
        count: posts.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { authorId, title, content, excerpt, status, categoryId } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Validation Error",
        message: "ID must be a number",
      });
    }

    if (!authorId) {
      return res.status(400).json({
        error: "Validation Error",
        message: "authorId is required for authorization",
      });
    }

    const post = await postRepo.update(id, authorId, {
      title,
      content,
      excerpt,
      status,
      categoryId,
    });

    res.json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { authorId } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        error: "Validation Error",
        message: "ID must be a number",
      });
    }

    if (!authorId) {
      return res.status(400).json({
        error: "Validation Error",
        message: "authorId is required for authorization",
      });
    }

    await postRepo.softDelete(id, authorId);

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
