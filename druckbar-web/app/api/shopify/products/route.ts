// app/api/shopify/products/route.ts

interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  images: { url: string; altText: string | null }[]
}

interface ShopifyGraphQLResponse {
  data: {
    products: {
      edges: {
        node: {
          id: string
          title: string
          handle: string
          description: string
          images: {
            edges: {
              node: {
                url: string
                altText: string | null
              }
            }[]
          }
        }
      }[]
    }
  }
}

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

  const json: ShopifyGraphQLResponse = await res.json()

  const products: ShopifyProduct[] = json.data.products.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.title,
    handle: edge.node.handle,
    description: edge.node.description,
    images: edge.node.images.edges.map((img) => img.node),
  }))

  return Response.json(products)
}
