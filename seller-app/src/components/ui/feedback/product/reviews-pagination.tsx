import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  productId: string;
};

export default function ReviewPagination({
  currentPage,
  totalPages,
  productId,
}: Props) {

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center gap-2 mt-8">

      {Array.from(
        {
          length: totalPages,
        },
        (_, index) => {

          const page =
            index + 1;

          return (
            <Link
              key={page}
              href={`/dashboard/feedback/${productId}?page=${page}`}
              className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </Link>
          );
        }
      )}

    </div>
  );
}