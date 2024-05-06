// pages/success.js

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl mb-4 text-center text-primary">Заказ успешно оформлен!</h1>
        <p className="text-gray-700 text-lg mb-4 text-center">Спасибо за ваш заказ. Мы обработаем его в ближайшее время.</p>
        <Link href="/">
            <Button>На главную</Button>
        </Link>
      </div>
    </div>
  );
};

