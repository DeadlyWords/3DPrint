// lib/shopify.ts
export async function fetchProducts() {
    const domain = process.env.SHOPIFY_STORE_DOMAIN!
    const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
  
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
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  
    const res = await fetch(`https://${domain}/api/2025-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    })
  
    const json = await res.json()
    return json.data.products.edges.map((edge: any) => edge.node)
  }
  