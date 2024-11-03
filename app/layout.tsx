import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CartProvider from "./components/Providers";
import ShoppingCartModal from "./components/ShoppingCartModal";
import Footer from "./components/Footer";
import Categories from "./components/Categories";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Belovoff",
  description: "Made with <3 by Lev Danilov",
};

export const revalidate = 10;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.svg" type="image/svg" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <CartProvider>
          <Navbar />
          <Categories />
          <ShoppingCartModal />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
