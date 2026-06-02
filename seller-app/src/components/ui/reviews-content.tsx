"use client"

import { Star } from "lucide-react"

interface Review {
  id: number
  userName: string
  productName: string
  rating: number
  comment: string
  date: string
  avatarInitial: string
}

const mockReviews: Review[] = [
  {
    id: 1,
    userName: "María García",
    productName: "Remera River Plate Edición Especial",
    rating: 5,
    comment: "Excelente calidad de tela y los colores son muy vivos. El estampado no se desgasta con los lavados. Muy conforme con la compra!",
    date: "28 May 2025",
    avatarInitial: "M"
  },
  {
    id: 2,
    userName: "Carlos Rodríguez",
    productName: "Remera Boca Juniors Retro 1981",
    rating: 4,
    comment: "Muy buena remera, el diseño retro está genial. Le doy 4 estrellas porque tardó un poco en llegar, pero el producto en sí es impecable.",
    date: "25 May 2025",
    avatarInitial: "C"
  },
  {
    id: 3,
    userName: "Luciana Fernández",
    productName: "Remera Selección Argentina 3 Estrellas",
    rating: 5,
    comment: "Hermosa remera! La compré para mi papá y quedó encantado. El bordado de las 3 estrellas tiene muy buen detalle. Súper recomendable.",
    date: "22 May 2025",
    avatarInitial: "L"
  },
  {
    id: 4,
    userName: "Martín López",
    productName: "Remera Racing Club Campeón 2024",
    rating: 5,
    comment: "Tal cual la foto, muy buena calidad. El vendedor muy atento y el envío llegó antes de lo esperado. Volvería a comprar sin dudas.",
    date: "20 May 2025",
    avatarInitial: "M"
  },
  {
    id: 5,
    userName: "Valentina Sánchez",
    productName: "Remera San Lorenzo Edición Limitada",
    rating: 3,
    comment: "El producto está bien pero el talle me quedó un poco grande. Sugiero revisar la guía de talles antes de comprar.",
    date: "18 May 2025",
    avatarInitial: "V"
  },
  {
    id: 6,
    userName: "Diego Martínez",
    productName: "Remera Independiente Roja",
    rating: 5,
    comment: "Espectacular! La mejor remera que compré en mucho tiempo. La tela es de primera y el rojo es exactamente el tono del club.",
    date: "15 May 2025",
    avatarInitial: "D"
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

export function ReviewsContent() {
  const averageRating = (mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length).toFixed(1)
  const totalReviews = mockReviews.length

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tus Reseñas</h1>
        <p className="text-gray-600 mt-1">Mirá lo que dicen tus clientes sobre tus productos</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Calificación Promedio</p>
              <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Reseñas</p>
              <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600 fill-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reseñas 5 Estrellas</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockReviews.filter(r => r.rating === 5).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-xl shadow-blue-900/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Reseñas Recientes</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {mockReviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {review.avatarInitial}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{review.userName}</p>
                      <p className="text-sm text-gray-500">{review.productName}</p>
                    </div>
                    <span className="text-sm text-gray-400 flex-shrink-0">{review.date}</span>
                  </div>

                  <div className="mt-2">
                    <StarRating rating={review.rating} />
                  </div>

                  <p className="mt-3 text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
