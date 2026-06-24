import { Star } from "lucide-react";

type Props = {
  review: {
    id: string;
    buyerName: string;
    rating: number;
    comment: string;
    createdAt: Date;
  };
};

export default function ReviewCard({
  review,
}: Props) {

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl shadow-blue-900/5 border border-gray-100">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-black uppercase italic text-gray-900">
            {review.buyerName}
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            {new Date(
              review.createdAt
            ).toLocaleDateString(
              "es-AR"
            )}
          </p>

        </div>

        <div className="flex items-center gap-1">

          {Array.from({
            length: 5,
          }).map((_, index) => (

            <Star
              key={index}
              className={`w-5 h-5 ${
                index < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />

          ))}

        </div>

      </div>

      <div className="mt-4">

        <p className="text-gray-700">
          {review.comment}
        </p>

      </div>

    </div>
  );
}