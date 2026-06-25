"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function prepareOrder(
  orderId: string
) {

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "PREPARED",
    },
  });

  //SHIPPING INTEGRATION
  /*
  await fetch(
    `${process.env.SHIPPING_API_URL}/api/shipments/${orderId}/ready`,
    {
      method: "PATCH",
    }
  );
  */

  revalidatePath(
    "/dashboard/orders"
  );

  revalidatePath(
    `/dashboard/orders/${orderId}`
  );
}