'use client'

import { useCartStore } from '@/store/useCartStore'
import { ShoppingBag, Plus } from 'lucide-react'

const mockProducts = [
  { id: '1', name: 'Hamburguesa Artesanal', price: 12.99, description: 'Carne 100% res, queso cheddar y tocino crujiente.' },
  { id: '2', name: 'Papas Sazonadas', price: 4.50, description: 'Papas fritas crocantes con especias de la casa.' },
  { id: '3', name: 'Limonada Natural', price: 3.00, description: 'Bebida refrescante recién hecha.' },
]

export default function MenuPage() {
  const { addItem, totalItems, totalPrice } = useCartStore()

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Encabezado con bolsa de compras */}
      <header className="bg-white border-b p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Menú Digital</h1>
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            {totalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems()}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Lista de productos */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Platos Destacados</h2>
        <div className="space-y-3">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
              <div className="pr-4">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="font-bold text-gray-900 mt-1">${product.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => addItem(product)}
                className="bg-black text-white p-2.5 rounded-lg hover:bg-gray-800 transition-colors shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Barra flotante inferior del carrito */}
      {totalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Total acumulado</p>
              <p className="text-lg font-bold">${totalPrice().toFixed(2)}</p>
            </div>
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
              Ver Pedido ({totalItems()})
            </button>
          </div>
        </div>
      )}
    </div>
  )
}