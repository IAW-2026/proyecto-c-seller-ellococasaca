import ReviewContent from "@/src/components/ui/feedback/product/reviews-content";

type Props = {
  params: Promise<{
    productId: string;
  }>;

  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function ProductReviewsPage({
  params,
  searchParams,
}: Props) {

  const { productId } =
    await params;

  const page =
    Number(
      (await searchParams)?.page ??
      "1"
    );

  return (
    <main className="min-h-screen">
        <ReviewContent
          productId={productId}
          page={page}
        />
    </main>
  );
}