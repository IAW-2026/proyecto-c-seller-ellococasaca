'use client';

import { useActionState, useState } from "react";
import { createProduct } from "@/src/lib/actions/create-product";
import { ProductState } from "@/src/lib/schemas";
import { Upload } from "lucide-react";
import Link from "next/link";

export default function CreateProductForm() {

  const handleImputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, pattern: RegExp) => {
      const { value } = e.target;
      if (pattern.test(value) || value === "") {
          e.target.value = value;
      } else {
          e.target.value = value.slice(0, -1);
      }
  }
  
  const initialState: ProductState = { message: null, errors: {} };

  const [state, formAction] = useActionState(createProduct, initialState);

  const [preview, setPreview] = useState<string | null>(null);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Título del producto */}
          <div className="max-w-xl space-y-2">
            <label htmlFor="titulo" className="text-medium font-black uppercase tracking-[0.25em] text-black">
              Título del producto <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="titulo"
                name="title"
                placeholder="Ingrese el título del producto."
                onChange={(e) => handleImputChange(e, /^[a-zA-Z0-9\s/]*$/)}
                required
                className="w-full h-12 px-4 rounded-2xl border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Precio y Stock */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Precio */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="precio" className="text-medium font-black uppercase tracking-[0.25em] text-black">
                  Precio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="precio"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Ingrese el precio del producto (Ejemplo: 50000,50)."
                    onChange={(e) => handleImputChange(e, /^\d*\.?\d{0,2}$/)}
                    required
                    className="w-full h-12 px-4 rounded-2xl border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            {/* Stock */}
            <div className="space-y-2">
              <label htmlFor="stock" className="text-medium font-black uppercase tracking-[0.25em] text-black">
                Stock <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="Ingrese la cantidad disponible del producto."
                  onChange={(e) => handleImputChange(e, /^\d*$/)}
                  required
                 className="w-full h-12 px-4 rounded-2xl border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          {/* Categoría y Versión */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Categoría */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="categoria" className="text-medium font-black uppercase tracking-[0.25em] text-black">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="categoria"
                    name="categoryId"
                    defaultValue=""
                    aria-describedby="category-error"
                    required
                    className="w-full h-12 px-4 rounded-2xl border-gray-200 bg-white text-gray-700 focus:border-blue-500 focus:ring-blue-500">
                    <option value="" disabled>Selecciona la categoría de tu producto.</option>
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
            {/* Versión */}
            <div className="space-y-3">
              <label className="text-medium font-black uppercase tracking-[0.25em] text-black">
                Versión <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="version"
                  name="version"
                  defaultValue=""
                  aria-describedby="version-error"
                  required
                  className="w-full h-12 px-4 rounded-2xl border-gray-200 bg-white text-gray-700 focus:border-blue-500 focus:ring-blue-500">
                  <option value="" disabled>Selecciona la versión de tu producto.</option>
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
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Temporada */}
            <div className="space-y-2">
                <label htmlFor="temporada" className="text-medium font-black uppercase tracking-[0.25em] text-black">
                  Temporada <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                  id="temporada"
                  name="season"
                  placeholder="Ingrese la temporada del producto."
                  onChange={(e) => handleImputChange(e, /^[a-zA-Z0-9\s/]*$/)}
                  required
                  className="w-full h-12 px-4 rounded-2xl border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500"
                />
                </div>
            </div>
            {/* Equipo o Selección */}
            <div className="space-y-2">
              <label htmlFor="team" className="text-medium font-black uppercase tracking-[0.25em] text-black">
                Equipo / Selección <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="team"
                  name="team"
                  placeholder="Ingrese el nombre del equipo/selección del producto."
                  onChange={(e) => handleImputChange(e, /^[a-zA-Z0-9\s]*$/)}
                  required
                  className="w-full h-12 px-4 rounded-2xl border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Talle */}
          <div className="space-y-2">
            <label htmlFor="size" className="text-medium font-black uppercase tracking-[0.25em] text-black">
              Tamaño <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="size"
                name="size"
                defaultValue=""
                required
                className="w-full h-12 px-4 rounded-2xl border-gray-200 bg-white text-gray-700 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Selecciona un talle
                </option>

                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
          <div>
            {/* Descripción */}
            <div className="space-y-2">
              <label htmlFor="descripcion" className="text-medium font-black uppercase tracking-[0.25em] text-black">
                Descripción 
              </label>
            </div>
            <div className="lg:col-span-2">
              <textarea
                id="descripcion"
                name="description"
                placeholder="Agrega una pequeña descripción de tu producto..."
                onChange={(e) => handleImputChange(e, /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.,!?¿¡:;()'"-/]*$/)}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border-gray-200 resize-none"
              />
            </div>
          </div>
          </div>
        </div>
        {/* TODO: Implement image upload functionality */}
        <div className="space-y-3">
          <label htmlFor="images">
            <label className="text-medium font-black uppercase tracking-[0.25em] text-black">Imágen del producto</label> 
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl hover:-translate-y-0.5 shadow-blue-900/5 p-6">
              <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer">
                {/* TODO: Put "multiple" on imput to manage multiple images */}
                <input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  required
                  className="hidden"
                  onChange={(e) => {

                    const file =
                      e.target.files?.[0];

                    if (!file) return;

                    setPreview(
                      URL.createObjectURL(file)
                    );
                  }}
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="w-full h-full object-cover rounded-2xl"
                  />

                ) : (

                  <>
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />

                    <p className="text-gray-600 font-medium">
                      Arrastra imágenes o haz click para subir
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      PNG, JPG, WEBP hasta 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </label>
        </div>
      </div>
        
      <div className="flex items-center justify-between pt-6">
        <p className="text-medium font-medium text-red-500">
          <span className="text-red-500 font-bold">*</span> IMPORTANTE: Los campos marcados con * son OBLIGATORIOS.
        </p>
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
            Crear Producto
          </button>
          <Link
            href="/dashboard/products"
            className="px-6 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50 transition-colors">
            Cancelar
          </Link>
        </div>
      </div>
    </form>
  )
}