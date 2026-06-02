import { z } from "zod";

export type ProductState = {
    errors?: {
        title?: string[];
        description?: string[];
        price?: string[];
        stock?: string[];
        categoryId?: string[];
        version?: string[];
        season?: string[];
        team?: string[];
        size?: string[];
    };
    message?: string | null;
}

export const ProductSchema = z.object({
  title: z.string().trim().min(1, "Por favor, ingresa un título para el producto."),
  description: z.string().optional(), //Optional.
  price: z.coerce.number().positive("El número debe ser mayor que cero."),
  stock: z.coerce.number().int().nonnegative("El número debe ser un entero no negativo."),
  categoryId: z.string().optional(), //Optional.
  version: z.enum(["RETRO", "HOME", "AWAY"]),
  season: z.string().optional(),
  team: z.string().optional(),
  size: z.string().optional(),
  createdAt: z.date().optional(),
});