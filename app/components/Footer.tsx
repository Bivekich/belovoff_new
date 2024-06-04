import Link from "next/link";
import { client } from "../lib/sanity";

async function getData() {
  const query = "*[_type == 'footer'][0]";
  const data = await client.fetch(query);
  return data;
}

export default async function Footer() {
  const data = await getData()
  return (
    <footer className="mt-16 bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-8">
            <p>
              {data.about}
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Ссылки</h3>
            <ul>
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
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <p>Адрес: {data.adress}</p>
            <p>Телефон: {data.phoneNumber}</p>
            <p>Email: {data.email}</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>
            Made with by ❤️{" "}
            <a
              href="https://t.me/joyfunless"
              className="text-pink-500 hover:text-pink-400 transition duration-300"
            >
              Lev Danilov
            </a>
          </p>
          <p>&copy; 2024 Все права защищены</p>
        </div>
      </div>
    </footer>
  );
}
