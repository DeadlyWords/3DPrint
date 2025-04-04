"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  const firstImage = product.images?.edges?.[0]?.node?.url;

  const variantCount = product.variants?.edges?.length || 1;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
      {firstImage && (
        <div className="aspect-[4/3] bg-gray-100">
          <Image
            src={firstImage}
            alt={product.title}
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-4">
          {variantCount} {variantCount === 1 ? "Variante" : "Varianten"}
        </p>

        <Link
          href={`/shop/product/${product.handle}`}
          className="mt-auto inline-block text-center bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md"
        >
          Zum Produkt
        </Link>
      </div>
    </div>
  );
}
