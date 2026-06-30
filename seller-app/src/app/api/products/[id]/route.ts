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
    const secret = process.env.INTER_SERVICE_SECRET;
    const secretHeader = request.headers.get("x-inter-service-secret");

    if (!secret || secretHeader !== secret) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

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