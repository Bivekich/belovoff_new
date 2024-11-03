import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";

interface BreadcrumbProps {
  pageName: string;
  category?: string;
}

export default function Breadcrumb({ pageName, category }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 py-3 px-4 sm:px-6 text-sm overflow-x-auto whitespace-nowrap">
      <Link 
        href="/" 
        className="flex items-center gap-1 text-[#1271CE] hover:text-black transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faHome} className="size-4" />
        <span className="hidden sm:inline">Главная</span>
      </Link>

      <FontAwesomeIcon 
        icon={faChevronRight} 
        className="size-3 text-gray-400" 
      />

      {category && (
        <>
          <Link 
            href="/all" 
            className="text-[#1271CE] hover:text-black transition-colors duration-200"
          >
            Каталог
          </Link>
          <FontAwesomeIcon 
            icon={faChevronRight} 
            className="size-3 text-gray-400" 
          />
        </>
      )}
      
      <span className="text-gray-600 truncate">{pageName}</span>
    </nav>
  );
} 