"use client";

import { useShoppingCart } from "use-shopping-cart";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";

interface FormData {
  name: string;
  phone: string;
  comment: string;
  delivery: boolean;
  address: {
    street: string;
    house: string;
    apartment: string;
  };
}

interface BotConfig {
  groupID: string;
}

const BOT_CONFIG = { groupID: "-4575647100" };

const BOT_TOKEN = "8122670564:AAE48KJ37C0QlBEiexaCdWX0mIXMOMu-I6E";

export default function Page() {
  const { cartDetails, clearCart, removeItem } = useShoppingCart();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({ 
    name: "", 
    phone: "", 
    comment: "",
    delivery: false,
    address: {
      street: "",
      house: "",
      apartment: ""
    }
  });

 const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;
  
  if (name === "delivery") {
    const isDelivery = (e.target as HTMLInputElement).checked;
    setFormData({ 
      ...formData, 
      delivery: isDelivery,
      // Reset address fields when delivery is unchecked
      address: isDelivery ? formData.address : {
        street: "",
        house: "",
        apartment: ""
      }
    });
    return;
  }

  if (name.startsWith("address.")) {
    const addressField = name.split(".")[1] as keyof typeof formData.address;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [addressField]: value
      }
    }));
    return;
  }

  setFormData(prev => ({ ...prev, [name]: value }));
};

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    const message = `🛍 *Новый заказ!*

👤 *Информация о покупателе:*
• Имя: ${formData.name}
• Телефон: ${formData.phone}
${formData.comment ? `• Комментарий: ${formData.comment}\n` : ''}
${formData.delivery ? `
📍 *Адрес доставки:*
• Улица: ${formData.address?.street}
• Дом: ${formData.address?.house}
• Квартира: ${formData.address?.apartment}
` : '• Самовывоз'}

📦 *Товары:*
${cartDetails
  ? Object.values(cartDetails)
      .map((item) => `• ${item.name} - ${item.quantity} шт. (${item.price}₽)`)
      .join("\n")
  : ""}

💰 *Итоговая сумма:* ${cartDetails
  ? Object.values(cartDetails).reduce((total, item) => total + item.price * item.quantity, 0)
  : 0}₽`;

    try {
      console.log("Sending to Telegram...");
      const response = await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          chat_id: BOT_CONFIG.groupID,
          text: message,
          parse_mode: "Markdown",
        }
      );

      if (response.data.ok) {
        console.log("Telegram message sent successfully");
        await clearCart();
        console.log("Cart cleared");
        window.location.href = "/success";
      } else {
        console.error("Telegram API Error:", response.data.description);
      }
    } catch (error) {
      console.error("Error details:", error);
      alert("Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.");
    }
  };

  // Helper function to check if cart is empty
  const isCartEmpty = !cartDetails || Object.keys(cartDetails).length === 0;

  return (
    <>
      <Breadcrumb pageName="Оформление заказа" />
      <div className="flex flex-col items-center bg-white min-h-[75vh] p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full max-w-6xl">
          {/* Left Side - Form */}
          <div className="flex-1 p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-bold mb-6">Получатель заказа:</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border placeholder:text-[#1271CE] rounded-md text-[#1271CE]"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Номер телефона"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border placeholder:text-[#1271CE] rounded-md text-[#1271CE]"
                required
              />

              {/* Delivery Option */}
              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="delivery"
                  name="delivery"
                  checked={formData.delivery}
                  onChange={handleChange}
                  className="h-5 w-5 rounded-md border-[#1271CE] text-[#1271CE] focus:ring-none transition-colors cursor-pointer"
                />
                <label htmlFor="delivery" className="text-gray-500 cursor-pointer select-none">
                  Доставка
                </label>
              </div>

              {/* Conditional Address Fields */}
              {formData.delivery && (
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-semibold text-gray-700">Адрес доставки:</h3>
                  <input
                    type="text"
                    name="address.street"
                    placeholder="Улица"
                    value={formData.address?.street}
                    onChange={handleChange}
                    className="w-full p-3 border placeholder:text-[#1271CE] rounded-md text-[#1271CE]"
                    required={formData.delivery}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="address.house"
                      placeholder="Дом"
                      value={formData.address?.house}
                      onChange={handleChange}
                      className="w-full p-3 border placeholder:text-[#1271CE] rounded-md text-[#1271CE]"
                      required={formData.delivery}
                    />
                    <input
                      type="text"
                      name="address.apartment"
                      placeholder="Квартира"
                      value={formData.address?.apartment}
                      onChange={handleChange}
                      className="w-full p-3 border placeholder:text-[#1271CE] rounded-md text-[#1271CE]"
                      required={formData.delivery}
                    />
                  </div>
                </div>
              )}

              <textarea
                name="comment"
                placeholder="Комментарий к заказу"
                value={formData.comment}
                onChange={handleChange}
                className="w-full p-3 border placeholder:text-[#1271CE] rounded-md text-[#1271CE] min-h-[100px]"
              />

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="confirm-checkbox" 
                  className="h-5 w-5 rounded-md border-[#1271CE] text-[#1271CE] focus:ring-none transition-colors cursor-pointer"
                  required
                  disabled={isCartEmpty}
                />
                <label 
                  htmlFor="confirm-checkbox" 
                  className={`cursor-pointer select-none ${isCartEmpty ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  Подтверждаю свой заказ
                </label>
              </div>

              <div className="flex justify-start">
                <button 
                  type="submit"
                  disabled={isCartEmpty}
                  className={`mt-6 px-[50px] py-3 rounded-2xl text-xl transition duration-100 
                    ${isCartEmpty 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-black text-white hover:bg-[#1271CE]'
                    }`}
                >
                  {isCartEmpty ? 'Корзина пуста' : 'Оформить заказ'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Cart Items */}
          <div className="flex-1 p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Ваш заказ:</h2>
            {isCartEmpty ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
                <Link href="/all">
                  <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-[#1271CE] transition-colors duration-200">
                    Перейти к покупкам
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {cartDetails && Object.values(cartDetails).map((item) => (
                    <li key={item.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={item.image as string}
                            alt="Product image"
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="block font-semibold">{item.name}</span>
                          <span className="text-gray-600 text-sm">Количество: {item.quantity} шт</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold">{item.price}₽</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#1271CE] hover:text-black transition-colors duration-200"
                          aria-label="Удалить товар"
                        >
                          <FontAwesomeIcon icon={faTrash} className="size-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between pt-6 border-t mt-4">
                  <span className="text-lg font-bold">Итоговая сумма:</span>
                  <span className="text-lg font-bold">
                    {cartDetails
                      ? Object.values(cartDetails).reduce((total, item) => total + item.price * item.quantity, 0)
                      : 0} ₽
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
