import dotenv from "dotenv";
import app from "./app.js";
import prisma from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

let server;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    server = app.listen(PORT, HOST, () => {
      console.log(`
Server is running!
        
Local:            http://localhost:${PORT}
Network:          http://${HOST}:${PORT}
        
API Documentation:
   
Health:
GET  http://localhost:${PORT}/health
   
Users (8 endpoints):
POST   http://localhost:${PORT}/api/users
GET    http://localhost:${PORT}/api/users/:id
GET    http://localhost:${PORT}/api/users
GET    http://localhost:${PORT}/api/users/search?q=query
GET    http://localhost:${PORT}/api/users/username/:username
GET    http://localhost:${PORT}/api/users/email/:email
PUT    http://localhost:${PORT}/api/users/:id
DELETE http://localhost:${PORT}/api/users/:id
   
Posts (5 endpoints):
POST   http://localhost:${PORT}/api/posts
GET    http://localhost:${PORT}/api/posts/:id
GET    http://localhost:${PORT}/api/posts
PUT    http://localhost:${PORT}/api/posts/:id
DELETE http://localhost:${PORT}/api/posts/:id
        
Environment: ${process.env.NODE_ENV || "development"}

Coverage:
UserRepository:  7/7 methods (100%)
PostRepository:  6/6 methods (100%)
      `);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

async function shutdownServer() {
  console.log("\nShutting down server...");

  if (server) {
    server.close(() => {
      console.log("HTTP server closed");
    });
  }

  await prisma.$disconnect();
  console.log("Database disconnected");

  process.exit(0);
}

process.on("SIGTERM", shutdownServer);
process.on("SIGINT", shutdownServer);

startServer();
