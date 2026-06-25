'use client';

import { useActionState, useState } from "react";
import { editProduct } from "@/src/lib/actions/edit-product";
import { ProductState } from "@/src/lib/schemas";
import { ImageIcon, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
    ProductImage: {
      id: string;
      url: string;
      productId: string;
    }[];
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

    const [preview, setPreview] = useState<string | null>(null);
    
  return (
    <form action={formAction} className="space-y-6">
      {/*Hide the ID field */}
        <input
          type="hidden"
          name="id"
          defaultValue={product.id}
        />
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
                defaultValue={product.title}
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
                    defaultValue={product.price}
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
                  defaultValue={product.stock}
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
                    defaultValue={product.categoryId ?? ""}
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
              <label htmlFor="version" 
                className="text-medium font-black uppercase tracking-[0.25em] text-black">
                Versión <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="version"
                  name="version"
                  defaultValue={product.version}
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
                  defaultValue={product.season ?? ""}
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
                  defaultValue={product.team ?? ""}
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
                defaultValue={product.size ?? ""}
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
                defaultValue={product.description ?? ""}
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
            <div className="bg-white rounded-3xl border border-gray-500 shadow-xl hover:-translate-y-0.5 shadow-blue-900/5 p-6">
              <div className="space-y-4">
                <p className="text-xs text-gray-700 font-black uppercase tracking-[0.25em] text-gray-400">
                  Imagen actual
                </p>
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200">
                  <Image
                    src={
                      preview ??
                      (
                        product.ProductImage.length > 0
                          ? product.ProductImage[0].url
                          : "/placeholder-shirt.jpg"
                      )
                    }
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                  <input
                    id="images"
                    name="images"
                    type="file"
                    accept="image/*"
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
                  <Upload className="w-8 h-8 text-gray-500 mb-2" />
                  <p className="font-semibold text-gray-700">
                    Cambiar imagen
                  </p>
                  <p className="text-sm text-gray-700">
                    PNG, JPG, WEBP hasta 10MB
                  </p>
                </label>
              </div>
            </div>
          </label>
        </div>
      </div>
        
      <div className="flex items-center justify-between pt-6">
        <p className="inline-block bg-red-600 text-white px-3 py-1 rounded-full font-black uppercase">
          <span className="text-red-500 font-bold">*</span> IMPORTANTE: Los campos marcados con * son OBLIGATORIOS.
        </p>
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
            Editar Producto
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