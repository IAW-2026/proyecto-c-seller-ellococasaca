"use client";

import { RefreshCw } from "lucide-react";
import Link from "next/link";

export function FeedbackHeader() {

  return (
    <>
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-4xl font-black uppercase italic tracking-tight text-gray-900">
          Tus <span className="text-blue-600">Reseñas</span>
        </h1>

        <p className="text-lg font-black uppercase text-gray-600 mt-2">
          Gestioná todas las reseñas de tus casacas
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center italic uppercase gap-2 mb-6 text-gray-700 hover:text-blue-600 transition-colors font-bold"
        >
          ← Volver al Dashboard
        </Link>

        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </button>
      </div>
    </>
  );
}