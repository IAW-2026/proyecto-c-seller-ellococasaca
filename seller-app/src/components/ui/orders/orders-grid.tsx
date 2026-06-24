import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OrderSection from "./order-section";

type Props = {
  params: {
    pendingPage?: string;
    preparedPage?: string;
    transitPage?: string;
    deliveredPage?: string;
  };
};

export default async function OrdersGrid(
  { params }: Props
) {
  const { userId } = await auth();

  if (!userId) {
      redirect("/sign-in");
  }

  //Define pagination.
  const PAGE_SIZE = 1;

  //Define status pages for pagination.
  const pendingPage =
    Number(params.pendingPage ?? "1");

  const preparedPage =
    Number(params.preparedPage ?? "1");

  const transitPage =
    Number(params.transitPage ?? "1");

  const deliveredPage =
    Number(params.deliveredPage ?? "1");

  //Fetch order by status.
  const pending = await prisma.order.findMany({
    where: {
      sellerId: userId,
      status: "PENDING",
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
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
    skip:
      (pendingPage - 1) * PAGE_SIZE,

    take:
      PAGE_SIZE,
  });

  const pendingCount =
  await prisma.order.count({
    where: {
      sellerId: userId,
      status: "PENDING",
    },
  });

  const prepared = await prisma.order.findMany({
    where: {
      sellerId: userId,
      status: "PREPARED",
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
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
    skip:
      (preparedPage - 1) * PAGE_SIZE,

    take:
      PAGE_SIZE,
  });

  const preparedCount =
  await prisma.order.count({
    where: {
      sellerId: userId,
      status: "PREPARED",
    },
  });

  const transit = await prisma.order.findMany({
    where: {
      sellerId: userId,
      status: {
        in: ["SHIPPED", "IN_TRANSIT"],
      }
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
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
    skip:
      (transitPage - 1) * PAGE_SIZE,

    take:
      PAGE_SIZE,
  });

  const transitCount =
  await prisma.order.count({
    where: {
      sellerId: userId,
      status: {
        in: ["SHIPPED", "IN_TRANSIT"],
      },
    },
  });

  const delivered = await prisma.order.findMany({
    where: {
      sellerId: userId,
      status: "DELIVERED",
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
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
    skip:
      (deliveredPage - 1) * PAGE_SIZE,

    take:
      PAGE_SIZE,
  });

  const deliveredCount =
  await prisma.order.count({
    where: {
      sellerId: userId,
      status: "DELIVERED",
    },
  });

  //Order status pages for different pagination.
  const pendingPages =
    Math.ceil(pendingCount / PAGE_SIZE);

  const preparedPages =
    Math.ceil(preparedCount / PAGE_SIZE);

  const transitPages =
    Math.ceil(transitCount / PAGE_SIZE);

  const deliveredPages =
    Math.ceil(deliveredCount / PAGE_SIZE);

  //Total orders count.
  const totalOrders = pendingCount + preparedCount + transitCount + deliveredCount;
  
  return (
    <>
      {totalOrders === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">
            No tienes órdenes actualmente.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <>
            <OrderSection
              title="A preparar"
              orders={pending}
              totalPages={pendingPages}
              currentPage={pendingPage}
              pageParam="pendingPage"
            />

            <OrderSection
              title="Preparados"
              orders={prepared}
              totalPages={preparedPages}
              currentPage={preparedPage}
              pageParam="preparedPage"
            />

            <OrderSection
              title="En tránsito"
              orders={transit}
              totalPages={transitPages}
              currentPage={transitPage}
              pageParam="transitPage"
            />

            <OrderSection
              title="Entregados"
              orders={delivered}
              totalPages={deliveredPages}
              currentPage={deliveredPage}
              pageParam="deliveredPage"
            />
          </>
        </div>
      )}
    </>
  );
}