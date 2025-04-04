// app/shop/page.tsx

import { fetchProducts } from "@/lib/shopify";
import ProductGrid from "@/components/ProductGrid";

export default async function ShopPage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen px-6 py-20 bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-10 text-center">Shop</h1>
      <ProductGrid products={products} />
    </main>
  );
}
