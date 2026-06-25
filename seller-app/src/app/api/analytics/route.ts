import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

const statuses: OrderStatus[] = [
  "PENDING",
  "PREPARED",
  "SHIPPED",
  "IN_TRANSIT",
  "DELIVERED",
];

export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const days = Number(searchParams.get("days") ?? "30");

    const since = new Date();
    since.setDate(since.getDate() - days);

    const [
      orders,
      revenueAgg,
      statusCounts,
      totalProducts,
      lowStockProducts,
      activeSellers,
    ] = await Promise.all([
      prisma.order.findMany({
        where: {
          sellerId: userId,
          createdAt: {
            gte: since,
          },
        },
        include: {
          OrderDetails: {
            include: {
              Product: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.order.aggregate({
        where: {
          sellerId: userId,
        },
        _sum: {
          totalPrice: true,
        },
        _count: {
          _all: true,
        },
      }),

      prisma.order.groupBy({
        by: ["status"],
        where: {
          sellerId: userId,
        },
        _count: {
          _all: true,
        },
      }),

      prisma.product.count({
        where: {
          sellerId: userId,
        },
      }),

      prisma.product.findMany({
        where: {
          sellerId: userId,
          stock: {
            lte: 5,
          },
        },
        select: {
          id: true,
          stock: true,
        },
      }),

      prisma.user.count({
        where: {
          clerkId: userId,
        },
      }),
    ]);

    const totalRevenue = revenueAgg._sum.totalPrice ?? 0;
    const totalOrders = revenueAgg._count._all ?? 0;

    const statusMap = new Map<OrderStatus, number>(
      statusCounts.map((item) => [item.status as OrderStatus, item._count._all])
    );

    const statusBreakdown = statuses.map((status) => ({
      status,
      count: statusMap.get(status) ?? 0,
    }));

    const pendingOrders = statusMap.get("PENDING") ?? 0;
    const deliveredOrders = statusMap.get("DELIVERED") ?? 0;

    const salesTrend = Array.from({ length: 7 }, (_, index) => {
      const day = new Date();
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() - (6 - index));

      const start = new Date(day);
      const end = new Date(day);
      end.setHours(23, 59, 59, 999);

      const dayOrders = orders.filter(
        (order) => order.createdAt >= start && order.createdAt <= end
      );

      return {
        date: day.toISOString().split("T")[0],
        orders: dayOrders.length,
        revenue: dayOrders.reduce((acc, order) => acc + order.totalPrice, 0),
      };
    });

    const topProductsMap = new Map<
      string,
      { id: string; title: string; unitsSold: number; revenue: number }
    >();

    orders.forEach((order) => {
      order.OrderDetails.forEach((detail) => {
        const product = detail.Product;

        if (!product) return;

        const existing = topProductsMap.get(product.id) ?? {
          id: product.id,
          title: product.title,
          unitsSold: 0,
          revenue: 0,
        };

        existing.unitsSold += detail.quantity;
        existing.revenue += detail.totalPrice ?? 0;

        topProductsMap.set(product.id, existing);
      });
    });

    const topProducts = Array.from(topProductsMap.values())
      .sort((a, b) => b.unitsSold - a.unitsSold || b.revenue - a.revenue)
      .slice(0, 5);

    const completedRevenue =
      orders
        .filter((order) => order.status === "DELIVERED")
        .reduce((acc, order) => acc + order.totalPrice, 0);

    const averageOrderValue =
      totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return NextResponse.json({
      success: true,
      rangeDays: days,
      summary: {
        totalOrders,
        totalRevenue,
        completedRevenue,
        pendingOrders,
        deliveredOrders,
        averageOrderValue,
        totalProducts,
        lowStockProducts: lowStockProducts.length,
        activeSellers: activeSellers,
      },
      statusBreakdown,
      salesTrend,
      topProducts,
    });
  } catch (error) {
    console.error("[ANALYTICS_ERROR]", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}