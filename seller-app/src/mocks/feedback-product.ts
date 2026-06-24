export interface ProductFeedback {
  productId: string;
  productName: string;
  image: string;
  averageRating: number;
  totalReviews: number;
}

export const mockFeedbackProducts: ProductFeedback[] = [
  {
    productId: "1",
    productName: "Argentina Home 2022",
    image: "/placeholder-shirt.jpg",
    averageRating: 4.8,
    totalReviews: 37,
  },
  {
    productId: "2",
    productName: "Boca Retro",
    image: "/placeholder-shirt.jpg",
    averageRating: 4.9,
    totalReviews: 36,
  },
  {
    productId: "3",
    productName: "Holanda Away",
    image: "/placeholder-shirt.jpg",
    averageRating: 0,
    totalReviews: 0,
  },
];