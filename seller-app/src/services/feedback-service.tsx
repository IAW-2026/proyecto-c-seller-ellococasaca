import {
  mockFeedbackProducts,
} from "@/src/mocks/feedback-product";

export async function getFeedbackProducts() {
  return mockFeedbackProducts;
}

export async function getProductReviews(
  productId: string,
  page: number = 1,
  pageSize: number = 5
) {

  const mockReviews = [
    {
      id: "1",
      buyerName: "Juan Pérez",
      rating: 5,
      comment: "Excelente calidad",
      createdAt: new Date(),
    },

    {
      id: "2",
      buyerName: "María Gómez",
      rating: 4,
      comment: "Muy recomendable",
      createdAt: new Date(),
    },

    {
      id: "3",
      buyerName: "Carlos López",
      rating: 5,
      comment: "Volvería a comprar",
      createdAt: new Date(),
    },
  ];

  const start =
    (page - 1) * pageSize;

  const end =
    start + pageSize;

  return {
    reviews:
      mockReviews.slice(
        start,
        end
      ),

    currentPage:
      page,

    totalPages:
      Math.ceil(
        mockReviews.length /
        pageSize
      ),
  };
}