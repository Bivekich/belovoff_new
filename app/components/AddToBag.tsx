"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
  id: string
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
  id
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
    id: id
  };

  console.log(product)
  return (
    <Button
      onClick={() => {
        addItem(product); handleCartClick();
      }}
    >
      Добавить в корзину
    </Button>
  );
}