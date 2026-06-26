import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

    const { id } =
      await params;

    const order =
      await prisma.order.update({
        where: {
          id,
        },

        data: {
          status: "PREPARED",
        },
      });

    /*
      Shipping integration.

      await fetch(
        `${process.env.SHIPPING_API_URL}/api/shipments/${id}/ready`,
        {
          method: "PATCH",
        }
      );
    */

    return NextResponse.json({
      success: true,
      order,
    });

  } catch (error) {

    console.error(
      "[PREPARE_ORDER_ERROR]",
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