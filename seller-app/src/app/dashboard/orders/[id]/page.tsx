import OrderDetail from "@/src/components/ui/orders/detail/order-detail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage(
  { params }: Props
) {

  const { id } = await params;

  return (
    <main>
      <OrderDetail
        id={id}
      />
    </main>
  );
}