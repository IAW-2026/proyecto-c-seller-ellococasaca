import ReviewContent from "@/src/components/ui/feedback/product/reviews-content";

type Props = {
  params: Promise<{
    id: string;
  }>;

  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function ProductReviewsPage({
  params,
  searchParams,
}: Props) {

  const { id } =
    await params;
  
  const page =
    Number(
      (await searchParams)?.page ??
      "1"
    );
    
  return (
    <main className="min-h-screen bg-gray-100">
        <ReviewContent
          productId={id}
          page={page}
        />
    </main>
  );
}