import { PrismaClient, AppointmentType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const vendor1 = await prisma.vendor.create({
    data: {
      name: 'Vendor A',
    },
  });

  const vendor2 = await prisma.vendor.create({
    data: {
      name: 'Vendor B',
    },
  });

  const buyer1 = await prisma.buyer.create({
    data: {
      name: 'Buyer X',
      companyName: 'Company X',
    },
  });

  const buyer2 = await prisma.buyer.create({
    data: {
      name: 'Buyer Y',
      companyName: 'Company Y',
    },
  });

  await prisma.appointment.createMany({
    data: [
      {
        title: 'Meeting with Buyer X',
        type: AppointmentType.PHYSICAL,
        location: 'Conference Room 1',
        startTime: new Date('2024-09-10T09:00:00Z'),
        endTime: new Date('2024-09-10T10:00:00Z'),
        hostId: vendor1.id,
        clientId: buyer1.id,
      },
      {
        title: 'Virtual Consultation with Buyer Y',
        type: AppointmentType.VIRTUAL,
        startTime: new Date('2024-09-10T11:00:00Z'),
        endTime: new Date('2024-09-10T12:00:00Z'),
        hostId: vendor2.id,
        clientId: buyer2.id,
      },
      {
        title: 'Follow-up with Buyer X',
        type: AppointmentType.PHYSICAL,
        location: 'Conference Room 2',
        startTime: new Date('2024-09-11T14:00:00Z'),
        endTime: new Date('2024-09-11T15:00:00Z'),
        hostId: vendor1.id,
        clientId: buyer1.id,
      },
    ],
  });

  console.log('Seed data inserted successfully!');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
