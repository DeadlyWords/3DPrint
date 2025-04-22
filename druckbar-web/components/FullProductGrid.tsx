// components/FullProductGrid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct } from "@/lib/shopify";

type FullProductGridProps = {
  products: ShopifyProduct[];
};

export default function FullProductGrid({ products }: FullProductGridProps) {
  return (
    <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
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
  );
}
