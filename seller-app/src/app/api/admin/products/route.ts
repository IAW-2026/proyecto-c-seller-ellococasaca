import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? "20")));
    const skip = (page - 1) * limit;

    const sellerId =
      searchParams.get("sellerId")?.trim() ||
      searchParams.get("seller")?.trim() ||
      undefined;

    const where = sellerId
      ? {
          sellerId,
        }
      : undefined;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
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
          User: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.product.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      products: products.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        stock: product.stock,
        sellerId: product.sellerId,
        sellerName: product.User?.name ?? product.User?.email ?? "Sin vendedor",
        category: product.Category?.name ?? "Sin categoría",
        createdAt: product.createdAt,
        deleteUrl: `/api/admin/products/${product.id}`,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[ADMIN_PRODUCTS_LIST_ERROR]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}