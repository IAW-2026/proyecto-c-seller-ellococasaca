export interface MockOrderItem {
  id: string;
  productId: string;
  productName: string;
  image: string;
  quantity: number;
  unitPrice: number;
}

export interface MockOrder {
  id: string;
  buyerName: string;
  buyerEmail: string;

  status:
    | "PENDING"
    | "PREPARING"
    | "SHIPPED"
    | "DELIVERED";

  createdAt: string;

  totalPrice: number;

  items: MockOrderItem[];
}

export const mockOrders: MockOrder[] = [
  {
    id: "ORD-001",

    buyerName: "Juan Pérez",
    buyerEmail: "juan@example.com",

    status: "PENDING",

    createdAt: "2026-06-18",

    totalPrice: 180000,

    items: [
      {
        id: "1",
        productId: "arg-home",
        productName: "Argentina Home 2022",
        image: "/placeholder-shirt.jpg",
        quantity: 2,
        unitPrice: 60000,
      },

      {
        id: "2",
        productId: "hol-away",
        productName: "Holanda Away",
        image: "/placeholder-shirt.jpg",
        quantity: 1,
        unitPrice: 60000,
      },
    ],
  },

  {
    id: "ORD-002",

    buyerName: "María Gómez",
    buyerEmail: "maria@example.com",

    status: "SHIPPED",

    createdAt: "2026-06-17",

    totalPrice: 95000,

    items: [
      {
        id: "3",
        productId: "boca-retro",
        productName: "Boca Retro",
        image: "/placeholder-shirt.jpg",
        quantity: 1,
        unitPrice: 95000,
      },
    ],
  },
];