import { 
  Package, 
  Star, 
  Truck, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import Link from "next/link"

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp 
}: { 
  title: string
  value: string
  icon: React.ElementType
  trend?: string
  trendUp?: boolean
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 flex items-center gap-1 ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
              <TrendingUp className={`w-3 h-3 ${!trendUp && 'rotate-180'}`} />
              {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  )
}

function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  primary = false 
}: { 
  title: string
  description: string
  icon: React.ElementType
  href: string
  primary?: boolean
}) {
  return (
    <Link 
      href={href}
      className={`block rounded-xl p-6 shadow-xl shadow-blue-900/5 transition-all hover:scale-[1.02] ${
        primary ? 'bg-blue-600 text-white' : 'bg-white'
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
        primary ? 'bg-blue-500' : 'bg-blue-100'
      }`}>
        <Icon className={`w-5 h-5 ${primary ? 'text-white' : 'text-blue-600'}`} />
      </div>
      <h3 className={`font-semibold ${primary ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      <p className={`text-sm mt-1 ${primary ? 'text-blue-100' : 'text-gray-500'}`}>
        {description}
      </p>
    </Link>
  )
}

function RecentOrderItem({ 
  id, 
  product, 
  status, 
  date 
}: { 
  id: string
  product: string
  status: 'pending' | 'shipped' | 'delivered'
  date: string
}) {
  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pendiente' },
    shipped: { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Enviado' },
    delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Entregado' }
  }
  
  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 ${config.bg} rounded-lg flex items-center justify-center`}>
          <StatusIcon className={`w-4 h-4 ${config.color}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{product}</p>
          <p className="text-xs text-gray-500">Pedido #{id}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  )
}

export function DashboardContent() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido de vuelta, Vendedor</h1>
        <p className="text-gray-500 mt-1">Aqui tienes un resumen de tus ventas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Ventas del Mes" 
          value="$12,450" 
          icon={DollarSign}
          trend="+12.5% vs mes anterior"
          trendUp
        />
        <StatCard 
          title="Productos Activos" 
          value="24" 
          icon={Package}
          trend="+3 nuevos"
          trendUp
        />
        <StatCard 
          title="Pedidos Pendientes" 
          value="8" 
          icon={ShoppingBag}
        />
        <StatCard 
          title="Calificacion Promedio" 
          value="4.8" 
          icon={Star}
          trend="+0.2 este mes"
          trendUp
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rapidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard 
            title="Agregar Producto"
            description="Sube un nuevo producto a tu catalogo"
            icon={Package}
            href="/dashboard/products/create"
            primary
          />
          <QuickActionCard 
            title="Ver Resenas"
            description="Revisa lo que dicen tus clientes"
            icon={Star}
            href="/dashboard/reviews"
          />
          <QuickActionCard 
            title="Gestionar Envios"
            description="Actualiza el estado de tus pedidos"
            icon={Truck}
            href="/dashboard/shipments"
          />
        </div>
      </div>

      {/* Recent Orders & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pedidos Recientes</h2>
            <Link href="/envios" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            <RecentOrderItem 
              id="1234"
              product="Camiseta Negra Classic"
              status="pending"
              date="Hace 2 horas"
            />
            <RecentOrderItem 
              id="1233"
              product="Camiseta Blanca Premium"
              status="shipped"
              date="Ayer"
            />
            <RecentOrderItem 
              id="1232"
              product="Pack x3 Basicas"
              status="delivered"
              date="Hace 2 dias"
            />
            <RecentOrderItem 
              id="1231"
              product="Camiseta Estampada"
              status="delivered"
              date="Hace 3 dias"
            />
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl p-6 shadow-xl shadow-blue-900/5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alertas y Notificaciones</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Stock bajo</p>
                <p className="text-xs text-yellow-700">Camiseta Negra Classic tiene solo 3 unidades</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Star className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Nueva resena</p>
                <p className="text-xs text-blue-700">Recibiste una resena de 5 estrellas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">Pedido completado</p>
                <p className="text-xs text-green-700">El pedido #1232 fue entregado exitosamente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
