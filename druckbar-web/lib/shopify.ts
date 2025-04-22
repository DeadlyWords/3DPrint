// lib/shopify.ts

export interface ShopifyImage {
  url: string
  altText: string | null
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  images: ShopifyImage[]
}

export interface ShopifyProductQueryResponse {
  products: {
    edges: {
      node: {
        id: string
        title: string
        handle: string
        description: string
        images: {
          edges: {
            node: ShopifyImage
          }[]
        }
      }
    }[]
  }
}
