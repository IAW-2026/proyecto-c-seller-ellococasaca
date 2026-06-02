'use server';

import prisma from "@/lib/prisma";
import { ProductSchema, ProductState } from "@/src/lib/schemas";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editProduct(prevState: ProductState, formData: FormData) {
  //Clerk authentication first. If not, throw an error.
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  //Validate fields.
  const validatedFields = ProductSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
    version: formData.get("version"),
    season: formData.get("season"),
    team: formData.get("team"),
    size: formData.get("size"),
  });

  //Log to check if formData is being received correctly.
  console.log(formData);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Campos incompletos. Error al crear el producto.",
    }
  }

  const { title, description, price, stock, categoryId, version, season, team, size } = validatedFields.data;

  const productId = formData.get("id") as string; // Ensure the ID is passed in the form data and is a string.

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || product.sellerId !== userId) {
      throw new Error("Producto no encontrado o no autorizado");
    }

    const updatedProduct = await prisma.product.update({
        where: {id: productId}, // Ensure the ID is passed in the form data and is a string.
        data: {
          title: title,
          description: description,
          price: price,
          stock: stock,
          categoryId: categoryId,
          version: version,
          season: season,
          team: team,
          size: size,
        }
    });
  } catch (error) {
    console.error("Update product error:", error);
    return {
      message: "Error al actualizar el producto. Por favor, inténtalo de nuevo.",
    }
  }

  //Revalidate the path to update the product list.
  revalidatePath("/dashboard/products");
  
  //Redirect to the product list page after successful creation.
  redirect("/dashboard/products");
}