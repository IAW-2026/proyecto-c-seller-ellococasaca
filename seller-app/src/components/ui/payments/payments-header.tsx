import Link from "next/link";

export function PaymentsHeader() {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-black uppercase italic tracking-tight text-gray-900">
          Historial de <span className="text-blue-600">Ventas</span>
        </h1>

        <p className="text-lg font-black uppercase text-gray-500 mt-2">
          Gestioná todas las ventas realizadas de tus productos
        </p>
      </div>
      <div className="flex items-center justify-between mb-10">
        <Link 
          href="/dashboard"
          className="inline-flex items-center italic uppercase gap-2 mb-6 text-gray-700 hover:text-blue-600 transition-colors font-bold">
          ← Volver al Dashboard
        </Link>
      </div>
    </>
  )
}