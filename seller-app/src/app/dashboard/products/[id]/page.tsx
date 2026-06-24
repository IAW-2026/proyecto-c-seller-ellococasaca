import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchProduct } from "@/src/lib/actions/fetch-product";
import Link from "next/link";
import { Pencil } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage(
  { params }: Props
) {
    //Fetch product ID to get the product info.
    const { id } = await params;

    const product = await fetchProduct(id);

    //If not found, throw notFound().
    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex items-center justify-between mb-6">
                <Link 
                    href="/dashboard/products"
                    className="inline-flex items-center italic uppercase gap-2 mb-6 text-gray-700 hover:text-blue-600 transition-colors font-bold">
                    ← Volver a tus productos
                </Link>
                <Link
                    href={`/dashboard/products/${product.id}/edit`}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 uppercase italic font-black text-white px-4 py-2 rounded-lg">
                    <Pencil/>
                    Editar
                </Link>
            </div>
            <div
                className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Product image */}
                    <div>
                        <Image
                        src={
                            product.ProductImage.length > 0
                            ? product.ProductImage[0].url
                            : "/placeholder-shirt.jpg"
                        }
                        alt={product.title}
                        width={800}
                        height={800}
                        className="object-cover"
                        />
                    </div>
                    {/* Product information */}
                    <div>
                        <h1 className="text-5xl font-black uppercase italic tracking-tight text-gray-900">
                        {product.title}
                        </h1>
                        <p className="text-4xl font-black text-blue-600">
                        ${product.price}
                        </p>
                        <div className="grid grid-cols-2 gap-6 space-y-2 text-gray-700">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                                    Stock
                                </p>
                                <p className="mt-1 text-xl font-black text-gray-900">
                                    <strong>Stock:</strong>{" "} {product.stock}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                                    Team
                                </p>
                                <p className="mt-1 text-xl font-black text-gray-900">
                                    {product.team || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                                    Season
                                </p>
                                <p className="mt-1 text-xl font-black text-gray-900">
                                    {product.season || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                                    Size
                                </p>
                                <p className=" mt-1 text-xl font-black text-gray-900">
                                    {product.size || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                                    Category
                                </p>
                                <p className="mt-1 text-xl font-black text-gray-900">
                                    {product.Category?.name || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                                    Versión
                                </p>
                                <p className="inline-block w-fit bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.25em]">
                                    {product.version}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                                    Descripción
                                </p>
                                <p className="mt-1 text-xl font-black text-gray-900">
                                    {product.description ||
                                    "Este producto no posee descripción."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}