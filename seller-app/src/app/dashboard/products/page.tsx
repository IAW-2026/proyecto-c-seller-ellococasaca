import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { deleteProduct } from "@/src/lib/actions/delete-product";

export default async function ProductsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const products = await prisma.product.findMany({
    where: {
      sellerId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Mis Productos
        </h1>

        <Link
          href="/dashboard/products/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Crear Producto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">
            No tienes productos creados.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-5 border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">
                    {product.title}
                  </h2>
                  <p className="text-green-600 font-bold text-lg">
                    ${product.price}
                  </p>
                  <p className="text-gray-600">
                    Stock: {product.stock}
                  </p>
                  <p className="text-gray-600">
                    Categoría: {product.categoryId}
                  </p>
                  <p className="text-gray-600">
                    Temporada: {product.season}
                  </p>
                  <p className="text-gray-600">
                    Equipo/Seleccion: {product.team}
                  </p>
                  <p className="text-gray-600">
                    Tamaño: {product.size}
                  </p>
                  <p className="text-gray-600">
                    Versión: {product.version}
                  </p>
                  <p className="text-gray-600">
                    Descripción: {product.description}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/products/${product.id}/edit`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Editar
                  </Link>

                  <form action={deleteProduct}>
                    <input
                      type="hidden"
                      name="id"
                      value={product.id}
                    />

                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Eliminar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}