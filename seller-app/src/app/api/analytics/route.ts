import prisma from "@/lib/prisma";
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
    // -------------------------
    // AUTH (INTER-SERVICE ONLY)
    // -------------------------
    const secret = process.env.INTER_SERVICE_SECRET;
    const secretHeader = request.headers.get("x-inter-service-secret");

    if (!secret || secretHeader !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // -------------------------
    // QUERY PARAMS
    // -------------------------
    const { searchParams } = new URL(request.url);
    const days = Number(searchParams.get("days") ?? "30");
    const sellerId = searchParams.get("sellerId")?.trim() || undefined;

    const since = new Date();
    since.setDate(since.getDate() - days);

    // -------------------------
    // BASE FILTERS
    // -------------------------
    const ordersWhere = {
      createdAt: { gte: since },
      ...(sellerId ? { sellerId } : {}),
    };

    // -------------------------
    // QUERIES
    // -------------------------
    const [
      orders,
      revenueAgg,
      statusCounts,
      totalProducts,
      lowStockProducts,
      activeSellersCount,
    ] = await Promise.all([
      prisma.order.findMany({
        where: ordersWhere,
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
        orderBy: { createdAt: "desc" },
      }),

      prisma.order.aggregate({
        where: ordersWhere,
        _sum: { totalPrice: true },
        _count: { _all: true },
      }),

      prisma.order.groupBy({
        by: ["status"],
        where: ordersWhere,
        _count: { _all: true },
      }),

      // PRODUCTS (GLOBAL - no seller dependency assumed)
      prisma.product.count(),

      prisma.product.findMany({
        where: {
          stock: { lte: 5 },
        },
        select: {
          id: true,
          stock: true,
        },
      }),

      // ACTIVE SELLERS (users with orders in period)
      prisma.user.count({
        where: {
          orders: {
            some: {
              createdAt: { gte: since },
            },
          },
        },
      }),
    ]);

    // -------------------------
    // METRICS
    // -------------------------
    const totalRevenue = revenueAgg._sum.totalPrice ?? 0;
    const totalOrders = revenueAgg._count._all ?? 0;

    const statusMap = new Map<OrderStatus, number>(
      statusCounts.map((item) => [
        item.status as OrderStatus,
        item._count._all,
      ])
    );

    const statusBreakdown = statuses.map((status) => ({
      status,
      count: statusMap.get(status) ?? 0,
    }));

    const pendingOrders = statusMap.get("PENDING") ?? 0;
    const deliveredOrders = statusMap.get("DELIVERED") ?? 0;

    const completedRevenue = orders.reduce(
      (acc, order) =>
        order.status === "DELIVERED"
          ? acc + order.totalPrice
          : acc,
      0
    );

    const averageOrderValue =
      totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // -------------------------
    // SALES TREND (7 DAYS)
    // -------------------------
    const salesTrend = Array.from({ length: 7 }, (_, index) => {
      const day = new Date();
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() - (6 - index));

      const start = new Date(day);
      const end = new Date(day);
      end.setHours(23, 59, 59, 999);

      const dayOrders = orders.filter(
        (order) =>
          order.createdAt >= start && order.createdAt <= end
      );

      return {
        date: day.toISOString().split("T")[0],
        orders: dayOrders.length,
        revenue: dayOrders.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        ),
      };
    });

    // -------------------------
    // TOP PRODUCTS
    // -------------------------
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
      .sort(
        (a, b) =>
          b.unitsSold - a.unitsSold || b.revenue - a.revenue
      )
      .slice(0, 5);

    // -------------------------
    // RESPONSE
    // -------------------------
    return NextResponse.json({
      success: true,
      rangeDays: days,
      scope: sellerId ? { sellerId } : { global: true },

      summary: {
        totalOrders,
        totalRevenue,
        completedRevenue,
        pendingOrders,
        deliveredOrders,
        averageOrderValue,
        totalProducts,
        lowStockProducts: lowStockProducts.length,
        activeSellers: activeSellersCount,
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