import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { PaymentsHeader } from "./payments-header";
import PaymentsAnalytics from "./payments-analytics";
import PaymentsGrid from "./payments-grid";

type Props = {
  searchParams?: {
    page?: string;
  };
};

export default async function PaymentsContent({
  searchParams,
}: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const PAGE_SIZE = 10;

  const currentPage = Number(
    searchParams?.page ?? "1"
  );

  const totalOrders =
    await prisma.order.count({
      where: {
        sellerId: userId,
      },
    });

  const pendingOrders =
    await prisma.order.count({
      where: {
        sellerId: userId,
        status: "PENDING",
      },
    });

  const deliveredOrders =
    await prisma.order.count({
      where: {
        sellerId: userId,
        status: "DELIVERED",
      },
    });

  const balance =
    await prisma.order.aggregate({
      where: {
        sellerId: userId,
      },

      _sum: {
        totalPrice: true,
      },
    });

  const orders =
    await prisma.order.findMany({
      where: {
        sellerId: userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      skip:
        (currentPage - 1) * PAGE_SIZE,

      take:
        PAGE_SIZE,
    });

  const totalPages =
    Math.ceil(
      totalOrders / PAGE_SIZE
    );

  return (
  <main className="min-h-screen pt-10 pb-10">

    {/* Header */}
    <div className="px-4">
      <PaymentsHeader />
    </div>

    {/* Analytics and content */}
    <div className="mx-auto px-4 space-y-8">

      <PaymentsAnalytics
        balance={
          balance._sum.totalPrice ?? 0
        }
        totalOrders={totalOrders}
        pendingOrders={pendingOrders}
        deliveredOrders={deliveredOrders}
      />

      <PaymentsGrid
        orders={orders}
        totalPages={totalPages}
        currentPage={currentPage}
      />

    </div>

  </main>
)}