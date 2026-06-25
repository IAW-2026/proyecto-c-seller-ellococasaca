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
    const page = Number(searchParams.get("page") ?? "1");
    const limit = Math.min(50, Number(searchParams.get("limit") ?? "20"));
    const skip = (page - 1) * limit;

    const [sellers, total] = await Promise.all([
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
        skip,
        take: limit,
      }),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      success: true,
      sellers: sellers.map((seller) => ({
        id: seller.clerkId,
        name: seller.name ?? seller.email,
        email: seller.email,
        isVerified: seller.isVerified,
        createdAt: seller.createdAt,
        productsCount: seller._count.Product,
        ordersCount: seller._count.orders,
        deleteUrl: `/api/admin/sellers/${seller.clerkId}`,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[ADMIN_SELLERS_LIST_ERROR]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}