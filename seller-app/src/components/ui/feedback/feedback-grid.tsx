import FeedbackCard from "./feedback-card";

type ProductFeedback = {
  productId: string;
  productName: string;
  image: string;
  averageRating: number;
  totalReviews: number;
};

type Props = {
  products: ProductFeedback[];
};

export default function FeedbackGrid({
  products,
}: Props) {
  return (
    <div className="space-y-4">

      {products.map((product) => (
        <FeedbackCard
          key={product.productId}
          product={product}
        />
      ))}

    </div>
  );
}