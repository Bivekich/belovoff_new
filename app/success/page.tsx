"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHome } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function SuccessPage() {
  return (
    <>
      <Breadcrumb pageName="Заказ оформлен" />
      <div className="min-h-[70vh] flex flex-col justify-center items-center px-4">
        <div className="bg-white p-8 rounded-2xl w-full max-w-lg text-center">
          <img src="/images/cart.png" alt="Success" className=" mb-6 mx-auto" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Заказ успешно оформлен!
          </h1>
          
          <p className="text-gray-600 text-lg mb-8">
            Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.
          </p>
          
          <Link href="/">
            <Button className="group bg-black hover:bg-[#1271CE] text-white px-8 py-6 rounded-full transition-all duration-200 text-lg">
              <FontAwesomeIcon 
                icon={faHome} 
                className="text-[#1271CE] group-hover:text-white transition-colors duration-200 mr-2"
              />
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

