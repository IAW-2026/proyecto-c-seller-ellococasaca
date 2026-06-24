import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Show } from "@clerk/nextjs"

export function WelcomeHero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 md:px-8 md:pt-16">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Texto */}
        <div className="flex flex-col justify-center gap-8 py-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-700">
            <span className="size-2 rounded-full bg-primary" />
            Tu marketplace de camisetas
          </div>

          <h1 className="font-heading text-6xl font-bold uppercase leading-[0.85] tracking-tight text-gray-900 sm:text-7xl md:text-8xl xl:text-9xl">
            Vestí tu
            <br />
            <span className="text-blue-600">pasión</span>
          </h1>

          <p className="max-w-md text-pretty text-lg leading-relaxed text-gray-500 md:text-xl">
            El mejor lugar para tus camisetas. Sumate a la comunidad que vive el
            fútbol como vos y mostrá tu pasión al mundo.
          </p>

          <Show when ="signed-out">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/sign-up"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-blue-700">
                  Empezar ahora
                  <ArrowRight className="size-4" />
              </Link>
              <Link href="/sign-in" 
                  className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-gray-900 transition-colors hover:bg-gray-50">
                  Ya tengo una cuenta
              </Link>
            </div>
          </Show>
          <Show when ="signed-in">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-blue-700">
                  Ir al dashboard
                  <ArrowRight className="size-4" />
              </Link>
            </div>
          </Show>
        </div>

        {/* Imagen */}
        <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-border bg-blue-50 lg:min-h-[520px] relative overflow-hidden rounded-3xl shadow-2xl shadow-blue-900/10">
          <Image
            src="/player.jpg"
            alt="Jugador de fútbol celebrando con su camiseta."
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
