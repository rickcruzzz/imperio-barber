import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminHash = await bcrypt.hash("Admin@123", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@barbearia.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@barbearia.com",
      role: UserRole.ADMIN,
      passwordHash: adminHash,
    },
  });

  const barberUser = await prisma.user.upsert({
    where: { email: "barbeiro@barbearia.com" },
    update: {},
    create: {
      name: "Rafael Silva",
      email: "barbeiro@barbearia.com",
      role: UserRole.BARBER,
      passwordHash: await bcrypt.hash("Barber@123", 10),
      avatarUrl: "/uploads/barber-default.jpg",
    },
  });

  await prisma.barber.upsert({
    where: { userId: barberUser.id },
    update: {},
    create: {
      userId: barberUser.id,
      bio: "Especialista em cortes clássicos e acabamento premium.",
      specialty: "Fade e barba",
      experience: 8,
    },
  });

  await prisma.service.createMany({
    data: [
      {
        name: "Corte Premium",
        description: "Consultoria de estilo + lavagem + finalização",
        price: 75,
        durationMin: 50,
      },
      {
        name: "Barba Completa",
        description: "Desenho, navalha e hidratação",
        price: 55,
        durationMin: 40,
      },
      {
        name: "Combo Premium",
        description: "Corte premium + barba completa",
        price: 120,
        durationMin: 90,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.testimonial.createMany({
    data: [
      {
        authorName: "Marcos Lima",
        rating: 5,
        comment: "Melhor experiência que já tive em barbearia.",
      },
      {
        authorName: "Joao Andrade",
        rating: 5,
        comment: "Atendimento impecável e ambiente sofisticado.",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.gallery.createMany({
    data: [
      { title: "Ambiente Lounge", imageUrl: "/images/gallery-1.jpg" },
      { title: "Acabamento Premium", imageUrl: "/images/gallery-2.jpg" },
    ],
    skipDuplicates: true,
  });

  await prisma.promotion.create({
    data: {
      title: "Semana do Estilo",
      description: "15% OFF no combo premium de segunda a quarta.",
      discountPct: 15,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  }).catch(() => null);

  console.log("Seed concluida.", { adminId: adminUser.id });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
