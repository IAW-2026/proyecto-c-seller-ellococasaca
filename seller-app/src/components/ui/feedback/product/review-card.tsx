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

  const shortId =
    review.buyerId.slice(0, 8);

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl shadow-blue-900/5">

      <div className="flex items-start justify-between">

        <div>

          <p className="font-black uppercase text-gray-900">
            Cliente {shortId}...
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {new Date(
              review.createdAt
            ).toLocaleDateString("es-AR")}
          </p>

        </div>

        <div className="flex gap-1">

          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={
                star <= review.rating
                  ? "w-5 h-5 fill-yellow-400 text-yellow-400"
                  : "w-5 h-5 text-gray-300"
              }
            />
          ))}

        </div>

      </div>

      <div className="mt-5 border-t border-gray-100 pt-5">

        <p className="text-gray-700 leading-relaxed">
          {review.comment}
        </p>

      </div>

    </div>
  );
}