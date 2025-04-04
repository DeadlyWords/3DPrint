'use client'

import { createContext, useContext, useState } from 'react'

type ShopMode = 'featured' | 'full'

type ShopContextType = {
  mode: ShopMode
  setMode: (mode: ShopMode) => void
}

const ShopContext = createContext<ShopContextType | null>(null)

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ShopMode>('featured')
  return (
    <ShopContext.Provider value={{ mode, setMode }}>
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used within ShopProvider')
  return context
}