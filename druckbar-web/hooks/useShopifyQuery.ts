'use client'

import { useState, useEffect } from 'react'
import { useShop } from '@shopify/hydrogen-react'

interface UseShopifyQueryOptions {
  query: string
  variables?: Record<string, any>
  parseResult?: (data: any) => any
}

export default function useShopifyQuery<T = any>({
  query,
  variables = {},
  parseResult
}: UseShopifyQueryOptions): {
  data: T | null
  loading: boolean
  error: string | null
} {
  const { storeDomain, storefrontApiVersion, getPublicTokenHeaders } = useShop()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://${storeDomain}/api/${storefrontApiVersion}/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getPublicTokenHeaders({
                contentType: 'json'
            })
          },
          body: JSON.stringify({ query, variables })
        })

        const json = await res.json()

        if (json.errors) {
          setError(json.errors[0]?.message || 'GraphQL error')
        } else {
          const result = parseResult ? parseResult(json.data) : json.data
          setData(result)
        }
      } catch (err: any) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query, JSON.stringify(variables), storeDomain, storefrontApiVersion])

  return { data, loading, error }
}
