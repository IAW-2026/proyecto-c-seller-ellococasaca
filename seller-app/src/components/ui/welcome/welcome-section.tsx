import { Shirt, Users, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: Shirt,
    title: "Publicá en minutos",
    description:
      "Subí tus camisetas, contá su historia y dejá que los hinchas las encuentren.",
  },
  {
    icon: Users,
    title: "Comunidad apasionada",
    description:
      "Llegá a miles de fanáticos que buscan la camiseta de su vida todos los días.",
  },
  {
    icon: ShieldCheck,
    title: "Vendé con confianza",
    description:
      "Pagos protegidos y envíos simples para que solo te ocupes de tu pasión.",
  },
]

export function WelcomeSection() {
  return (
    <section
      id="beneficios"
      className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5 p-7 transition-colors hover:border-primary/40"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <feature.icon className="size-6" />
            </div>
            <h3 className="mt-5 font-heading text-xl font-semibold uppercase tracking-tight text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-pretty leading-relaxed text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
