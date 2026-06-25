import prisma from "@/lib/prisma";
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