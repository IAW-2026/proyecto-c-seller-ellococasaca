import Link from "next/link";
import { PackagePlus } from "lucide-react";
import { Suspense } from "react";
import ProductsGrid from "@/src/components/ui/products/products-grid";
import ProductsGridSkeleton from "@/src/components/ui/products/products-grid-skeleton";

type Props = {
  searchParams: Promise<{
    category?: string;
    version?: string;
    team?: string;
    page?: string;
  }>;
};

export default async function ProductsPage(
  { searchParams }: Props
) {

  const params = await searchParams;
  return (
    <main>
      <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-black uppercase italic tracking-tight text-gray-900 mb-8">
          Mis <span className="text-4xl font-black uppercase italic tracking-tight text-blue-600">Casacas</span>
      </h1>
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/dashboard"
          className="inline-flex items-center italic uppercase gap-2 mb-6 text-gray-700 hover:text-blue-600 transition-colors font-bold">
          ← Volver al Dashboard
        </Link>
        <Link
          href="/dashboard/products/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 uppercase italic font-black text-white px-4 py-2 rounded-lg">
          <PackagePlus/>
          Agregar
        </Link>
      </div>
      <form className="mb-8 bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-gray-500">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label 
              htmlFor="category"
              className="block text-xs font-black uppercase tracking-[0.25em] text-gray-600 mb-2">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              defaultValue={params.category || ""}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 bg-white">
              <option value="">
                Elegir categoría
              </option>
              <option value="CLUB">
                Club
              </option>
              <option value="SELECCION">
                Selección
              </option>
            </select>
          </div>
          <div>
            <label 
              htmlFor="version"
              className="block text-xs font-black uppercase tracking-[0.25em] text-gray-600 mb-2">
              Versión
            </label>
            <select
              id="version"
              name="version"
              defaultValue={params.version || ""}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 bg-white">
              <option value="">
                Elegir versión
              </option>
              <option value="HOME">
                Titular
              </option>
              <option value="AWAY">
                Visitante
              </option>
              <option value="RETRO">
                Retro
              </option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-[0.25em] text-gray-600 mb-2">
              Equipo
            </label>
            <input
              type="text"
              name="team"
              defaultValue={params.team || ""}
              placeholder="Inserte el equipo."
              className="w-full rounded-2xl border border-gray-200 px-4 py-3"/>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-3 font-bold transition-colors">
              Filtrar
            </button>
            <a
              href="/dashboard/products"
              className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl py-3 font-bold transition-colors">
              Limpiar
            </a>
          </div>
        </div>
      </form>
      <Suspense
        key={JSON.stringify(params)}
        fallback={<ProductsGridSkeleton />}
      >
        <ProductsGrid
          params={params}
        />
      </Suspense>
    </div>
    </main>
  );
}