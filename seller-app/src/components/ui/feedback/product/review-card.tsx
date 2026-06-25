import { Star } from "lucide-react";

type Props = {
  review: {
    reviewId: string;
    buyerId: string;
    rating: number;
    comment: string;
    createdAt: string | Date;
  };
};

export default function ReviewCard({
  review,
}: Props) {

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-gray-100">

      <div className="flex items-center justify-between">

        <div>

          <p className="font-black uppercase">
            {review.buyerId}
          </p>

          <p className="text-sm text-gray-500">
            {new Date(
              review.createdAt
            ).toLocaleDateString(
              "es-AR"
            )}
          </p>

        </div>

        <div className="flex">

          {[1, 2, 3, 4, 5].map(
            (star) => (
              <Star
                key={star}
                className={
                  star <= review.rating
                    ? "w-4 h-4 fill-yellow-400 text-yellow-400"
                    : "w-4 h-4 text-gray-300"
                }
              />
            )
          )}

        </div>

      </div>

      <p className="mt-4 text-gray-700">
        {review.comment}
      </p>

    </div>
  );
}