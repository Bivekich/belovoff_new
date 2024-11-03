import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

export default function EmptyCart() {
  const { handleCartClick } = useShoppingCart();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] px-4">
      <FontAwesomeIcon 
        icon={faShoppingBag} 
        className="text-[#1271CE] size-20 mb-6"
      />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Ваша корзина пуста
      </h2>
      <p className="text-gray-500 text-center mb-8">
        Похоже, вы еще не добавили товары в корзину
      </p>
      <Link href="/all">
        <Button 
          onClick={() => handleCartClick()} 
          className="bg-black hover:bg-[#1271CE] text-white px-8 py-3 rounded-full transition-colors duration-200"
        >
          Начать покупки
        </Button>
      </Link>
    </div>
  );
} 