import ReviewCard from "./review-card";

import Link from "next/link";
import { Star } from "lucide-react";

type Props = {
  averageRating: number;
  totalReviews: number;

  reviews: {
    reviewId: string;
    buyerId: string;
    rating: number;
    comment: string;
    createdAt: string | Date;
  }[];
};

export default function ReviewGrid({
  averageRating,
  totalReviews,
  reviews,
}: Props) {

  return (
    <>
      <div className="mb-10">

        <h1 className="text-4xl bg-gray-100 font-black uppercase italic tracking-tight text-gray-900">
          Reseñas del
          <span className="text-blue-600">
            {" "}Producto
          </span>
        </h1>

        <div className="flex items-center gap-3 mt-4">

          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />

          <span className="text-2xl font-black text-blue-600">
            {averageRating.toFixed(1)}
          </span>

          <span className="text-gray-600 uppercase font-bold">
            {totalReviews} reseñas
          </span>

        </div>

      </div>

      <div className="flex items-center justify-between mb-8">

        <Link
          href="/dashboard/feedbacks"
          className="inline-flex items-center italic uppercase gap-2 text-gray-700 hover:text-blue-600 font-bold"
        >
          ← Volver
        </Link>

      </div>

      <div className="space-y-4">

        {reviews.map(
          (review) => (
            <ReviewCard
              key={
                review.reviewId
              }
              review={review}
            />
          )
        )}

      </div>
    </>
  );
}