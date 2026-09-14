import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity?: number
  image?: string
  notes?: string
  extras?: { name: string; price: number }[]
  [key: string]: any
}

interface CartStore {
  items: CartItem[]
  addItem: (item: any) => void
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
          const itemToAdd = { ...item, quantity: item.quantity || 1 }
          const existingIndex = state.items.findIndex((i) => i.id === itemToAdd.id)
          if (existingIndex > -1) {
            const newItems = [...state.items]
            newItems[existingIndex].quantity = (newItems[existingIndex].quantity || 1) + (itemToAdd.quantity || 1)
            return { items: newItems }
          }
          return { items: [...state.items, itemToAdd] }
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
        return get().items.reduce((sum, item) => sum + (item.quantity || 1), 0)
      },
      totalPrice: () => {
        return get().items.reduce((sum, item) => {
          const extrasTotal = item.extras?.reduce((exSum: number, ex: any) => exSum + (ex.price || 0), 0) || 0
          return sum + (item.price + extrasTotal) * (item.quantity || 1)
        }, 0)
      },
    }),
    { name: 'carta-digital' }
  )
)