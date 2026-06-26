import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {
  try {

    const { userId } = await auth();
          
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams =
      request.nextUrl.searchParams;

    const kind =
      searchParams.get("kind");

    const teamId =
      searchParams.get("teamId");

    const whereClause: any = {
      stock: {
        gt: 0,
      },
    };

    if (kind) {
      whereClause.categoryId =
        kind.toUpperCase();
    }

    if (teamId) {

      const normalizedTeam =
        teamId
          .replace(/-/g, " ")
          .toLowerCase();

      whereClause.team = {
        equals: normalizedTeam,
        mode: "insensitive",
      };
    }

    const products =
      await prisma.product.findMany({
        where: whereClause,

        include: {
          ProductImage: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      products,
      { status: 200 }
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