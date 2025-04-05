"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";

type Product = {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: { url: string; altText: string | null }[];
};

export default function FeaturedProducts() {
  const { mode: shopMode, setMode: setShopMode } = useShop();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/shopify/products");
      const data = await res.json();

      let extended = [...data];
      while (extended.length < 6) {
        extended = [...extended, ...data];
      }

      setProducts(extended);
    };

    fetchProducts();
  }, []);

  if (shopMode === "full") {
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
            <h2 className="text-4xl font-bold text-gray-800">Gesamter Shop</h2>
            <button
              onClick={() => setShopMode("featured")}
              className="self-center sm:self-auto px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition"
            >
              Zurück zu den Highlights
            </button>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col"
              >
                <div className="aspect-[4/3] bg-gray-100 rounded-md mb-4 overflow-hidden">
                  <img
                    src={product.images[0]?.url || ""}
                    alt={product.images[0]?.altText || product.title}
                    className="object-cover w-full h-full"
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
        </motion.div>
      </section>
    );
  }

  return (
    <Carousel
      id="products"
      items={products}
      itemKey={(item) => item.id}
      title="Unsere Highlights"
      bgColor="amber-50"
      renderItem={(product) => (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
          <div className="aspect-[4/3] bg-gray-100 rounded-md mb-4 overflow-hidden">
            <img
              src={product.images[0]?.url || ""}
              alt={product.images[0]?.altText || product.title}
              className="object-cover w-full h-full"
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
  );
}
