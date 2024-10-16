import Link from "next/link";
import Image from "next/image";
import { client } from "../lib/sanity";

async function getData() {
  const query = "*[_type == 'footer'][0]";
  const data = await client.fetch(query);
  return data;
}

export default async function Footer() {
  const data = await getData();
  return (
    <footer className="mt-16 bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex-1 mb-8 md:mb-0">
            <p className="text-gray-400 leading-relaxed">{data.about}</p>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">Ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href="/all"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Продукты
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Политика конфедициальности
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <Image
              src="/images/mir.png"
              alt="Мир"
              layout="responsive" // Позволяет адаптивно менять размеры
              width={410} // Можно задать только ширину для расчета пропорций
              height={123}
              className="max-w-[300px] w-full"
            />
            <Image
              src="/images/sbp.png"
              alt="СБП"
              layout="responsive" // Позволяет адаптивно менять размеры
              width={821} // Можно задать только ширину для расчета пропорций
              height={639}
              className="max-w-[300px] w-full"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8">
          <a href="https://biveki.ru" className="mb-4 md:mb-0">
            Разработка сайта
          </a>
          <p>&copy; 2024 Все права защищены</p>
          <p className="text-sm text-gray-400 mt-4 md:mt-0">
            ИП Белов Сергей Вячеславович, ИНН: 651400899696
          </p>
        </div>
      </div>
    </footer>
  );
}
