import Link from "next/link";
import Image from "next/image";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import AddToBag from "./AddToBag";

async function getData(categorySlug: string) {
  const query = `*[_type == "product" && category->slug.current == "${categorySlug}"][0...4] {
    _id,
    name,
    price,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url,
    description,
    images
  }`;
  
  const data = await client.fetch(query);
  return data;
}

interface CategorySectionProps {
  categorySlug: string;
}

export default async function CategorySection({ categorySlug }: CategorySectionProps) {
  const data: simplifiedProduct[] = await getData(categorySlug);

  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white px-4 sm:px-6">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="flex flex-col gap-y-4">
          <h2 className="text-3xl sm:text-6xl font-bold tracking-tight text-gray-900 font-fish">
            {data[0]?.categoryName}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {data.map((product) => (
            <div key={product._id} className="group relative p-2 sm:p-4 mb-10">
              <Link href={`/product/${product.slug}`}>
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-200">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-center hover:opacity-75 transition-all duration-300"
                  />
                </div>

                <div className="mt-2">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-[#1271CE] transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {product.categoryName}
                  </p>
                  <p className="text-sm sm:text-lg font-bold text-gray-900 mt-1">
                    {product.price} ₽
                  </p>
                </div>
              </Link>

              <AddToBag
                currency="RUB"
                description={product.description || ""}
                image={product.imageUrl}
                name={product.name}
                price={product.price}
                price_id={product._id}
                id={product._id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
export const dynamic = "force-dynamic";