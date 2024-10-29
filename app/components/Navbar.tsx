"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faVk, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBagShopping, faList, faBolt, faTag, faMagnifyingGlass, faPhone } from "@fortawesome/free-solid-svg-icons";



const Navbar = () => {
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();

  return (
    <header className="mb-8">
      {/* Top bar */}
      <div className="bg-black rounded-b-3xl h-10 text-white py-2">
       
      </div>

      {/* Main navbar */}
      <div className="bg-white py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          
          <Link href="/">
            <img src="/images/Logo2.png" alt="Logo" className="w-48" />
          </Link>

          {/* Catalog button, search bar, and nav links */}
          
          <div className="flex gap-8">
          <div className="flex gap-2 items-center hover:text-[#358ee7] transition duration-200">
            <FontAwesomeIcon icon={faBolt} className="text-[#1271CE] "/>
            Новинки
            </div>
            
            
          {/* Contact info and icons */}
         
          <div className="flex space-x-4 items-center">
            <FontAwesomeIcon icon={faBagShopping} className="size-7 text-[#1271CE] hover:text-[#358ee7] transition duration-200" onClick={() => handleCartClick()}/>

            </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
