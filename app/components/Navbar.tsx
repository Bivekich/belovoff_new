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
      <div className="bg-black rounded-b-3xl text-white py-2">
        <div className="container mx-auto flex justify-between px-4">
          <div className="flex space-x-4">
            <a href="#" className="text-sm">Доставка и оплата</a>
            <a href="#" className="text-sm">Контакты</a>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="text-sm">Мы онлайн:</span>
            <FontAwesomeIcon icon={faTelegram} className="text-[#1271CE] w-4" />
            <FontAwesomeIcon icon={faVk} className="text-[#1271CE] w-4" />
            <FontAwesomeIcon icon={faInstagram} className="text-[#1271CE] w-4" />

          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link href="/">
            <img src="/images/Logo2.png" alt="Logo" className="w-48" />
          </Link>

          {/* Catalog button, search bar, and nav links */}
          <div className="flex items-center space-x-4">
            <div className="flex">
            <Button variant="outline" className=" py-2 flex gap-2 items-center text-lg z-[2]">
            <FontAwesomeIcon icon={faList} className="text-[#1271CE]"/>
              Каталог 
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm translate-x-[280px] absolute"/>
            </Button>
            <input
              type="text"
              placeholder="Что хотите найти?"
              className="border rounded-md px-4 pl-6 py-1 bg-[#DDDDDD] focus:outline-none placeholder:font-light w-64 ml-[-20px] z-[1]"
            />
            </div>
         
          </div>
          <div className="flex gap-8">
          <div className="flex gap-2 items-center hover:text-[#358ee7] transition duration-200">
            <FontAwesomeIcon icon={faBolt} className="text-[#1271CE] "/>
            Новинки
            </div>
            <div className="flex gap-2 items-center hover:text-[#358ee7] transition duration-200">
            <FontAwesomeIcon icon={faTag} className="text-[#1271CE]"/>
            Скидки
            </div>
            </div>
          {/* Contact info and icons */}
          <div className="flex items-center space-x-6">
            {/* Contact Info */}
            <div className="flex flex-col items-center space-x-2">
              <span className="text-md font-bold"><FontAwesomeIcon icon={faPhone} className="text-[#1271CE]"/> 7 (999) 999-99-99</span>
              <span className="text-sm text-gray-500">ежедневно с 11:00 до 22:30</span>
            </div>
            {/* Icons */}
            
          </div>
          <div className="flex space-x-4 items-center">
            <FontAwesomeIcon icon={faBagShopping} className="size-7 text-[#1271CE] hover:text-[#358ee7] transition duration-200" onClick={() => handleCartClick()}/>

            </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
