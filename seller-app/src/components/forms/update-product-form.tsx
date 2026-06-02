'use client';

import { useActionState } from "react";
import { editProduct } from "@/src/lib/actions/edit-product";
import { ProductState } from "@/src/lib/schemas";
import { ImageIcon, Upload } from "lucide-react";
import Link from "next/link";

//Props for product update.
type EditProductFormProps = {
  product: {
    id: string;
    title: string;
    description: string | null;
    price: number;
    stock: number;
    categoryId: string | null;
    season: string | null;
    team: string | null;
    size: string | null;
    version: "HOME" | "AWAY" | "RETRO";
  };
};

export default function EditProductForm({ product }: EditProductFormProps) {

    const handleImputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, pattern: RegExp) => {
        const { value } = e.target;
        if (pattern.test(value) || value === "") {
            e.target.value = value;
        } else {
            e.target.value = value.slice(0, -1);
        }
    }
    
    const initialState: ProductState = { message: null, errors: {} };

    const [state, formAction] = useActionState(editProduct, initialState);

    return (
      <form action={formAction} className="space-y-6">
        {/*Hide the ID field*/}
        <input
          type="hidden"
          name="id"
          defaultValue={product.id}
        />
        {/* Título del producto */}
        <div className="space-y-2">
          <label htmlFor="titulo" className="text-gray-700 font-medium">
            Título del producto <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="titulo"
              name="title"
              placeholder="Ingrese el título del producto."
              defaultValue={product.title}
              onChange={(e) => handleImputChange(e, /^[a-zA-Z0-9\s]*$/)}
              required
              className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />          
          </div>
        </div>

        {/* Precio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="precio" className="text-gray-700 font-medium">
              Precio <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                id="precio"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ingrese el precio del producto."
                defaultValue={product.price}
                onChange={(e) => handleImputChange(e, /^\d*\.?\d{0,2}$/)}
                required
                className="w-full pl-7 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Stock */}
        <div className="space-y-2">
            <label htmlFor="stock" className="text-gray-700 font-medium">
              Stock <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                placeholder="Ingrese la cantidad disponible del producto."
                defaultValue={product.stock}
                onChange={(e) => handleImputChange(e, /^\d*$/)}
                required
                className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

        {/* Categoría */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="categoria" className="text-gray-700 font-medium">
              Categoría 
            </label>
            <div className="relative">
              <select
                id="categoria"
                name="categoryId"
                defaultValue={product.categoryId ?? ""}
                aria-describedby="category-error"
                required
              >
                <option value="" disabled>Selecciona la categoría del producto.</option>
                <option value="SELECCION">Selección</option>
                <option value="CLUB">Club</option>
              </select>
            </div>
            <div id="category-error" aria-live="polite" aria-atomic="true">
              {state.errors?.categoryId && 
                  state.errors.categoryId.map((error: string) => (
                    <p key={error} className="text-red-500 text-sm">
                      {error}
                    </p>
                  ))}
            </div>
          </div>
        </div>
        
        {/* Temporada */}
        <div className="space-y-2">
            <label htmlFor="temporada" className="text-gray-700 font-medium">
              Temporada 
            </label>
            <div className="relative">
              <input
                id="temporada"
                name="season"
                placeholder="Ingrese la temporada del producto."
                defaultValue={product.season ?? ""}
                onChange={(e) => handleImputChange(e, /^[a-zA-Z0-9\s]*$/)}
                className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
        </div>

        {/* Team */}
        <div className="space-y-2">
          <label htmlFor="team" className="text-gray-700 font-medium">
            Equipo / Selección 
          </label>
          <div className="relative">
            <input
              id="team"
              name="team"
              placeholder="Ingrese el nombre del equipo/selección del producto."
              defaultValue={product.team ?? ""}
              onChange={(e) => handleImputChange(e, /^[a-zA-Z0-9\s]*$/)}
              className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Talle */}
      <div className="space-y-2">
        <label htmlFor="size" className="text-gray-700 font-medium">
          Tamaño 
        </label>
        <div className="relative">
          <input
            id="size"
            name="size"
            placeholder="Ingrese el talle del producto. Ejemplo: S, M, L, XL."
            defaultValue={product.size ?? ""}
            onChange={(e) => handleImputChange(e, /^[a-zA-Z0-9\s]*$/)}
            className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

        {/* Versión */}
        <div className="space-y-3">
          <label className="text-gray-700 font-medium">
            Versión <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="version"
              name="version"
              defaultValue={product.version}
              aria-describedby="version-error"
              required
            >
              <option value="" disabled>Selecciona una versión</option>
              <option value="HOME">Titular</option>
              <option value="AWAY">Visitante</option>
              <option value="RETRO">Retro</option>
            </select>
          </div>
          <div id="version-error" aria-live="polite" aria-atomic="true">
            {state.errors?.version && 
                state.errors.version.map((error: string) => (
                  <p key={error} className="text-red-500 text-sm">
                    {error}
                  </p>
                ))}
          </div>
        </div>
        
        {/* Descripción */}
        <div className="space-y-2">
          <label htmlFor="descripcion" className="text-gray-700 font-medium">
            Descripción 
          </label>
          <textarea
            id="descripcion"
            name="description"
            placeholder="Agrega una pequeña descripción de tu producto..."
            defaultValue={product.description ?? ""}
            onChange={(e) => handleImputChange(e, /^[a-zA-Z0-9\s.,!?]*$/)}
            rows={4}
            className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* TODO: Implement image upload functionality */}
        <div className="space-y-3">
          <label className="text-gray-700 font-medium">
            Imágenes del producto <span className="text-red-500">*</span>
          </label>
          <div
            className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
            />
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">
              Arrastra imágenes o haz click para subir
            </p>
            <p className="text-gray-400 text-sm mt-1">
              PNG, JPG, WEBP hasta 10MB
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
          >
            Actualizar Producto
          </button>

          <Link
            href="/dashboard/products"
            className="flex-1 bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 font-medium py-2.5 flex items-center justify-center"
          >
            Cancelar
          </Link>
        </div>
    </form>
  )
}