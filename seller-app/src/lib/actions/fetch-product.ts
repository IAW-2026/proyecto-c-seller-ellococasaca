"use server";

import prisma from "@/lib/prisma";

export async function fetchProduct(
  productId: string
) {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      ProductImage: true,
      Category: true,
    },
  });
}