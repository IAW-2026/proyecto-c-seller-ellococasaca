import Link from "next/link";

import ReviewsGrid from "./reviews-grid";

import {
  getProductReviews,
} from "@/src/services/feedback-service";

type Props = {
  productId: string;
  page: number;
};

export default async function ReviewsContent({
  productId,
  page,
}: Props) {

  const {
    reviews,
    totalPages,
    currentPage,
  } =
    await getProductReviews(
      productId,
      page,
      5
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      <div>

        <Link
          href="/dashboard/feedback"
          className="inline-flex items-center italic uppercase gap-2 text-gray-700 hover:text-blue-600 transition-colors font-bold"
        >
          ← Volver
        </Link>

        <h1 className="mt-6 text-4xl font-black uppercase italic tracking-tight text-gray-900">
          Reseñas del producto
        </h1>

      </div>

      <ReviewsGrid
        reviews={reviews}
      />

      <div className="flex items-center justify-center gap-4">

        {currentPage > 1 && (
          <Link
            href={`?page=${currentPage - 1}`}
            className="px-4 py-2 rounded-xl bg-white border"
          >
            Anterior
          </Link>
        )}

        <span className="font-bold">
          Página {currentPage} de {totalPages}
        </span>

        {currentPage < totalPages && (
          <Link
            href={`?page=${currentPage + 1}`}
            className="px-4 py-2 rounded-xl bg-white border"
          >
            Siguiente
          </Link>
        )}

      </div>

    </div>
  );
}