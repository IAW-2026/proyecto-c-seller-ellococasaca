import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const products =
      await prisma.product.findMany({

        where: {
          stock: {
            gt: 0,
          },
        },

        include: {
          ProductImage: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      products,
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(
      "[GET_PRODUCTS_ERROR]",
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