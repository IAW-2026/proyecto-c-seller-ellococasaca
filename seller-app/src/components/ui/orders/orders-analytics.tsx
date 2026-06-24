import prisma from "@/lib/prisma";
import {
  CheckCircle,
  Clock,
  PackageCheck,
  Truck,
} from "lucide-react";

export default async function OrdersAnalytics() {

  const [
    pendingCount,
    preparedCount,
    shippedCount,
    deliveredCount
  ] = await Promise.all([

    prisma.order.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.order.count({
      where: {
        status: "PREPARED",
      },
    }),

    prisma.order.count({
      where: {
        status: {
          in: ["SHIPPED", "IN_TRANSIT"],
        },
      },
    }),

    prisma.order.count({
      where: {
        status: "DELIVERED",
      },
    }),

  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      {/* Pendientes */}
      <div className="bg-white rounded-xl uppercase italic font-black p-6 shadow-xl shadow-blue-900/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>

          <span className="text-blue-600 text-xl">
            A preparar
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900">
          {pendingCount}
        </p>
      </div>

      {/* Preparados */}
      <div className="bg-white rounded-xl uppercase italic font-black p-6 shadow-xl shadow-blue-900/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>

          <span className="text-blue-600 text-xl">
            Preparados
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900">
          {preparedCount}
        </p>
      </div>

      {/* En tránsito */}
      <div className="bg-white rounded-xl uppercase italic font-black p-6 shadow-xl shadow-blue-900/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>

          <span className="text-blue-600 text-xl">
            En tránsito
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900">
          {shippedCount}
        </p>
      </div>

      {/* Entregados */}
      <div className="bg-white rounded-xl uppercase italic font-black p-6 shadow-xl shadow-blue-900/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <PackageCheck className="w-6 h-6 text-white" />
          </div>

          <span className="text-blue-600 text-xl">
            Entregados
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900">
          {deliveredCount}
        </p>
      </div>

    </div>
  );
}