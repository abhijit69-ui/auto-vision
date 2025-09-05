// Helper function to serialize car data

import { Car } from '@prisma/client';

export const serializeCarData = (car: Car, wishlisted = false) => {
  return {
    ...car,
    price: car.price ? parseFloat(car.price.toString()) : 0,
    createdAt: car.createdAt?.toISOString(),
    updatedAt: car.updatedAt?.toISOString(),
    wishlisted: wishlisted,
  };
};
