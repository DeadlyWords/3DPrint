import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LegalModal from "@/components/LegalModal";
import { ShopifyProvider } from '@shopify/hydrogen-react'
import ShopifyClientProvider from "@/components/ShopifyClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DruckBar",
  description: "3D-Druck in Hof, nachhaltig & lokal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
      <ShopifyClientProvider>
          {children}
          </ShopifyClientProvider>
          <LegalModal />
      </body>
    </html>
  );
}
