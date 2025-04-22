// components/ProductDisplay.tsx
"use client";

import { useState } from "react";
import useShopifyQuery from "@/hooks/useShopifyQuery";
import { ShopifyProduct, ShopifyProductQueryResponse } from "@/lib/shopify";
import FeaturedProducts from "@/components/FeaturedProducts";
import FullProductGrid from "@/components/FullProductGrid";

export default function ProductDisplay() {
  const [mode, setMode] = useState<"featured" | "full">("featured");

  const {
    data: products,
    loading,
    error,
  } = useShopifyQuery<ShopifyProduct[]>({
    query: `
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
    `,
    parseResult: (data: ShopifyProductQueryResponse) =>
      data.products.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        description: edge.node.description,
        images: edge.node.images.edges.map((img) => img.node),
      })),
  });

  if (loading || error || !products) return null;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="snap-start">
      {mode === "featured" ? (
        <>
          <FeaturedProducts products={products.slice(0, 6)} />
          <div className="text-center mt-8">
            <button
              onClick={() => setMode("full")}
              className="text-sm font-medium text-gray-600 hover:text-gray-800 underline"
            >
              Mehr anzeigen →
            </button>
          </div>
        </>
      ) : (
        <>
          <FullProductGrid products={products} />
          <div className="text-center mt-8">
            <button
              onClick={() => setMode("featured")}
              className="text-sm font-medium text-gray-600 hover:text-gray-800 underline"
            >
              Zurück zu den Highlights
            </button>
          </div>
        </>
      )}
    </section>
  );
}
