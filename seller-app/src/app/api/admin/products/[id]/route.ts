import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    await prisma.product.deleteMany({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Producto eliminado",
    });
  } catch (error) {
    console.error("[DELETE_PRODUCT_ADMIN]", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}