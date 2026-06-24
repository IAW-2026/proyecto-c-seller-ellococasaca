import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

import OrderSummary from "./order-summary";
import OrderProducts from "./order-product";

type Props = {
  id: string;
};

export default async function OrderDetail(
  { id }: Props
) {

  const order = await prisma.order.findUnique({
    where: {
        id,
    },
        include: {
            Seller: true,

            OrderDetails: {
            include: {
                Product: {
                include: {
                    ProductImage: true,
                },
                },
            },
            },
        },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="flex items-center justify-between mb-6">
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center italic uppercase gap-2 text-gray-700 hover:text-blue-600 transition-colors font-bold"
        >
          ← Volver a órdenes
        </Link>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">

        <OrderSummary order={order} />

          <div className="space-y-6 mt-8">
          {order.OrderDetails.map((detail) => (
              <OrderProducts
              key={detail.id}
              detail={detail}
              />
          ))}
          </div>

      </div>

    </div>
  );
}