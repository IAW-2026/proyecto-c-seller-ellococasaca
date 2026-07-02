import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import ReviewCard from "./review-card";

type Props = {
  productName: string;
  productImage: string;

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
  productName,
  productImage,
  averageRating,
  totalReviews,
  reviews,
}: Props) {
  return (
    <>
      <Link
        href="/dashboard/feedbacks"
        className="inline-flex items-center gap-2 mb-6 text-gray-700 hover:text-blue-600 font-bold uppercase italic"
      >
        ← Volver
      </Link>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-blue-900/5 p-8 mb-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">

          <div className="relative w-40 h-40 rounded-3xl overflow-hidden bg-gray-100">
            <Image
              src={productImage}
              alt={productName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">

            <p className="text-xs uppercase tracking-[0.3em] font-black text-gray-700">
              Producto
            </p>

            <h1 className="text-5xl font-black uppercase italic tracking-tight text-gray-900 mt-2">
              {productName}
            </h1>

            <div className="flex items-center gap-4 mt-6">

              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={
                      star <= Math.round(averageRating)
                        ? "w-6 h-6 fill-yellow-400 text-yellow-400"
                        : "w-6 h-6 text-gray-300"
                    }
                  />
                ))}
              </div>

              <span className="text-3xl font-black text-blue-600">
                {averageRating.toFixed(1)}
              </span>

              <span className="uppercase font-bold text-gray-700">
                {totalReviews} reseñas
              </span>

            </div>

          </div>

        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-black uppercase italic tracking-tight text-gray-900">
          Tus <span className="text-blue-700">Reviews</span>
        </h2>
        <p className="text-lg font-black uppercase text-gray-600 mt-2">
          Gestioná todas las reviews de tus casacas y conocé la opinión de tus clientes
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.reviewId}
            review={review}
          />
        ))}
      </div>
    </>
  );
}