import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ShoppingBag, Plus } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function RestaurantMenuPage({ params }: PageProps) {
  const { slug } = await params

  // Buscar el restaurante en la base de datos por su slug
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: { products: true }
  })

  // Si el restaurante no existe, mostrar página 404
  if (!restaurant) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Barra superior con el nombre del restaurante */}
      <header className="bg-white shadow-sm sticky top-0 z-10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">🥒 {restaurant.name}</h1>
        <div className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2">
          <ShoppingBag size={20} />
          <span>Carrito</span>
        </div>
      </header>

      {/* Listado de productos de la base de datos */}
      <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Menú Digital</h2>
        
        {restaurant.products.length === 0 ? (
          <p className="text-gray-500 bg-white p-6 rounded-xl border text-center">
            Este restaurante aún no ha agregado productos a su menú.
          </p>
        ) : (
          <div className="grid gap-4">
            {restaurant.products.map((product: any) => (
              <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.description || 'Sin descripción'}</p>
                  <span className="font-bold text-green-600">{restaurant.currency}{product.price.toFixed(2)}</span>
                </div>
                <button
                  className="bg-black text-white p-2.5 rounded-lg hover:bg-gray-800 transition flex items-center gap-1 text-sm"
                >
                  <Plus size={16} /> Agregar
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}