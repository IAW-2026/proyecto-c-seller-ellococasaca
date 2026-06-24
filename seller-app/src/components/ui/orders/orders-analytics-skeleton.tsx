export default function OrdersAnalyticsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5"
        >
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />

          <div className="h-10 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}

    </div>
  );
}