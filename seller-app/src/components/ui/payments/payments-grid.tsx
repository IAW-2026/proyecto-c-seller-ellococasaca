import PaymentCard from "./payments-card";
import { Order } from "@prisma/client";

type Props = {
  orders: Order[];
  totalPages: number;
  currentPage: number;
};

export default function PaymentsGrid({
  orders,
  totalPages,
  currentPage,
}: Props) {
  return (
    <section className="space-y-6">

      <div className="flex items-center gap-4">

        <h2 className="text-2xl font-black uppercase italic text-gray-900">
          Historial de Ventas
        </h2>

        <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-black">
          {orders.length}
        </span>

      </div>

      <div className="space-y-4">

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-gray-100">
            <p className="text-gray-500 font-bold italic uppercase">
              Todavía no tenés ventas.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <PaymentCard
              key={order.id}
              order={order}
            />
          ))
        )}

      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">

          {Array.from(
            { length: totalPages },
            (_, index) => {

              const page =
                index + 1;

              return (
                <a
                  key={page}
                  href={`?page=${page}`}
                  className={`
                    px-4 py-2 rounded-xl font-bold
                    ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white border text-gray-700"
                    }
                  `}
                >
                  {page}
                </a>
              );
            }
          )}

        </div>
      )}

    </section>
  );
}