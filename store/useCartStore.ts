import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  notes?: string
  extras?: { name: string; price: number }[]
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex((i) => i.id === item.id)
          if (existingIndex > -1) {
            const newItems = [...state.items]
            newItems[existingIndex].quantity += item.quantity
            return { items: newItems }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== id) }
          }
          return {
            items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
          }
        }),
      clearCart: () => set({ items: [] }),
      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
      totalPrice: () => {
        return get().items.reduce((sum, item) => {
          const extrasTotal = item.extras?.reduce((exSum, ex) => exSum + ex.price, 0) || 0
          return sum + (item.price + extrasTotal) * item.quantity
        }, 0)
      },
    }),
    { name: 'pepinillo-cart' }
  )
)