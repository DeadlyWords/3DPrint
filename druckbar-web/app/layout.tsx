import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ShopProvider } from "@/context/ShopContext";
import LegalModal from "@/components/LegalModal";

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
        <ShopProvider>
          {children}
          <LegalModal />
        </ShopProvider>
      </body>
    </html>
  );
}
