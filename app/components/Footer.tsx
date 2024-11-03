import Link from "next/link";
import Image from "next/image";
import { getContact } from "../lib/getContact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faVk, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default async function Footer() {
  const contactInfo = await getContact();

  return (
    <footer className="bg-[#000000] text-white py-8 md:py-12 rounded-t-3xl mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Logo and social media */}
          <div className="flex flex-col items-center md:items-start">
            <img src="/images/Logo.png" alt="Logo" className="w-42 md:w-48 mb-6 md:mb-[100px]" />
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center">
            <nav className="flex flex-col gap-3 text-gray-400 text-center">
              <Link href="/all" className="hover:text-gray-300 transition duration-200">
                Каталог
              </Link>
              <Link href="/new" className="hover:text-gray-300 transition duration-200">
                Новинки
              </Link>
              <Link href="/privacy" className="hover:text-gray-300 transition duration-200">
                Политика конфиденциальности
              </Link>
            </nav>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center md:items-end space-y-2 w-full">
            <span className="text-lg md:text-2xl font-bold">
              <FontAwesomeIcon icon={faPhone} className="text-[#1271CE]"/> 
              {contactInfo.phoneNumber}
            </span>
            <span className="text-xs md:text-sm text-gray-500 text-center md:text-right">
              Режим работы: {contactInfo.workingHours}
            </span>
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 border-t border-gray-700 text-gray-400 pt-6 md:pt-8">
          <a href="https://biveki.ru" className="hover:text-gray-300 transition duration-500 text-center md:text-left text-sm md:text-base">
            Разработка сайта
          </a>
          <p className="text-center text-sm md:text-base">&copy; 2024 Все права защищены</p>
          <p className="text-xs md:text-sm text-center md:text-right">
            ИП Белов Сергей Вячеславович, ИНН: 651400899696
          </p>
        </div>
      </div>
    </footer>
  );
}

export const revalidate = 0;
