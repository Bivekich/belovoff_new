"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
  id: string;
  className?: string;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
  id,
  className
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

  return (
    <Button
      onClick={() => {
        addItem(product);
        handleCartClick();
      }}
      className="w-full md:w-[150px] mt-2 bg-black text-white py-2 px-4 sm:px-10 rounded-full text-sm sm:text-base flex justify-center items-center gap-2 hover:bg-[#1271CE] transition-all duration-100 group/btn"
    >
      <FontAwesomeIcon 
        icon={faShoppingBag} 
        className="text-[#1271CE] size-4 group-hover/btn:text-white transition-colors duration-100"
      /> 
      В корзину
    </Button>
  );
}