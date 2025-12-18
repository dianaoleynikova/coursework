import {
  validateEmail,
  validateUsername,
  validatePassword,
  validatePostTitle,
  validatePostContent,
} from "../utils/validators.js";

export function validateUserCreate(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: "Validation Error",
      message: "username, email, and password are required",
      missing: {
        username: !username,
        email: !email,
        password: !password,
      },
    });
  }

  if (!validateUsername(username)) {
    return res.status(400).json({
      error: "Validation Error",
      message:
        "Username must be 3-50 characters, alphanumeric and underscore only",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Invalid email format",
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Password must be at least 8 characters",
    });
  }

  next();
}

export function validateUserUpdate(req, res, next) {
  const { email, username } = req.body;

  if (email && !validateEmail(email)) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Invalid email format",
    });
  }

  if (username && !validateUsername(username)) {
    return res.status(400).json({
      error: "Validation Error",
      message:
        "Username must be 3-50 characters, alphanumeric and underscore only",
    });
  }

  next();
}

export function validatePostCreate(req, res, next) {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({
      error: "Validation Error",
      message: "title, content, and authorId are required",
      missing: {
        title: !title,
        content: !content,
        authorId: !authorId,
      },
    });
  }

  if (!validatePostTitle(title)) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Title must be 5-255 characters",
    });
  }

  if (!validatePostContent(content)) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Content must be at least 10 characters",
    });
  }

  next();
}
