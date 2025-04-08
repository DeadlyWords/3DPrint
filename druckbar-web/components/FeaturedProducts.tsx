'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Carousel from '@/components/Carousel'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types/product'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/shopify/products')
      const data = await res.json()

      // Ensure at least 6 items for carousel debug/fill
      let extended = [...data]
      while (extended.length < 6) {
        extended = [...extended, ...data]
      }

      setProducts(extended)
    }

    fetchProducts()
  }, [])

  return (
    <Carousel
      id="products"
      items={products}
      itemKey={(item) => item.id}
      title="Unsere Highlights"
      bgColor="amber-50"
      renderItem={(product) => (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
          <div className="aspect-[4/3] bg-gray-100 rounded-md mb-4 overflow-hidden relative">
            <Image
              src={product.images[0]?.url || ''}
              alt={product.images[0]?.altText || product.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <Link
            href={`https://hnadba-i0.myshopify.com/products/${product.handle}`}
            target="_blank"
            className="mt-auto bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md text-sm text-center"
          >
            Zum Produkt
          </Link>
        </div>
      )}
    />
  )
}
