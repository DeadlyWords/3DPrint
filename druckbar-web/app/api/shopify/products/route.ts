// app/api/shopify/products/route.ts
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
  
    const json = await res.json()
    const products = json.data.products.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      description: edge.node.description,
      images: edge.node.images.edges.map((img: any) => img.node),
    }))
        const duplicatedProducts = [...products]
        while (duplicatedProducts.length < 6) {
      duplicatedProducts.push(...products)
    }
    return Response.json(products)
  }
  