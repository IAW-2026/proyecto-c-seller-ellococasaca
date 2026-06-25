const FEEDBACK_API_URL =
  process.env.FEEDBACK_API_URL;

export async function getSellerRating(
  sellerId: string
) {
  const response = await fetch(
    `${FEEDBACK_API_URL}/api/seller-ratings/${sellerId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch seller rating"
    );
  }

  return response.json();
}

export async function getProductReviews(
  productId: string,
  limit: number = 5,
  skip: number = 0
) {
  const response = await fetch(
    `${FEEDBACK_API_URL}/api/reviews/product/${productId}?limit=${limit}&skip=${skip}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch product reviews"
    );
  }

  return response.json();
}

export async function getProductFeedbackSummary(
  productId: string
) {
  try {

    const data =
      await getProductReviews(
        productId,
        1,
        0
      );

    return {
      averageRating:
        data.averageRating ?? 0,

      totalReviews:
        data.totalReviews ?? 0,
    };

  } catch {

    return {
      averageRating: 0,
      totalReviews: 0,
    };
  }
}