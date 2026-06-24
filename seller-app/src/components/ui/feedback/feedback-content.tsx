import FeedbackAnalytics from "./feedback-analytics";
import FeedbackGrid from "./feedback-grid";

import {
  getFeedbackProducts,
} from "@/src/services/feedback-service";

export default async function FeedbackContent() {

  const products =
    await getFeedbackProducts();

  const totalReviews =
    products.reduce(
      (acc, product) =>
        acc + product.totalReviews,
      0
    );

  const averageRating =
    totalReviews > 0
      ? products.reduce(
          (acc, product) =>
            acc +
            product.averageRating *
              product.totalReviews,
          0
        ) / totalReviews
      : 0;

  const sortedProducts =
    [...products].sort(
      (a, b) =>
        b.totalReviews -
        a.totalReviews
    );

  return (
    <>

      <FeedbackAnalytics
        totalReviews={totalReviews}
        averageRating={
          averageRating
        }
      />

      <FeedbackGrid
        products={sortedProducts}
      />

    </>
  );
}