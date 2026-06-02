import CreateProductForm from "@/src/components/forms/create-product-form";

export default function CreateProductPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">CREAR PRODUCTO</h1>
      <CreateProductForm />
    </div>
  )
}