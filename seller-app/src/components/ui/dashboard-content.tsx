import { Package, Star, Truck, TrendingUp, DollarSign, ShoppingBag, PackagePlus, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSellerRating } from "@/src/services/feedback-service";

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
          <p className="text-xs uppercase tracking-[0.25em] font-black text-gray-600">{title}</p>
          <p className="text-3xl font-bold font-black text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-xs uppercase mt-1 flex items-center gap-1 ${trendUp ? 'text-green-700' : 'text-red-600'}`}>
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
      <p className={`text-sm mt-1 ${primary ? 'text-white/90' : 'text-gray-600'}`}>
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
          <p className="text-xs text-gray-600">Pedido #{id}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  )
}

export async function DashboardContent() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    productsCount,
    pendingOrders,
    monthlySales,
    sellerRating,
  ] = await Promise.all([
    prisma.product.count({
      where: {
        sellerId: userId,
      },
    }),

    prisma.order.count({
      where: {
        sellerId: userId,
        status: "PENDING",
      },
    }),

    prisma.order.aggregate({
      where: {
        sellerId: userId,
        createdAt: {
          gte: startOfMonth,
        },
      },

      _sum: {
        totalPrice: true,
      },
    }),

    getSellerRating(userId),
  ]);

  const salesData = await prisma.order.aggregate({
    where: {
      sellerId: userId,
    },

    _sum: {
      totalPrice: true,
    },
  });

  const totalSales = salesData._sum.totalPrice ?? 0;
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-10 bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-blue-900/10">
        <p className="text-sm uppercase tracking-[0.3em] font-black text-white">
          BIENVENIDO DE VUELTA
        </p>
        <h1 className="mt-2 text-5xl font-black uppercase italic tracking-tight">
          VESTÍ TU PASIÓN
        </h1>
        <p className="mt-4 text-lg text-white/90 max-w-2xl">
          Gestioná tu catálogo, ventas y pedidos desde un único lugar.
        </p>
        <Link
          href="/dashboard/products/create"
          className="mt-6 inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-2xl font-black hover:bg-gray-100 transition-colors">
          <PackagePlus />
          Crear Producto
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <StatCard
          title="Ventas Totales"
          value={`$${totalSales.toLocaleString("es-AR")}`}
          icon={DollarSign}
        />

        <StatCard
          title="Productos Activos"
          value={productsCount.toString()}
          icon={Package}
        />

        <StatCard
          title="Pedidos Pendientes"
          value={pendingOrders.toString()}
          icon={ShoppingBag}
        />

        <StatCard
          title="Calificación Promedio"
          value={sellerRating.averageRating.toFixed(1)}
          icon={Star}
        />

      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase italic tracking-tight text-gray-900 mb-6">
          Centro de Control
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard 
            title="Ver Productos"
            description="Gestiona los productos de tu catálogo"
            icon={Package}
            href="/dashboard/products"
            primary
          />
          <QuickActionCard 
            title="Ver Reseñas"
            description="Revisa lo que dicen tus clientes"
            icon={Star}
            href="/dashboard/feedbacks"
          />
          <QuickActionCard 
            title="Gestionar Envíos"
            description="Actualiza el estado de tus pedidos"
            icon={Truck}
            href="/dashboard/orders"
          />
        </div>
      </div>
    </main>
  )
}
