import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type OrderItem = {
  productId: string;
  quantity: number;
};

export async function POST(
  request: Request
) {

  try {

    const body = await request.json();

    const {
      buyerId,
      items,
    }: {
      buyerId: string;
      items: OrderItem[];
    } = body;

    //Basic validations.
    if (!buyerId) {
      return NextResponse.json(
        {
          error: "buyerId is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          error: "Order must contain at least one item.",
        },
        {
          status: 400,
        }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: items.map(
            (item) => item.productId
          ),
        },
      },
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        {
          error: "One or more products do not exist.",
        },
        {
          status: 400,
        }
      );
    }

    for (const item of items) {
      //Validate quantity.
      if (item.quantity <= 0) {
        return NextResponse.json(
          {
            error:
              "Quantity must be greater than zero.",
          },
          {
            status: 400,
          }
        );
      }
      const product =
        products.find(
          (p) => p.id === item.productId
        );

      if (!product) {
        continue;
      }

      if (product.stock < item.quantity) {

        return NextResponse.json(
          {
            error:
              `Not enough stock for ${product.title}`,
          },
          {
            status: 400,
          }
        );
      }
    }

    //Get seller.
    const sellerId = products[0].sellerId;

    //Validate all products are from the same seller.
    const sameSeller = products.every(
      (product) => product.sellerId === sellerId
    );

    if (!sameSeller) {
      return NextResponse.json(
        {
          error: "All products must belong to the same seller.",
        },
        {
          status: 400,
        }
      );
    }

    //Map all the details for the order.
    const orderDetails =
      items.map((item) => {

        const product =
          products.find(
            (p) => p.id === item.productId
          );

        if (!product) {
          throw new Error(
            "Product not found."
          );
        }

        const unitPrice =
          product.price;

        const totalPrice =
          unitPrice * item.quantity;

        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice,
          totalPrice,
        };
    });

    //Calculate total price for order.
    const orderTotal =
      orderDetails.reduce(
        (acc, item) =>
          acc + item.totalPrice,
        0
      );

    //Create order and details in one transaction.
    const order =
      await prisma.$transaction(
        async (tx) => {

          for (const item of items) {

            await tx.product.update({
              where: {
                id: item.productId,
              },

              data: {
                stock: {
                  decrement:
                    item.quantity,
                },
              },
            });
          }

          return tx.order.create({
            data: {
              buyerId,
              sellerId,
              totalPrice: orderTotal,
              status: "PENDING",

              OrderDetails: {
                create: orderDetails.map(
                  (detail) => ({
                    Product: {
                      connect: {
                        id: detail.productId,
                      },
                    },

                    quantity: detail.quantity,
                    unitPrice: detail.unitPrice,
                    totalPrice: detail.totalPrice,
                  })
                ),
              },
            },

            include: {
              OrderDetails: true,
            },
          });
        }
      );

    return NextResponse.json(
      {
        success: true,
        order,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error(
      "[CREATE_ORDER_ERROR]",
      error
    );

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}