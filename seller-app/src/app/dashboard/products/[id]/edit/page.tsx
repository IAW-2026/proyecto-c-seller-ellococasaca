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
    include: {
      ProductImage: true,
    },
  });

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-black uppercase italic tracking-tight text-gray-900 mb-8">
            Editar <span className="text-4xl font-black uppercase italic tracking-tight text-blue-600">Casaca</span>
          </h1>
          <EditProductForm product={product} />
    </div>
  );
}