import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DruckBar - 3D-Druck & mehr in Hof",
  description:
    "Dein lokaler Partner für 3D-Druck, Lasergravur und Reparaturen in Hof, Bayern.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={`${inter.className} antialiased bg-white text-gray-800 scroll-smooth snap-y snap-mandatory`}
      >
        <main className="overflow-x-hidden">
          <div className="min-h-screen w-full flex flex-col snap-start">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
