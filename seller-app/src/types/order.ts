import { Prisma } from "@prisma/client";

export type OrderWithDetails =
  Prisma.OrderGetPayload<{
    include: {
      OrderDetails: {
        include: {
          Product: {
            include: {
              ProductImage: true;
            };
          };
        };
      };
    };
  }>;