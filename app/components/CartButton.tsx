"use client";

import { useShoppingCart } from "use-shopping-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

export default function CartButton() {
  const { handleCartClick } = useShoppingCart();

  return (
    <FontAwesomeIcon 
      icon={faBagShopping} 
      className="size-7 text-[#1271CE] hover:text-black transition duration-200 cursor-pointer" 
      onClick={() => handleCartClick()}
    />
  );
} 