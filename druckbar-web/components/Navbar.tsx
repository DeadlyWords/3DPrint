'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useShop } from '@/context/ShopContext'
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setMode } = useShop()

  const handleShopClick = () => {
    const target = document.getElementById('products')
    if (target) {
      setMode('full')
      target.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          DruckBar
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-base font-medium text-gray-800">
          <button onClick={() => scrollTo('services')} className="hover:text-amber-600 transition">
            Leistungen
          </button>
          <button onClick={() => scrollTo('about')} className="hover:text-amber-600 transition">
            Über uns
          </button>
          <button onClick={() => scrollTo('contact')} className="hover:text-amber-600 transition">
            Kontakt
          </button>
          <button
            onClick={handleShopClick}
            className="ml-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-semibold shadow"
          >
            Shop
          </button>
        </div>

        {/* Mobile Burger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-800"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Semi-transparent background */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down menu */}
            <motion.div
              key="menu"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute z-50 top-full left-0 w-full bg-white shadow-md rounded-b-md py-6 px-4 space-y-4 text-center text-base font-medium text-gray-800"
            >
              <button onClick={() => scrollTo('services')} className="block w-full hover:text-amber-600">
                Leistungen
              </button>
              <button onClick={() => scrollTo('about')} className="block w-full hover:text-amber-600">
                Über uns
              </button>
              <button onClick={() => scrollTo('contact')} className="block w-full hover:text-amber-600">
                Kontakt
              </button>
              <button
                onClick={handleShopClick}
                className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md shadow"
              >
                Shop
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}