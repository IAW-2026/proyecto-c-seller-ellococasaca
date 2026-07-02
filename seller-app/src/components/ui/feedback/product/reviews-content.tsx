import prisma from "@/lib/prisma";

import {
  getProductReviews,
} from "@/src/services/feedback-service";

import ReviewGrid from "./reviews-grid";
import ReviewPagination from "./reviews-pagination";

type Props = {
  productId: string;
  page: number;
};

export default async function ReviewContent({
  productId,
  page,
}: Props) {

  const PAGE_SIZE = 5;

  const safePage =
    Number.isNaN(page) || page < 1
      ? 1
      : page;

  const skip =
    (safePage - 1) * PAGE_SIZE;

  const [data, product] =
    await Promise.all([

      getProductReviews(
        productId,
        PAGE_SIZE,
        skip
      ),

      prisma.product.findUnique({
        where: {
          id: productId,
        },

        include: {
          ProductImage: true,
        },
      }),

    ]);

  return (
    <>
      <ReviewGrid
        productName={
          product?.title ??
          "Producto"
        }
        productImage={
          product?.ProductImage?.[0]?.url ??
          "/placeholder-shirt.jpg"
        }
        reviews={data.reviews}
        averageRating={
          data.averageRating
        }
        totalReviews={
          data.totalReviews
        }
      />

      <ReviewPagination
        currentPage={
          data.currentPage
        }
        totalPages={
          data.totalPages
        }
        productId={productId}
      />
    </>
  );
}