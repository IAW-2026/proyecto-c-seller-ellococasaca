"use client"

import { DollarSign, Package, ShoppingBag, Star } from "lucide-react"

const features = [
  {
    icon: DollarSign,
    title: "Ventas del Mes",
    description: "Monitoreá tus ingresos en tiempo real y analizá el rendimiento de tu tienda con estadísticas detalladas.",
  },
  {
    icon: Package,
    title: "Tus Productos",
    description: "Gestioná tu catálogo completo, agregá nuevos productos y mantené actualizado tu inventario.",
  },
  {
    icon: ShoppingBag,
    title: "Tus Pedidos",
    description: "Seguí el estado de cada pedido, desde la confirmación hasta la entrega final al cliente.",
  },
  {
    icon: Star,
    title: "Tus Calificaciones",
    description: "Conocé la opinión de tus clientes y mejorá tu reputación como vendedor en la plataforma.",
  },
]

export function WelcomeSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Todo lo que necesitás para vender
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
