// types/product.ts

export interface Product {
    id: string
    title: string
    handle: string
    description: string
    images: {
      url: string
      altText: string | null
    }[]
    price?: {
      amount: string
      currencyCode?: string
    }
    availableForSale?: boolean
    tags?: string[]
    vendor?: string
    productType?: string
    options?: {
      name: string
      values: string[]
    }[]
    variants?: {
      id: string
      title: string
      availableForSale: boolean
      price: {
        amount: string
        currencyCode: string
      }
      selectedOptions?: {
        name: string
        value: string
      }[]
    }[]
    seo?: {
      title?: string
      description?: string
    }
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
    featuredImage?: {
      url: string
      altText: string | null
    }
  }