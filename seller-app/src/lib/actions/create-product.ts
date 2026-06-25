'use server';

import prisma from "@/lib/prisma";
import { ProductSchema, ProductState } from "@/src/lib/schemas";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "./upload-images";

export async function createProduct(prevState: ProductState, formData: FormData) {
  //Clerk authentication first. If not, throw an error.
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  //IMPORTANT - Used only for second validations.
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  const email =
    clerkUser.emailAddresses[0]?.emailAddress ?? null;

  const name = [clerkUser.firstName, clerkUser.lastName]
    .filter(Boolean)
    .join(" ")
    .trim() || null;

  await prisma.user.upsert({
    where: { clerkId: userId },
    update: { email, name },
    create: {
      clerkId: userId,
      email,
      name,
    },
  });

  console.log(userId);

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

  //Get all image files from the form data.
  const imageFiles = formData.getAll("images") as File[];
  console.log("Images: ", imageFiles.length);

  for (const file of imageFiles) {
    console.log(
      `Processing file: ${file.name}, 
      size: ${file.size}, 
      type: ${file.type}`
    );
  }

  //Create product in DB.
  try {
      const product = await prisma.product.create({
      data: {
        id: crypto.randomUUID(),
        title,
        description,
        price,
        stock,
        categoryId,
        version,
        season,
        team,
        size,
        sellerId: userId,
      },
    });
    //Product created, now we can upload images and associate them with the product.
    for (const file of imageFiles) {
      if (file.size === 0) continue;

      console.log("Uploading:", file.name);

      const imageUrl = await uploadImage(
        file,
        product.id
      );

      await prisma.productImage.create({
        data: {
          id: crypto.randomUUID(),
          url: imageUrl,
          productId: product.id,
        },
      });
    }
    //Product and images created successfully.
    console.log("Producto creado exitosamente");
  } catch (error) {
    console.error("Create product error:", error);
    return {
      message: "Error al crear el producto. Por favor, inténtalo de nuevo.",
    }
  }

  //Revalidate the path to update the product list.
  revalidatePath("/dashboard/products");
  
  //Redirect to the product list page after successful creation.
  redirect("/dashboard/products");
}