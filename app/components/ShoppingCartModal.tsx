"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import EmptyCart from "./EmptyCart";

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
  } = useShoppingCart();

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw] focus-visible:ring-[#1271CE]">
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
        </SheetHeader>

        {cartCount === 0 ? (
          <EmptyCart />
        ) : (
          <div className="h-full flex flex-col justify-between">
            <div className="mt-8 flex-1 overflow-y-auto">
              <ul className="-my-6 divide-y divide-gray-200">
                {Object.values(cartDetails ?? {}).map((entry) => (
                  <li key={entry.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={entry.image as string}
                        alt="Product image"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{entry.name}</h3>
                          <p className="ml-4">{entry.price}₽</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {entry.description}
                        </p>
                      </div>

                      <div className="flex flex-1 items-end justify-between text-md">
                        <p className="text-gray-500 font-semibold">
                          Колличество: {entry.quantity}
                        </p>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeItem(entry.id)}
                            className="font-medium text-[#1271CE] hover:text-[#1271CE]/80"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Итог:</p>
                <p>{totalPrice}₽</p>
              </div>

              <div className="mt-6">
                <Link href="/checkout">
                  <Button onClick={handleCartClick} className="w-full bg-black text-white rounded-xl text-md px-5 hover:bg-[#1271CE]">
                    Заказать
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  ИЛИ{" "}
                  <button
                    onClick={() => handleCartClick()}
                    className="font-medium text-[#1271CE] hover:text-[#1271CE]/80"
                  >
                    Продолжить покупки
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
