import { Suspense } from "react";
import OrdersGrid from "@/src/components/ui/orders/orders-grid";
import OrdersGridSkeleton from "@/src/components/ui/orders/orders-grid-skeleton";
import { OrdersHeader } from "@/src/components/ui/orders/orders-header";
import OrdersAnalytics from "@/src/components/ui/orders/orders-analytics";
import OrdersAnalyticsSkeleton from "@/src/components/ui/orders/orders-analytics-skeleton";

type Props = {
  searchParams: Promise<{
    pendingPage?: string;
    preparedPage?: string;
    transitPage?: string;
    deliveredPage?: string;
  }>;
};

export default async function OrdersPage(
  { searchParams }: Props
) {

  const params = await searchParams;

  return (
    <main className="min-h-screen bg-gray-100 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <OrdersHeader />
      <Suspense
          fallback={<OrdersAnalyticsSkeleton />}
        >
          <OrdersAnalytics />
      </Suspense>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Suspense
          fallback={<OrdersGridSkeleton />}
        >
          <OrdersGrid
            params={params}
          />
        </Suspense>

      </div> 
    </main>
  )
}