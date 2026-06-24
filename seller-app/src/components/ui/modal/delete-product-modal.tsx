"use client";

import { deleteProduct } from "@/src/lib/actions/delete-product";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type Props = {
  productId: string;
  onClose: () => void;
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-5 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-2xl font-bold transition-colors flex items-center gap-2">
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Eliminando...
        </>
      ) : (
        "Eliminar"
      )}
    </button>
  );
}

export default function DeleteProductModal({
  productId,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-black uppercase italic text-gray-900 mb-4">
          Eliminar camiseta
        </h2>

        <p className="text-gray-600 mb-2">
          ¿Estás seguro que deseas eliminar esta camiseta?
        </p>

        <p className="text-red-500 text-sm font-bold mb-8">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-end gap-3">
          <form action={deleteProduct}>
            <input
              type="hidden"
              name="id"
              value={productId}
            />
            <DeleteButton />
          </form>
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-2xl font-bold transition-colors">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}