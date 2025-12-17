import dotenv from 'dotenv';
import prisma from './config/database.js';
import { UserRepository } from './repositories/userRepository.js';
import { PostRepository } from './repositories/postRepository.js';

dotenv.config();

async function main() {
  console.log('Blog Social Network Application Started');
  
  try {
    await prisma.$connect();
    console.log(' Database connected successfully');

   //usage example
    const userRepo = new UserRepository();
    const postRepo = new PostRepository();

    // Створення тестового користувача
    // const user = await userRepo.create({
    //   username: 'testuser',
    //   email: 'test@example.com',
    //   password: 'password123',
    //   fullName: 'Test User',
    // });
    // console.log('Created user:', user);

    console.log('\nApplication ready for use!');
    console.log('Use Prisma Studio to view data: npx prisma studio');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
