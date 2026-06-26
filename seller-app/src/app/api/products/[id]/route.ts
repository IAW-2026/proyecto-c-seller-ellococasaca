import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } =
      await params;

    const product =
      await prisma.product.findUnique({

        where: {
          id,
        },

        include: {
          ProductImage: true,

          Category: true,

          User: {
            select: {
              clerkId: true,
              name: true,
              isVerified: true,
            },
          },
        },
      });

    if (!product) {

      return NextResponse.json(
        {
          error:
            "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      product,
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(
      "[GET_PRODUCT_ERROR]",
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