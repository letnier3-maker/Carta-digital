'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { ShoppingBag, Plus, Minus, Trash2, X } from 'lucide-react'

const mockProducts = [
  { id: '1', name: 'Hamburguesa Artesanal', price: 12.99, description: 'Carne jugosa con queso cheddar y tocino.' },
  { id: '2', name: 'Papas Sazonadas', price: 4.50, description: 'Papas crujientes con especias de la casa.' },
  { id: '3', name: 'Limonada Natural', price: 3.00, description: 'Bebida refrescante de limón y hierbabuena.' }
]

export default function MenuPage() {
  const { items, addItem, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore()
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Barra superior */}
      <header className="bg-white shadow-sm sticky top-0 z-10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800"> - Menú Digital</h1>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition"
        >
          <ShoppingBag size={20} />
          <span>Carrito</span>
          {totalItems() > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {totalItems()}
            </span>
          )}
        </button>
      </header>

      {/* Listado de productos */}
      <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Nuestros Platos</h2>
        <div className="grid gap-4">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                <span className="font-bold text-green-600">${product.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => addItem({ ...product, quantity: 1 })}
                className="bg-black text-white p-2.5 rounded-lg hover:bg-gray-800 transition flex items-center gap-1 text-sm"
              >
                <Plus size={16} /> Agregar
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Carrito Lateral (Drawer) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="w-full max-w-md bg-white h-full shadow-xl flex flex-col p-6 animate-in slide-in-from-right">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-bold text-gray-800">Tu Carrito</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            {/* Lista de productos en el carrito */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">Tu carrito está vacío </p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <span className="text-sm text-gray-500">${item.price.toFixed(2)} c/u</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total y botón de pedido */}
            {items.length > 0 && (
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
                <button
                  onClick={() => alert('¡Pedido realizado con éxito!')}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition"
                >
                  Enviar Pedido por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}