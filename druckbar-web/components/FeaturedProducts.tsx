// components/FeaturedProducts.tsx
'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3)
      else if (window.innerWidth >= 768) setItemsPerView(2)
      else setItemsPerView(1)
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/shopify/products')
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - itemsPerView : prev - 1
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= products.length - itemsPerView ? 0 : prev + 1
    )
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current
    const threshold = 50
    if (distance > threshold) nextSlide()
    else if (distance < -threshold) prevSlide()
  }

  return (
    <section id="products" className="bg-amber-50 py-24 px-6 text-center snap-start">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative"
      >
        <h2 className="text-4xl font-bold mb-10 text-gray-800">Entdecke unsere Produkte</h2>

        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(100 / itemsPerView) * currentIndex}%)` }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 flex-shrink-0"
              >
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
                  <div className="aspect-[4/3] bg-gray-100 rounded-md mb-4 overflow-hidden">
                    <img
                      src={product.images?.[0]?.url || '/placeholder.jpg'}
                      alt={product.images?.[0]?.altText || product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description?.substring(0, 100)}
                  </p>
                  <Link
                    href={`/products/${product.handle}`}
                    className="mt-auto bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md text-sm text-center"
                  >
                    Zum Produkt
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-3xl px-4 py-2 rounded-r-md shadow-md z-10"
            aria-label="Zurück"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-3xl px-4 py-2 rounded-l-md shadow-md z-10"
            aria-label="Weiter"
          >
            ›
          </button>
        </div>
      </motion.div>
    </section>
  )
}