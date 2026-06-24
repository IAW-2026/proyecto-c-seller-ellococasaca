"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import DeleteProductModal from "../modal/delete-product-modal";

type ProductCardProps = {
  product: {
    id: string;
    title: string;
    price: number;
    stock: number;
    season: string | null;
    team: string | null;
    size: string | null;
    version: string;
    ProductImage: {
      url: string;
    }[];
  };
};

export default function ProductCard({
    product,
  }: ProductCardProps) {

  const [openModal, setOpenModal] = useState(false);

  const outOfStock = product.stock === 0;

  const lowStock = product.stock > 0 && product.stock <= 3;

  return (
    <>
      <div className={`rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/10
          ${
            outOfStock
              ? "bg-red-50 border-2 border-red-300"
              : lowStock
                ? "bg-yellow-50 border-2 border-yellow-300"
                : "bg-white border border-gray-100"
          }
        `}>
        <div className="p-6">
          <Link href={`/dashboard/products/${product.id}`}>
            <Image
              src={
                product.ProductImage.length > 0
                  ? product.ProductImage[0].url
                  : "/placeholder-shirt.jpg"
              }
              alt={product.title}
              width={400}
              height={400}
              className="object-cover"
            />

            <h2 className="mt-4 text-2xl font-black uppercase italic tracking-tight text-gray-900">
              {product.title}
            </h2>

            <div className="flex gap-2 mt-3">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                TALLE/SIZE: {product.size ?? "N/A"}
              </span>

              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                {product.version}
              </span>
            </div>

            <p className="mt-4 text-2xl font-black text-blue-600">
              ${product.price}
            </p>

            {outOfStock && (
              <div className="mt-3">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase">
                  Sin Stock
                </span>
              </div>
            )}

            {lowStock && (
              <div className="mt-3">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase">
                  Poco Stock
                </span>
              </div>
            )}

            <p className={`mt-4 text-1xl font-black uppercase italic tracking-tight
                ${
                  outOfStock
                    ? "text-red-600"
                    : lowStock
                      ? "text-yellow-600"
                      : "text-gray-500"
                }
              `}
            >
              Stock disponible: {product.stock}
            </p>

            <p className="mt-4 text-1xl font-black uppercase italic tracking-tight text-gray-500">
              Temporada/Season: {product.season ?? "N/A"}
            </p>

            <p className="mt-4 text-1xl font-black uppercase italic tracking-tight text-gray-500">
              Equipo: {product.team ?? "N/A"}
            </p>
          </Link>

          <div className="flex justify-center gap-3 mt-6">
            <Link
              href={`/dashboard/products/${product.id}/edit`}
              className="bg-blue-600 text-white rounded-2xl px-4 py-3 font-bold text-sm text-center hover:bg-blue-700 transition-colors"
            >
              <Pencil />
            </Link>

            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="bg-red-50 text-red-600 border border-red-200 rounded-2xl px-4 py-3 font-bold text-sm hover:bg-red-600 hover:text-white transition-colors"
            >
              <Trash2 />
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <DeleteProductModal
          productId={product.id}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}