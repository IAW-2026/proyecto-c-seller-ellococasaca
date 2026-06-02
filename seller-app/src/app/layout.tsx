import type { Metadata } from 'next'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { DollarSign, Package, Shirt, Star, Truck } from 'lucide-react';
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] });

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
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Shirt className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-black italic text-gray-900">
                    EL LOCO CASACA
                  </span>
                </Link>

                {/* Links to all pages */}
                <nav className="flex items-center gap-2">
                  <Link
                    href="/dashboard/products"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    <span className="hidden sm:inline">Tus Productos</span>
                  </Link>
                  <Link
                    href="/dashboard/reviews"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Star className="w-4 h-4" />
                    <span className="hidden sm:inline">Tus Reseñas</span>
                  </Link>
                  <Link
                    href="/dashboard/shipments"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Truck className="w-4 h-4" />
                    <span className="hidden sm:inline">Tus Envíos</span>
                  </Link>
                  <Link
                    href="/dashboard/payments"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span className="hidden sm:inline">Tus Pagos</span>
                  </Link>
                  <header className="flex justify-end items-center p-4 gap-4 h-16">
                    <Show when="signed-out">
                      <SignInButton />
                      <SignUpButton>
                        <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                          Sign Up
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
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <>
            <div className="mb-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                VESTÍ TU PASIÓN
              </h1>
              <p className="text-lg text-gray-500 mt-2">El mejor lugar para tus camisetas</p>
            </div>
          </>
          </main>
        
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}

