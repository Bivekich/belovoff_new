import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CartProvider from "./components/Providers";
import ShoppingCartModal from "./components/ShoppingCartModal";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodStore | Вкусная еда по низким ценам",
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
      <body className={inter.className}>
      <CartProvider>
        <Navbar/>
        <ShoppingCartModal/>
        {children}
        <Footer/>
      </CartProvider>
      </body>
      </html>
  );
}
