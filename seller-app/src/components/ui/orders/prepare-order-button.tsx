"use client";

import { useTransition } from "react";
import { prepareOrder } from "@/src/lib/actions/prepare-order";

type Props = {
  orderId: string;
};

export default function PrepareOrderButton(
  { orderId }: Props
) {

  const [isPending, startTransition] =
    useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await prepareOrder(orderId);
        })
      }
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
    >
      {isPending
        ? "Preparando..."
        : "Preparar pedido"}
    </button>
  );
}