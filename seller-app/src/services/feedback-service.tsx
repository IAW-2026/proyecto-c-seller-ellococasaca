import { auth } from "@clerk/nextjs/server";

const FEEDBACK_API_URL =
  process.env.FEEDBACK_API_URL;

export async function getSellerRating(
  sellerId: string
) {
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(
    `${FEEDBACK_API_URL}/api/seller-ratings/${sellerId}`,
    {
      headers: {
        ...(token ?  { "Authorization": `Bearer ${token}` } : {}),
        "x-inter-service-secret":
          process.env.INTER_SERVICE_SECRET ?? "",
      },
      cache: "no-store",
    }
  );

if (!response.ok) {
  throw new Error("Failed to fetch seller rating.");
}

  return response.json();
}

export async function getProductReviews(
  productId: string,
  limit: number = 5,
  skip: number = 0
) {
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(
    `${FEEDBACK_API_URL}/api/reviews/product/${productId}?limit=${limit}&skip=${skip}`,
    {
      headers: {
        ...(token ?  { "Authorization": `Bearer ${token}` } : {}),
        "x-inter-service-secret":
          process.env.INTER_SERVICE_SECRET ?? "",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product reviews");
  }

  const data = await response.json();
  const take = Number(data.take ?? limit);
  const currentSkip = Number(data.skip ?? skip);
  const totalReviews = Number(data.totalReviews ?? 0);

  return {
    ...data,
    reviews: Array.isArray(data.reviews) ? data.reviews : [],
    currentPage: take > 0 ? Math.floor(currentSkip / take) + 1 : 1,
    totalPages:
      take > 0 && totalReviews > 0
        ? Math.max(1, Math.ceil(totalReviews / take))
        : 1,
  };
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