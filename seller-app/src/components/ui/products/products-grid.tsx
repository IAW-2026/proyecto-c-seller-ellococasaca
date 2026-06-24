import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProductVersion } from "@prisma/client";
import ProductCard from "./product-card";

type Props = {
  params: {
    category?: string;
    version?: string;
    team?: string;
    page?: string;
  };
};

export default async function ProductsGrid(
  { params }: Props
) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  //Define pagination.
  const PAGE_SIZE = 5;

  const currentPage =
    Number(params.page ?? "1");

  const whereClause: {
    sellerId: string;
    categoryId?: string;
    version?: ProductVersion;
    team?: {
      contains: string;
      mode: "insensitive";
    };
  } = {
    sellerId: userId,
  };

  //Category filter.
  if (params.category) {
    whereClause.categoryId =
      params.category;
  }

  //Version filter.
  if (params.version) {
    whereClause.version =
      params.version as ProductVersion;
  }

  //Team filter.
  if (params.team) {
    whereClause.team = {
      contains: params.team,
      mode: "insensitive",
    };
  }

  const totalProducts =
  await prisma.product.count({
    where: whereClause,
  });

  const totalPages =
    Math.ceil(
      totalProducts / PAGE_SIZE
    );

  //Fetch products.
  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      ProductImage: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip:
    (currentPage - 1) * PAGE_SIZE,

    take:
      PAGE_SIZE,
  });

  return (
    <>
      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">
            No tienes productos creados.
          </p>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
        { /* Pagination with filters */ }
          <div className="flex justify-center gap-2 mt-10">

            {Array.from(
              { length: totalPages },
              (_, index) => {

                const page = index + 1;

                const query =
                  new URLSearchParams();

                if (params.category) {
                  query.set(
                    "category",
                    params.category
                  );
                }

                if (params.version) {
                  query.set(
                    "version",
                    params.version
                  );
                }

                if (params.team) {
                  query.set(
                    "team",
                    params.team
                  );
                }

                query.set(
                  "page",
                  page.toString()
                );

                return (
                  <a
                    key={page}
                    href={`?${query.toString()}`}
                    className={`
                      px-4 py-2 rounded-xl font-bold
                      ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 border"
                      }
                    `}
                  >
                    {page}
                  </a>
                );
              }
            )}

          </div>
        </>
      )}
    </>
  );
}