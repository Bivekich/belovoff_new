"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe="1"
      cancelUrl="http://localhost:3000/error"
      currency="RUB"
      billingAddressCollection={true}
      shouldPersist={true}
      language="ru-RU"
    >
      {children}
    </USCProvider>
  );
}
