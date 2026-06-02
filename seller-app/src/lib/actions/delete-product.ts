'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function deleteProduct(formData: FormData) {
//Clerk authentication first. If not, throw an error.
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;
  
  //Delete product in DB.
  await prisma.product.delete({
    where: {
      id,
    },
  });

  //Revalidate the path to update the product list.
  revalidatePath("/dashboard/products");
  
  //Redirect to the product list page after successful creation.
  redirect("/dashboard/products");
}