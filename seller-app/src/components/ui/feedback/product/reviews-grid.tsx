import ReviewCard from "./review-card";

type Review = {
  id: string;
  buyerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

type Props = {
  reviews: Review[];
};

export default function ReviewsGrid({
  reviews,
}: Props) {

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl shadow-blue-900/5">
        <p className="text-gray-500 font-bold uppercase italic">
          Este producto todavía no tiene reseñas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}

    </div>
  );
}