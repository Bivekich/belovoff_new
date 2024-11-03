"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe=""
      successUrl={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/error`}
      currency="RUB"
      billingAddressCollection={false}
      shouldPersist={true}
      language="ru-RU"
    >
      {children}
    </USCProvider>
  );
}
