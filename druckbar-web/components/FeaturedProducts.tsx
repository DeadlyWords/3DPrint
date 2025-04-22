"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Carousel from "@/components/Carousel";
import useShopifyQuery from "@/hooks/useShopifyQuery";
import type { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

const QUERY = `
  query FeaturedProducts {
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
`;

export default function FeaturedProducts() {
  const [showAll, setShowAll] = useState(false);

  const {
    data: products,
    loading,
    error,
  } = useShopifyQuery<Product[]>({
    query: QUERY,
    parseResult: (data: { products: { edges: { node: any }[] } }): Product[] =>
      data.products.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        description: edge.node.description,
        images: edge.node.images.edges.map(
          (img: { node: { url: string; altText: string | null } }) => ({
            url: img.node.url,
            altText: img.node.altText,
          })
        ),
      })),
  });

  // Debug log to verify product data
  console.log("FeaturedProducts - products:", products);

  if (loading)
    return (
      <div className="p-12 text-center text-gray-500">Lade Produkte...</div>
    );
  if (error)
    return <div className="p-12 text-center text-red-500">Fehler: {error}</div>;
  if (!products || products.length === 0)
    return (
      <div className="p-12 text-center text-gray-500">
        Keine Produkte gefunden.
      </div>
    );

  const featured = products.slice(0, 5);
  const rest = products.slice(5);

  return (
    <section
      id="products"
      className="bg-amber-50 py-24 px-6 text-center snap-start"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          Unsere Highlights
        </h2>

        <Carousel
          id="featured-products"
          items={featured}
          itemKey={(item) => item.id}
          bgColor="amber-50"
          renderItem={(product) => (
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
              <div className="aspect-[4/3] bg-gray-100 rounded-md mb-4 overflow-hidden relative">
                <Image
                  src={product.images[0]?.url || ""}
                  alt={product.images[0]?.altText || product.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
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

        {/* Full shop grid */}
        {showAll && rest.length > 0 && (
          <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col"
              >
                <div className="aspect-[4/3] bg-gray-100 rounded-md mb-4 overflow-hidden relative">
                  <Image
                    src={product.images[0]?.url || ""}
                    alt={product.images[0]?.altText || product.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
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
        )}

        {/* Toggle button */}
        {rest.length > 0 && (
          <div className={`mt-10 text-center ${showAll ? "pt-16" : ""}`}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-medium text-gray-600 hover:text-gray-800 underline transition"
            >
              {showAll ? "Weniger anzeigen" : "Mehr anzeigen →"}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
