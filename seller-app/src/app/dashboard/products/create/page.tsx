import CreateProductForm from "@/src/components/forms/create-product-form";

export default function CreateProductPage() {
  return (
    <main>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-black uppercase italic tracking-tight text-gray-900 mb-8">
          Nueva <span className="text-4xl font-black uppercase italic tracking-tight text-blue-600">Casaca</span>
        </h1>
        <CreateProductForm />
      </div>
    </main>
  )
}