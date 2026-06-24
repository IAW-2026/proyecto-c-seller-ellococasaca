import { MessageSquare, Star } from "lucide-react";

type Props = {
  totalReviews: number;
  averageRating: number;
};

export default function FeedbackAnalytics({
  totalReviews,
  averageRating,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">

      {/* Total Reviews */}
      <div className="bg-white rounded-xl uppercase italic font-black p-6 shadow-xl shadow-blue-900/5">

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>

          <span className="text-blue-600 text-xl">
            Reseñas
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900">
          {totalReviews}
        </p>

      </div>

      {/* Average Rating */}
      <div className="bg-white rounded-xl uppercase italic font-black p-6 shadow-xl shadow-blue-900/5">

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>

          <span className="text-blue-600 text-xl">
            Promedio
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900">
          {averageRating.toFixed(2)}
        </p>

      </div>

    </div>
  );
}