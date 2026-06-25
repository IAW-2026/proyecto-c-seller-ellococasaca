import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await currentUser();
    
    const role =
        typeof user?.publicMetadata?.role === "string"
        ? user.publicMetadata.role
        : undefined;

    const isAdmin =
        role === "admin" ||
        role === "ADMIN" ||
        user?.publicMetadata?.isAdmin === true;

    if (!isAdmin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const days = Number(searchParams.get("days") ?? "30");

    const since = new Date();
    since.setDate(since.getDate() - days);

    const [
      sellers,
      products,
      orders,
      totalRevenueAgg,
      statusCounts,
      lowStockProducts,
      verifiedSellers,
    ] = await Promise.all([
      prisma.user.findMany({
        select: {
          clerkId: true,
          name: true,
          email: true,
          isVerified: true,
          createdAt: true,
          _count: {
            select: {
              Product: true,
              orders: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      }),

      prisma.product.findMany({
        select: {
          id: true,
          title: true,
          price: true,
          stock: true,
          createdAt: true,
          sellerId: true,
          Category: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      }),

      prisma.order.findMany({
        where: {
          createdAt: {
            gte: since,
          },
        },
        include: {
          OrderDetails: {
            include: {
              Product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
      }),

      prisma.order.aggregate({
        _sum: {
          totalPrice: true,
        },
        _count: {
          _all: true,
        },
      }),

      prisma.order.groupBy({
        by: ["status"],
        _count: {
          _all: true,
        },
      }),

      prisma.product.findMany({
        where: {
          stock: {
            lte: 5,
          },
        },
        select: {
          id: true,
          title: true,
          stock: true,
          price: true,
          sellerId: true,
        },
        orderBy: {
          stock: "asc",
        },
        take: 10,
      }),

      prisma.user.count({
        where: {
          isVerified: true,
        },
      }),
    ]);

    const totalRevenue = totalRevenueAgg._sum.totalPrice ?? 0;
    const totalOrders = totalRevenueAgg._count._all ?? 0;

       const statusMap = new Map<OrderStatus, number>(
  statusCounts.map((item) => [item.status, item._count._all])
);

const statuses: OrderStatus[] = [
  "PENDING",
  "PREPARED",
  "SHIPPED",
  "IN_TRANSIT",
  "DELIVERED",
];

const statusBreakdown = statuses.map((status) => ({
  status,
  count: statusMap.get(status) ?? 0,
}));

const pendingOrders = statusMap.get("PENDING" as OrderStatus) ?? 0;
const deliveredOrders = statusMap.get("DELIVERED" as OrderStatus) ?? 0;

    return NextResponse.json({
      success: true,
      rangeDays: days,
      summary: {
        totalSellers: sellers.length,
        verifiedSellers,
        totalProducts: products.length,
        totalOrders,
        totalRevenue,
        pendingOrders,
        deliveredOrders,
        lowStockProducts: lowStockProducts.length,
      },
      sellers: sellers.map((seller) => ({
        id: seller.clerkId,
        name: seller.name ?? seller.email,
        email: seller.email,
        isVerified: seller.isVerified,
        createdAt: seller.createdAt,
        productsCount: seller._count.Product,
        ordersCount: seller._count.orders,
      })),
      products: products.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        stock: product.stock,
        sellerId: product.sellerId,
        category: product.Category?.name ?? "Sin categoría",
        createdAt: product.createdAt,
      })),
      orders: orders.map((order) => ({
        id: order.id,
        sellerId: order.sellerId,
        buyerId: order.buyerId,
        totalPrice: order.totalPrice,
        status: order.status,
        createdAt: order.createdAt,
      })),
      lowStockProducts,
      statusBreakdown,
    });
  } catch (error) {
    console.error("[ADMIN_ANALYTICS_ERROR]", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}