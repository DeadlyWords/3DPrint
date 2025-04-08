// components/ShopifyClientProvider.tsx
'use client'

import { ShopifyProvider } from '@shopify/hydrogen-react'

export default function ShopifyClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ShopifyProvider
      storeDomain="hnadba-i0.myshopify.com"
      storefrontToken="1130940d7ee549ef027511569592b9cb"
      storefrontApiVersion="2023-10"
      countryIsoCode="DE"
      languageIsoCode="DE"
    >
      {children}
    </ShopifyProvider>
  )
}
