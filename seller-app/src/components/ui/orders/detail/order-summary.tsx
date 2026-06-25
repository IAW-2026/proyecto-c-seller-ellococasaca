import { CalendarDays, Package, User } from "lucide-react";
import { OrderWithDetails } from "@/src/types/order";

type Props = {
  order: OrderWithDetails;
};

export default function OrderSummary(
  { order }: Props
) {

  const totalProducts =
    order.OrderDetails.reduce(
      (acc, detail) => acc + detail.quantity,
      0
    );
  
  const shortId = order.buyerId.slice(0, 8);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden">

      <div className="p-8">

        <div className="mb-8">
          <h1 className="text-5xl font-black uppercase italic tracking-tight text-gray-900">
            Orden
          </h1>

          <p className="text-2xl font-black text-blue-600 mt-2">
            #{order.id}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Comprador */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-blue-600" />

              <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-600">
                Comprador
              </p>
            </div>

            <p className="text-xl font-black text-gray-900">
              {shortId}...
            </p>
          </div>

          {/* Fecha */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="w-5 h-5 text-blue-600" />

              <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-600">
                Fecha
              </p>
            </div>

            <p className="text-xl font-black text-gray-900">
              {order.createdAt.toLocaleDateString("es-AR")}
            </p>
          </div>

          {/* Productos */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-blue-600" />

              <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-600">
                Productos
              </p>
            </div>

            <p className="text-xl font-black text-gray-900">
              {totalProducts}
            </p>
          </div>

          {/* Total */}
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-600 mb-2">
              Total
            </p>

            <p className="text-3xl font-black text-blue-600">
              ${order.totalPrice.toLocaleString("es-AR")}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}