import Image from "next/image";
import { OrderWithDetails } from "@/src/types/order";

type Props = {
  detail: OrderWithDetails["OrderDetails"][number];
};

export default function OrderProduct(
  { detail }: Props
) {
  const product = detail.Product;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
      <div className="grid md:grid-cols-[180px_1fr] gap-6 p-6">

        {/* Imagen */}
        <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={
              product.ProductImage.length > 0
                ? product.ProductImage[0].url
                : "/placeholder-shirt.jpg"
            }
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Información */}
        <div className="flex flex-col justify-between">

          <div>
            <h3 className="text-3xl font-black uppercase italic tracking-tight text-gray-900">
              {product.title}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                  Equipo
                </p>

                <p className="mt-1 text-lg font-black text-gray-900">
                  {product.team || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                  Temporada
                </p>

                <p className="mt-1 text-lg font-black text-gray-900">
                  {product.season || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                  Talle
                </p>

                <p className="mt-1 text-lg font-black text-gray-900">
                  {product.size || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                  Versión
                </p>

                <span className="inline-block mt-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-[0.25em]">
                  {product.version}
                </span>
              </div>

            </div>
          </div>

          {/* Resumen */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                Cantidad
              </p>

              <p className="text-2xl font-black text-gray-900">
                x{detail.quantity}
              </p>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                Precio unitario
              </p>

              <p className="text-2xl font-black text-gray-900">
                ${product.price.toLocaleString("es-AR")}
              </p>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                Subtotal
              </p>

              <p className="text-3xl font-black text-blue-600">
                ${detail.totalPrice.toLocaleString("es-AR")}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}