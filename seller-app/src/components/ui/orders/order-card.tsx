import Link from "next/link";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";
import { OrderWithDetails } from "@/src/types/order";
import PrepareOrderButton from "./prepare-order-button";

type Props = {
  order: OrderWithDetails;
};

function getStatusLabel(status: string) {
  switch (status) {
    case "PENDING":
      return "Pendiente";

    case "PREPARED":
      return "Preparado";

    case "SHIPPED":
      return "Despachado";

    case "IN_TRANSIT":
      return "En tránsito";

    case "DELIVERED":
      return "Entregado";

    default:
      return status;
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "PREPARED":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "SHIPPED":
      return <Truck className="w-5 h-5 text-blue-600" />;
    case "PENDING":
      return <Clock className="w-5 h-5 text-amber-600" />;
    case "IN_TRANSIT":
      return <Truck className="w-5 h-5 text-cyan-600" />;
    case "DELIVERED":
      return <CheckCircle className="w-5 h-5 text-green-600" />
    default:
      return <Package className="w-5 h-5 text-gray-600" />;
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case "PREPARED":
      return "bg-green-50 text-green-700 border-green-200";
    case "SHIPPED":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "PENDING":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "IN_TRANSIT":
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    case "DELIVERED":
      return "bg-green-50 text-green-700 border-green-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

export default function OrderCard(
  { order }: Props
) {

  const firstProduct = order.OrderDetails[0]?.Product;

  const totalProducts =
    order.OrderDetails.reduce(
      (acc, detail) => acc + detail.quantity,
      0
    );
  
  //Visual - not show all saleId.
  const shortId = order.id.slice(0, 8);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-gray-100">

      <div className="flex justify-between items-start gap-8">

        {/* Left panel */}
        <div className="flex items-start gap-5 flex-1">

          {/* Image */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">

            {firstProduct?.ProductImage?.[0] ? (
              <img
                src={firstProduct.ProductImage[0].url}
                alt={firstProduct.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-10 h-10 text-gray-300" />
              </div>
            )}

          </div>

          {/* Order information */}
          <div>

            <h3 className="text-3xl font-black uppercase italic text-gray-900">
              Orden de Venta
            </h3>

            <p className="text-blue-600 font-black text-xl">
              #{shortId}...
            </p>

            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-600">
                Productos
              </p>

              <div className="mt-2 space-y-1">

                {order.OrderDetails.slice(0, 2).map((detail) => (
                  <p
                    key={detail.id}
                    className="text-sm font-black text-gray-900"
                  >
                    {detail.Product.title} x{detail.quantity}
                  </p>
                ))}

                {order.OrderDetails.length > 2 && (
                  <p className="text-sm font-black text-blue-600">
                    +{order.OrderDetails.length - 2} producto
                    {order.OrderDetails.length - 2 > 1 ? "s" : ""} más
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 flex gap-12">

              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-600">
                  Productos
                </p>

                <p className="text-lg font-black text-gray-900">
                  {totalProducts}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-600">
                  Fecha
                </p>

                <p className="text-lg font-black text-gray-900">
                  {order.createdAt.toLocaleDateString("es-AR")}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-600">
                  Total
                </p>

                <p className="text-3xl font-black text-blue-600">
                  ${order.totalPrice.toLocaleString("es-AR")}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Right panel - State and buttons */}
        <div className="flex flex-col gap-4 min-w-[220px]">

          <div
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border ${getStatusStyle(
              order.status
            )}`}
          >
            {getStatusIcon(order.status)}

            <span className="font-bold uppercase">
              {getStatusLabel(order.status)}
            </span>
          </div>

          {order.status === "PENDING" && (
            <PrepareOrderButton
              orderId={order.id}
            />
          )}

          <Link
            href={`/dashboard/orders/${order.id}`}
            className="text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Ver orden
          </Link>

        </div>

      </div>
      
    </div>
  );
}