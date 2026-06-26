import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const VALID_STATUSES = [
  "PREPARED",
  "SHIPPED",
  "IN_TRANSIT",
  "DELIVERED",
];

export async function PATCH(
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

    const { userId } = await auth();
  
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const body =
      await request.json();

    const { status } = body;

    if (
      !VALID_STATUSES.includes(
        status
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid status.",
        },
        {
          status: 400,
        }
      );
    }

    const order =
      await prisma.order.update({
        where: {
          externalOrderId: id,
        },

        data: {
          status,
        },
      });

    return NextResponse.json(
      {
        success: true,
        order,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "[UPDATE_ORDER_STATUS]",
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