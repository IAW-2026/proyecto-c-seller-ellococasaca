import Link from "next/link";
import { Star } from "lucide-react";
import { ProductFeedback } from "@/src/mocks/feedback-product";

type Props = {
  product: ProductFeedback;
};

function StarRating({
  rating,
}: {
  rating: number;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function FeedbackCard({
  product,
}: Props) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-gray-100">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-5">

          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-full object-cover"
            />
          </div>

          <div>

            <h3 className="text-2xl font-black uppercase italic">
              {product.productName}
            </h3>

            {product.totalReviews > 0 ? (
              <>
                <div className="flex items-center gap-2 mt-2">
                  <StarRating
                    rating={Math.round(
                      product.averageRating
                    )}
                  />
                </div>

                <div className="flex items-center gap-3 mt-2">

                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />

                  <span className="font-black text-blue-600">
                    {product.averageRating.toFixed(
                      2
                    )}
                  </span>

                  <span className="text-gray-500 uppercase">
                    {product.totalReviews} reseñas
                  </span>

                </div>
              </>
            ) : (
              <p className="mt-2 text-gray-400 font-bold uppercase italic">
                Sin valoraciones todavía
              </p>
            )}

          </div>

        </div>

        {product.totalReviews > 0 ? (
          <Link
            href={`/dashboard/feedbacks/${product.productId}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Ver reseñas
          </Link>
        ) : (
          <span className="text-gray-400 font-bold uppercase italic">
            Sin reseñas
          </span>
        )}

      </div>

    </div>
  );
}