// app/api/shopify/products/route.ts
import { Product } from '@/types/product'

export async function GET() {
  console.log('✅ Shopify API route hit')

  const query = `
    {
      products(first: 6) {
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
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query }),
  })

  const json = await res.json()

  const products: Product[] = json.data.products.edges.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    handle: edge.node.handle,
    description: edge.node.description,
    images: edge.node.images.edges.map((img: any) => ({
      url: img.node.url,
      altText: img.node.altText,
    })),
    variants: edge.node.variants.edges.map((variant: any) => ({
      id: variant.node.id,
      title: variant.node.title,
      price: {
        amount: variant.node.price.amount,
        currencyCode: variant.node.price.currencyCode,
      },
    })),
    price: {
      amount: edge.node.variants.edges[0]?.node.price.amount ?? '',
      currencyCode: edge.node.variants.edges[0]?.node.price.currencyCode ?? 'EUR',
    },
  }))

  return Response.json(products)
}
