import prisma from "@/lib/prisma";

import {
  auth,
} from "@clerk/nextjs/server";

import FeedbackAnalytics from "./feedback-analytics";
import FeedbackGrid from "./feedback-grid";

import {
  getSellerRating,
  getProductFeedbackSummary,
} from "@/src/services/feedback-service";

export default async function FeedbackContent() {

  const { userId } =
    await auth();

  if (!userId) {
    return null;
  }

  const products =
    await prisma.product.findMany({

      where: {
        sellerId: userId,
      },

      include: {
        ProductImage: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  const sellerRating =
    await getSellerRating(
      userId
    );

  const feedbackProducts =
    await Promise.all(

      products.map(
        async (product) => {

          const feedback =
            await getProductFeedbackSummary(
              product.id
            );

          return {

            productId:
              product.id,

            productName:
              product.title,

            image:
              product.ProductImage[0]?.url ??
              "/placeholder-shirt.jpg",

            averageRating:
              feedback.averageRating,

            totalReviews:
              feedback.totalReviews,
          };
        }
      )
    );

  const sortedProducts =
    feedbackProducts.sort(
      (a, b) =>
        b.totalReviews -
        a.totalReviews
    );

  return (
    <>
      <FeedbackAnalytics
        totalReviews={
          sellerRating.totalReviews
        }
        averageRating={
          sellerRating.averageRating
        }
      />

      <FeedbackGrid
        products={sortedProducts}
      />
    </>
  );
}