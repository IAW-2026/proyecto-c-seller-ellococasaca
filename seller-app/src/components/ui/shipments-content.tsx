"use client"

import { Package, Truck, CheckCircle, Clock, MapPin, Calendar } from "lucide-react"

const mockShipments = [
  {
    id: "ENV-001",
    product: "Remera Argentina 2022",
    buyer: "Carlos Méndez",
    address: "Av. Corrientes 1234, CABA",
    status: "delivered",
    statusText: "Entregado",
    date: "28 Nov 2024",
    trackingCode: "AR123456789"
  },
  {
    id: "ENV-002",
    product: "Remera Boca Juniors Retro",
    buyer: "María García",
    address: "Calle San Martín 567, Rosario",
    status: "in_transit",
    statusText: "En camino",
    date: "30 Nov 2024",
    trackingCode: "AR987654321"
  },
  {
    id: "ENV-003",
    product: "Remera River Plate 2024",
    buyer: "Juan Rodríguez",
    address: "Av. Santa Fe 890, CABA",
    status: "preparing",
    statusText: "Preparando",
    date: "01 Dic 2024",
    trackingCode: "AR456789123"
  },
  {
    id: "ENV-004",
    product: "Remera Racing Club",
    buyer: "Lucía Fernández",
    address: "Calle Mitre 234, Avellaneda",
    status: "delivered",
    statusText: "Entregado",
    date: "25 Nov 2024",
    trackingCode: "AR321654987"
  },
  {
    id: "ENV-005",
    product: "Remera Independiente",
    buyer: "Diego Martínez",
    address: "Av. Belgrano 456, Lanús",
    status: "in_transit",
    statusText: "En camino",
    date: "29 Nov 2024",
    trackingCode: "AR654987321"
  },
  {
    id: "ENV-006",
    product: "Remera San Lorenzo",
    buyer: "Ana López",
    address: "Calle Boedo 789, CABA",
    status: "preparing",
    statusText: "Preparando",
    date: "02 Dic 2024",
    trackingCode: "AR789123456"
  }
]

function getStatusIcon(status: string) {
  switch (status) {
    case "delivered":
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case "in_transit":
      return <Truck className="w-5 h-5 text-blue-600" />
    case "preparing":
      return <Clock className="w-5 h-5 text-amber-600" />
    default:
      return <Package className="w-5 h-5 text-gray-600" />
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case "delivered":
      return "bg-green-50 text-green-700 border-green-200"
    case "in_transit":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "preparing":
      return "bg-amber-50 text-amber-700 border-amber-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

export function ShipmentsContent() {
  const deliveredCount = mockShipments.filter(s => s.status === "delivered").length
  const inTransitCount = mockShipments.filter(s => s.status === "in_transit").length
  const preparingCount = mockShipments.filter(s => s.status === "preparing").length

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tus Envíos</h1>
        <p className="text-gray-600">Seguí el estado de todos tus envíos</p>
      </div>

      {/* Estadísticas de envíos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-gray-600 text-sm">Entregados</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{deliveredCount}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-gray-600 text-sm">En camino</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{inTransitCount}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-gray-600 text-sm">Preparando</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{preparingCount}</p>
        </div>
      </div>

      {/* Lista de envíos */}
      <div className="space-y-4">
        {mockShipments.map((shipment) => (
          <div
            key={shipment.id}
            className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{shipment.product}</h3>
                    <span className="text-xs text-gray-500">#{shipment.id}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Comprador: {shipment.buyer}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{shipment.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusStyle(shipment.status)}`}>
                  {getStatusIcon(shipment.status)}
                  <span className="text-sm font-medium">{shipment.statusText}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{shipment.date}</span>
                </div>
                <p className="text-xs text-gray-400">Código: {shipment.trackingCode}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
