import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.business(),
      Rooms: {
        create: [
          {
            name: faker.name.firstName(),
            capacity: 5,
          },
          {
            name: faker.name.firstName(),
            capacity: 3,
          },
        ],
      },
    },
  });
}