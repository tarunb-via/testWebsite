import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Seed a test user: student@pottery.com / pottery123
const email = 'student@pottery.com';
const password = 'pottery123';
const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

async function main() {
  console.log('Starting seed...');

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
    },
  });

  console.log(`Seed completed! User: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });