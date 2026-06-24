import { ProductFeedback } from "@/src/mocks/feedback-product";
import FeedbackCard from "./feedback-card";

type Props = {
  products: ProductFeedback[];
};

export default function FeedbackGrid({
  products,
}: Props) {
  return (
    <div className="space-y-4">

      {products.map(
        (product) => (
          <FeedbackCard
            key={
              product.productId
            }
            product={product}
          />
        )
      )}

    </div>
  );
}