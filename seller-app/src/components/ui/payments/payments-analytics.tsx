import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle,
} from "lucide-react";

type Props = {
  balance: number;
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
};

const formatMoney = (
  amount: number
) =>
  new Intl.NumberFormat(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }
  ).format(amount);

export default function PaymentsAnalytics({
  balance,
  totalOrders,
  pendingOrders,
  deliveredOrders,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

      {/* Balance */}
      <div className="bg-white rounded-xl uppercase italic font-black p-6 shadow-xl shadow-blue-900/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>

          <span className="text-blue-600 text-xl">
            Balance
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900 not-italic">
          ${balance.toLocaleString("es-AR")}
        </p>
      </div>

      {/* Total ventas */}
      <div className="bg-white rounded-xl uppercase italic font-black p-6 shadow-xl shadow-blue-900/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>

          <span className="text-blue-600 text-xl">
            Ventas
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900">
          {totalOrders}
        </p>
      </div>

      {/* Pendientes */}
      <div className="bg-white rounded-xl uppercase italic font-black p-6 shadow-xl shadow-blue-900/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>

          <span className="text-blue-600 text-xl">
            Pendientes
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900">
          {pendingOrders}
        </p>
      </div>

      {/* Entregadas */}
      <div className="bg-white rounded-xl uppercase italic font-black p-6 shadow-xl shadow-blue-900/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>

          <span className="text-blue-600 text-xl">
            Entregadas
          </span>
        </div>

        <p className="text-3xl font-bold text-gray-900">
          {deliveredOrders}
        </p>
      </div>

    </div>
  );
}