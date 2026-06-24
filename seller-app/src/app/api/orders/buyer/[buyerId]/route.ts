import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      buyerId: string;
    }>;
  }
) {

  try {

    const { buyerId } =
      await params;

    const orders =
      await prisma.order.findMany({

        where: {
          buyerId,
        },

        orderBy: {
          createdAt: "desc",
        },

        include: {
          Seller: {
            select: {
              clerkId: true,
              name: true,
              isVerified: true,
            },
          },

          OrderDetails: {
            include: {
              Product: {
                include: {
                  ProductImage: true,
                },
              },
            },
          },
        },
      });

    return NextResponse.json(
      orders,
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(
      "[GET_BUYER_ORDERS_ERROR]",
      error
    );

    return NextResponse.json(
      {
        error:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}