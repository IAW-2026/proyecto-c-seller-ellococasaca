'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { deleteImage } from "./delete-images";

export async function deleteProduct(formData: FormData) {
//Clerk authentication first. If not, throw an error.
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  //Get the product ID from the form data.
  const id = formData.get("id") as string;

  //Get images associated with the product to delete them from Cloudinary.
  const product = await prisma.product.findUnique({
  where: {
      id,
    },
    include: {
      ProductImage: true,
    },
  });

  //If not found, error.
  if (!product) {
    throw new Error("Product not found");
  }
  
  //First, delete images in Cloudinary.
  for (const image of product.ProductImage) {
    await deleteImage(image.url);
  }

  await prisma.productImage.deleteMany({
    where: {
      productId: id,
    },
  });

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