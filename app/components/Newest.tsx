import Link from "next/link";
import Image from "next/image";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

async function getData() {
  const query = `*[_type == 'product'][0...4] | order(_createdAt desc) {
        _id,
        name,
        price,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url,
     
    }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Newest() {
  const data: simplifiedProduct[] = await getData();

  return (
    <div className="bg-white px-6">
      <div className="mx-auto max-w-2xl py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900">
          Наши новые товары
          </h2>
          <Link className="text-[#1271CE] font-semibold hover:text-[#1271CE]/80 transition-colors duration-200 flex items-center gap-x-1 " href="/all">
            Просмотреть все{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((product) => (
            <div key={product._id} className="group relative p-4 rounded-2xl">
              <Link href={`/product/${product.slug}`}>
                {/* "New" Badge */}
                <div className="absolute top-6 left-6 bg-blue-500 text-white text-xs px-2 py-3 rounded-full z-[2]">
                  new
                </div>

                {/* Product Image */}
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 hover:opacity-75 transition-all duration-300">
                  <Image
                    src={product.imageUrl}
                    alt="Product image"
                    className="w-full h-full object-cover object-center"
                    width={300}
                    height={300}
                  />
                </div>

                {/* Product Info */}
                <div className="mt-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#1271CE] transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-lg font-normal text-gray-500">{product.categoryName}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{product.price} ₽</p>
                </div>

                {/* Add to Cart Button */}
                <button className="mt-4 bg-black text-white py-2 px-10 rounded-full flex justify-center items-center gap-2 hover:bg-[#1271CE] transition-all duration-100 group/btn">
                  <FontAwesomeIcon icon={faShoppingBag} className="text-[#1271CE] group-hover/btn:text-white transition-colors duration-100"/> В корзину
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
