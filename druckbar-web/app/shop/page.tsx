'use client'

import useShopifyQuery from '@/hooks/useShopifyQuery'
import { Product } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'

const QUERY = `
  query AllProducts {
    products(first: 30) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`

export default function ShopPage() {
  const { data: products, loading, error } = useShopifyQuery<Product[]>({
    query: QUERY,
    parseResult: (data) =>
      data.products.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        description: edge.node.description,
        images: edge.node.images.edges.map((img: any) => ({
          url: img.node.url,
          altText: img.node.altText
        }))
      }))
  })

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500">
        Lade Produkte...
      </div>
    )
  }

  if (error || !products) {
    return (
      <div className="p-12 text-center text-red-500">
        Fehler beim Laden der Produkte
      </div>
    )
  }

  return (
    <main className="min-h-screen px-6 py-24 bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-10 text-center">Alle Produkte</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
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
        ))}
      </div>
    </main>
  )
}