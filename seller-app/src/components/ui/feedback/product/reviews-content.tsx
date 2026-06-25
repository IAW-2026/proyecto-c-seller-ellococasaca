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

  const data =
    await getProductReviews(
      productId,
      page,
      PAGE_SIZE
    );

  return (
    <>
      <ReviewGrid
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