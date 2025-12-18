export function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  if (err.code === "P2002") {
    const field = err.meta?.target?.[0] || "field";
    return res.status(400).json({
      error: "Validation Error",
      message: `${field} already exists`,
      field: field,
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      error: "Not Found",
      message: "Record not found",
    });
  }

  if (err.code?.startsWith("P2")) {
    return res.status(400).json({
      error: "Database Error",
      message: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message,
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.name || "Internal Server Error",
    message: err.message || "Something went wrong",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
