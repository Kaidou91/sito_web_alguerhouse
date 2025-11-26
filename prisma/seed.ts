import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roleAdmin = await prisma.role.upsert({
    where: {name: 'admin'},
    update: {},
    create: {name: 'admin', description: 'Full access'}
  });

  await prisma.role.upsert({
    where: {name: 'editor'},
    update: {},
    create: {name: 'editor', description: 'Content management'}
  });

  const user = await prisma.user.upsert({
    where: {email: 'admin@alguer.house'},
    update: {},
    create: {
      email: 'admin@alguer.house',
      name: 'Admin',
      roleId: roleAdmin.id
    }
  });

  const suiteMare = await prisma.roomType.upsert({
    where: {code: 'SUITE_MARE'},
    update: {},
    create: {
      code: 'SUITE_MARE',
      name: {it: 'Suite Mare', en: 'Sea Suite'},
      description: {it: '50 mq, balcone sul mare'},
      capacityAdults: 3,
      capacityKids: 1,
      bedConfig: 'King + sofa',
      basePrice: 320,
      inventory: 2,
      amenities: ['Balcone', 'Vista mare'],
      images: ['https://images.unsplash.com/photo-1505761671935-60b3a7427bad']
    }
  });

  const ratePlan = await prisma.ratePlan.upsert({
    where: {code: 'FLEX_SUITE_MARE'},
    update: {},
    create: {
      code: 'FLEX_SUITE_MARE',
      name: {it: 'Flessibile Suite Mare'},
      description: {it: 'Cancellazione fino a 7 giorni'},
      roomTypeId: suiteMare.id,
      pricePerNight: 320,
      arrivalDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      checkInTime: '15:00',
      checkOutTime: '11:00'
    }
  });

  await prisma.booking.upsert({
    where: {code: 'BK-DEMO'},
    update: {},
    create: {
      code: 'BK-DEMO',
      roomTypeId: suiteMare.id,
      ratePlanId: ratePlan.id,
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      adults: 2,
      children: 0,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      totalAmount: 960,
      depositAmount: 288,
      balanceAmount: 672,
      currency: 'EUR',
      taxBreakdown: {cityTax: 10},
      extrasSelected: {parking: true},
      guestFirstName: 'Marta',
      guestLastName: 'Piras',
      guestEmail: 'guest@example.com',
      guestPhone: '+39079123456',
      userId: user.id
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
