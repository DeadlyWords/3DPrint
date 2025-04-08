'use client'

import { ShopifyProvider } from '@shopify/hydrogen-react'

export default function ShopifyClientProvider({
  children,
  storeDomain,
  storefrontToken
}: {
  children: React.ReactNode
  storeDomain: string
  storefrontToken: string
}) {
  return (
    <ShopifyProvider
      storeDomain={storeDomain}
      storefrontToken={storefrontToken}
      storefrontApiVersion="2025-01"
      countryIsoCode="DE"
      languageIsoCode="DE"
    >
      {children}
    </ShopifyProvider>
  )
}