"use client"

import { DollarSign, CreditCard, Calendar, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const mockPayments = [
  {
    id: "PAY-001",
    producto: "Camiseta Boca Juniors 2024",
    comprador: "Carlos Méndez",
    monto: 45000,
    metodo: "Tarjeta de crédito",
    estado: "Acreditado",
    fecha: "28 May 2024"
  },
  {
    id: "PAY-002",
    producto: "Camiseta River Plate Retro",
    comprador: "María González",
    monto: 52000,
    metodo: "Mercado Pago",
    estado: "Pendiente",
    fecha: "27 May 2024"
  },
  {
    id: "PAY-003",
    producto: "Camiseta Racing Club 2024",
    comprador: "Juan Pérez",
    monto: 38000,
    metodo: "Transferencia",
    estado: "Acreditado",
    fecha: "26 May 2024"
  },
  {
    id: "PAY-004",
    producto: "Camiseta San Lorenzo Away",
    comprador: "Lucía Fernández",
    monto: 41000,
    metodo: "Tarjeta de débito",
    estado: "Rechazado",
    fecha: "25 May 2024"
  },
  {
    id: "PAY-005",
    producto: "Camiseta Independiente 2024",
    comprador: "Roberto Silva",
    monto: 39500,
    metodo: "Mercado Pago",
    estado: "Acreditado",
    fecha: "24 May 2024"
  },
  {
    id: "PAY-006",
    producto: "Camiseta Argentina 3 Estrellas",
    comprador: "Ana Martínez",
    monto: 65000,
    metodo: "Tarjeta de crédito",
    estado: "Pendiente",
    fecha: "23 May 2024"
  }
]

const getEstadoStyle = (estado: string) => {
  switch (estado) {
    case "Acreditado":
      return {
        bg: "bg-green-50",
        text: "text-green-700",
        icon: <CheckCircle className="w-4 h-4" />
      }
    case "Pendiente":
      return {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        icon: <Clock className="w-4 h-4" />
      }
    case "Rechazado":
      return {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: <XCircle className="w-4 h-4" />
      }
    default:
      return {
        bg: "bg-gray-50",
        text: "text-gray-700",
        icon: <AlertCircle className="w-4 h-4" />
      }
  }
}

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(amount)
}

export function PaymentsContent() {
  const totalAcreditado = mockPayments
    .filter(p => p.estado === "Acreditado")
    .reduce((sum, p) => sum + p.monto, 0)
  
  const totalPendiente = mockPayments
    .filter(p => p.estado === "Pendiente")
    .reduce((sum, p) => sum + p.monto, 0)

  const acreditados = mockPayments.filter(p => p.estado === "Acreditado").length
  const pendientes = mockPayments.filter(p => p.estado === "Pendiente").length
  const rechazados = mockPayments.filter(p => p.estado === "Rechazado").length

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Tus Pagos</h1>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-xl shadow-blue-900/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Acreditado</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{formatMoney(totalAcreditado)}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xl shadow-blue-900/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">Pendiente</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{formatMoney(totalPendiente)}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xl shadow-blue-900/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Acreditados</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{acreditados}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xl shadow-blue-900/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">Rechazados</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{rechazados}</p>
          </div>
        </div>

        {/* Lista de pagos */}
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Historial de Pagos</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {mockPayments.map((pago) => {
              const estadoStyle = getEstadoStyle(pago.estado)
              return (
                <div key={pago.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{pago.producto}</h3>
                        <p className="text-sm text-gray-500">Comprador: {pago.comprador}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500">{pago.metodo}</span>
                          <span className="text-gray-300">|</span>
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500">{pago.fecha}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <p className="text-lg font-bold text-gray-900">{formatMoney(pago.monto)}</p>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${estadoStyle.bg} ${estadoStyle.text}`}>
                        {estadoStyle.icon}
                        <span className="text-sm font-medium">{pago.estado}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 ml-16">
                    <span className="text-xs text-gray-400">ID: {pago.id}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
