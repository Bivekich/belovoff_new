import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import fish2 from "@/public/images/fish2.png";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <Image src={fish2} alt="404" className="" />
      <h1 className="text-9xl font-bold text-[#1271CE]">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Страница не найдена
      </h2>
      <p className="text-gray-600 text-lg mb-8 text-center">
        Извините, страница, которую вы ищете, не существует или была перемещена.
      </p>
      <Link
        href="/"
        className="group flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-[#1271CE] transition-all duration-200"
      >
        <FontAwesomeIcon 
          icon={faHome} 
          className="text-[#1271CE] group-hover:text-white transition-colors duration-200"
        />
        На главную
      </Link>
    </div>
  );
} 