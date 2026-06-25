import Link from "next/link";
import { OrderStatus } from "@prisma/client";

type Props = {
  order: {
    id: string;
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;
  };
};

const formatMoney = (
  amount: number
) =>
  new Intl.NumberFormat(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }
  ).format(amount);

function getStatusStyles(
  status: OrderStatus
) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-50 text-yellow-700";

    case "PREPARED":
      return "bg-blue-50 text-blue-700";

    case "SHIPPED":
    case "IN_TRANSIT":
      return "bg-purple-50 text-purple-700";

    case "DELIVERED":
      return "bg-green-50 text-green-700";

    default:
      return "bg-gray-50 text-gray-700";
  }
}

function getStatusLabel(
  status: OrderStatus
) {
  switch (status) {
    case "PENDING":
      return "A preparar";

    case "PREPARED":
      return "Preparada";

    case "SHIPPED":
    case "IN_TRANSIT":
      return "En tránsito";

    case "DELIVERED":
      return "Entregada";

    default:
      return status;
  }
}

export default function PaymentCard({
  order,
}: Props) {
  return (
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-5 shadow-xl shadow-blue-900/5 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-600">
              Orden
            </p>

            <h3 className="text-lg font-black text-gray-900">
              #{order.id.slice(0, 8)}...
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {new Date(
                order.createdAt
              ).toLocaleDateString("es-AR")}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xl font-black text-blue-600">
              {formatMoney(
                order.totalPrice
              )}
            </p>

            <span
              className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusStyles(
                order.status
              )}`}
            >
              {getStatusLabel(
                order.status
              )}
            </span>
          </div>

        </div>

      </div>

  );
}