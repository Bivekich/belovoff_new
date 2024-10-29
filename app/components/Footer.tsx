import Link from "next/link";
import Image from "next/image";
import { client } from "../lib/sanity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faVk, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default async function Footer() {
  return (
    <footer className="mt-16 bg-[#000000] text-white py-12 rounded-t-3xl">
      <div className="container mx-auto px-4">
        {/* Main grid container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and address */}
          <div className="flex flex-col items-start">
            <img src="/images/Logo.png" alt="Logo" className="w-42 mb-[100px]" />
          </div>
          <div className="flex flex-col md:items-center">
            <nav className="flex flex-row gap-5 text-gray-400">
              <a href="#" className="hover:text-gray-300 transition duration-200">Акции</a>
              <a href="#" className="hover:text-gray-300 transition duration-200">Доставка и оплата</a>
              <a href="#" className="hover:text-gray-300 transition duration-200">Контакты</a>
            </nav>
          </div>

          {/* Contact and social icons */}
          
            <span className="text-gray-400 mb-[70px] w-full text-right">
              Режим работы: ежедневно с 11:00 до 23:00
            </span>
          
        </div>

        {/* Bottom section - aligned in three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-700 text-gray-400 pt-8">
          {/* Site development link */}
          <a href="https://biveki.ru" className="hover:text-gray-300 transition duration-500 text-center md:text-left">
            Разработка сайта
          </a>

          {/* Copyright */}
          <p className="text-center">&copy; 2024 Все права защищены</p>

          {/* Company info */}
          <p className="text-sm text-center md:text-right">
            ИП Белов Сергей Вячеславович, ИНН: 651400899696
          </p>
        </div>
      </div>
    </footer>
  );
}
