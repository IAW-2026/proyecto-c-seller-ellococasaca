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

  //Revalidate paths.
  revalidatePath("/dashboard/orders");
  revalidatePath(`/dashboard/orders/${orderId}`);

}