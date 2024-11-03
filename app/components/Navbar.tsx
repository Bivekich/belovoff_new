import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faBolt } from "@fortawesome/free-solid-svg-icons";
import ContactInfo from "./ContactInfo";
import CartButton from "./CartButton";

export default function Navbar() {
  return (
    <header>
      {/* Top bar */}
      <div className="bg-black rounded-b-3xl h-10 text-white py-2">
        <div className="container mx-auto flex justify-end items-center px-4">
         
          <ContactInfo />
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white py-4 text-lg">
        <div className="container mx-auto flex flex-row items-center justify-between px-4 gap-4 sm:gap-0">
          {/* Logo */}
          <Link href="/">
            <img src="/images/Logo2.png" alt="Logo" className="w-36 sm:w-48" />
          </Link>

          {/* Catalog button and nav links */}
          <div className="flex gap-4 sm:gap-8">
            <Link href="/all" className="flex gap-2 items-center hover:text-[#358ee7] transition duration-200">
              <FontAwesomeIcon icon={faList} className="text-[#1271CE] size-4 sm:size-5"/>
              <span className="text-sm sm:text-base">Каталог</span>
            </Link>

            <Link href="/new" className="flex gap-2 items-center hover:text-[#358ee7] transition duration-200">
              <FontAwesomeIcon icon={faBolt} className="text-[#1271CE] size-4 sm:size-5"/>
              <span className="text-sm sm:text-base">Новинки</span>
            </Link>
          </div>

          {/* Cart icon */}
          <div className="flex space-x-4 items-center">
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}
