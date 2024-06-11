"use client";

import { useShoppingCart } from "use-shopping-cart";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";

const cities = ["Кинешма", "Ковров"];

interface formData {
    name: string;
    city: string;
}

interface BotConfig {
    botToken: string;
    groupID: string;
}

const BOT_CONFIGS: Record<string, BotConfig> = {
    Кинешма: {
        botToken: "7150801136:AAH5C2d_ArN2uhbJpRgBtZOZM93QXvLqHJw",
        groupID: "-1002083343385",
    },
    Ковров: {
        botToken: "7159562205:AAHYPaJrSaeyoFvIoPQ-PlhXZMUXpxrD84g",
        groupID: "-1001921913792",
    },
};


export default function Page() {
  const { cartDetails, clearCart } = useShoppingCart();
  const router = useRouter();


    const [formData, setFormData] = useState<formData>({
        name: "",
        city: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const selectedCityConfig = BOT_CONFIGS[formData.city];
        if (!selectedCityConfig) {
            console.error("Ошибка: Неправильный город выбран.");
            return;
        }

        const message = `Новый заказ!\nИмя: ${formData.name}
    \nГород: ${formData.city}\n\nТовары:\n${cartDetails ? Object.values(cartDetails)
            .map((item) => `${item.name} - ${item.quantity} шт.`)
            .join("\n") : ''}`;


        try {
            await axios.post(
                `https://api.telegram.org/bot${selectedCityConfig.botToken}/sendMessage`,
                {
                    chat_id: selectedCityConfig.groupID,
                    text: message,
                    parse_mode: "Markdown",
                }
            );

            console.log("Заказ отправлен в Telegram");
            router.push("/success");
            clearCart();
        } catch (error) {
            console.error("Ошибка отправки заказа в Telegram:", error);
        }
  };

return (
        <div className="flex items-center justify-center bg-white">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl mb-4">Форма заказа</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600 "
                        >
                            Имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Город
                        </label>
                        <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled hidden>
                                Выберите город
                            </option>
                            {cities.map((city) => (
                                <option key={city} value={city} className="text-gray-800">
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <Button type="submit">Заказать</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
