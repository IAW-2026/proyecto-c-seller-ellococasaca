import type { Metadata } from 'next'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { Shirt } from 'lucide-react';
import Link from 'next/link'

const inter = Inter({ 
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'El Loco Casaca | Seller App',
  description: 'El marketplace de camisetas de fútbol más grande del mundo.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Header of the site */}
                <Link href="/dashboard" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Shirt className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-black uppercase italic tracking-tight text-gray-900">
                    EL LOCO <span className="text-xl font-black uppercase italic tracking-tight text-blue-600">CASACA</span>
                  </span>
                </Link>

                {/* Links to all pages */}
                <nav className="flex items-center gap-2">
                  <Show when="signed-in">
                    <Link
                      href="/dashboard/products"
                      className="flex items-center gap-2 px-4 py-2 text-medium uppercase text-gray-600 bg-gray-30 hover:bg-gray-40 hover:-translate-y-0.5 transition-all"
                      >
                      <span className="hidden sm:inline">Mis Productos</span>
                    </Link>
                    <Link
                      href="/dashboard/feedbacks"
                      className="flex items-center gap-2 px-4 py-2 text-medium uppercase text-gray-600 bg-gray-30 hover:bg-gray-40 hover:-translate-y-0.5 transition-all"
                    >
                      <span className="hidden sm:inline">Mis Reseñas</span>
                    </Link>
                    <Link
                      href="/dashboard/orders"
                      className="flex items-center gap-2 px-4 py-2 text-medium uppercase text-gray-600 bg-gray-30 hover:bg-gray-40 hover:-translate-y-0.5 transition-all"
                    >
                      <span className="hidden sm:inline">Mis Órdenes</span>
                    </Link>
                    <Link
                      href="/dashboard/payments"
                      className="flex items-center gap-2 px-4 py-2 text-medium uppercase text-gray-600 bg-gray-30 hover:bg-gray-40 hover:-translate-y-0.5 transition-all"
                    >
                      <span className="hidden sm:inline">Mis Pagos</span>
                    </Link>
                  </Show>
                  <header className="flex justify-end items-center p-4 gap-4 h-16">
                    <Show when="signed-out">
                      <SignInButton forceRedirectUrl="/dashboard">
                        <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-gray-900 transition-colors hover:bg-gray-50">
                          Ingresar
                        </button>
                      </SignInButton>
                      <SignUpButton forceRedirectUrl="/dashboard">
                        <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-blue-700">
                          Crear cuenta
                        </button>
                      </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                      <UserButton />
                    </Show>
                  </header>
                </nav>
              </div>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}

