import prisma from "@/lib/prisma";
import EditProductForm from "@/src/components/forms/update-product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-bold mb-4">EDITAR PRODUCTO</h1>
          <EditProductForm product={product} />
    </div>
  );
}