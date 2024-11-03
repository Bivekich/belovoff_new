import { notFound } from "next/navigation";
import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";
import AddToBag from "../components/AddToBag";
import Breadcrumb from "../components/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercentage, faBolt } from "@fortawesome/free-solid-svg-icons";

async function getData(category: string) {
  const query = `*[_type == "product" && category->slug.current == "${category}"] {
    _id,
    "imageUrl": images[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    description,
    price_id,
    images
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(params.category);

  if (!data || data.length === 0) {
    notFound();
  }

  return (
    <>
      <Breadcrumb pageName={data[0]?.categoryName} category={params.category}/>
      <div className="bg-white px-4 sm:px-6">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-gray-900">
              {data[0]?.categoryName}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link 
                href="/all" 
                className="px-3 py-2 text-sm sm:text-base font-medium rounded-lg bg-gray-200 text-black hover:bg-[#1271CE]/30 transition-all duration-200 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPercentage} className="text-[#1271CE] size-4"/> 
                Каталог
              </Link>
              <Link 
                href="/new" 
                className="px-3 py-2 text-sm sm:text-base font-medium rounded-lg bg-gray-200 text-black hover:bg-[#1271CE]/30 transition-all duration-200 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faBolt} className="text-[#1271CE] size-4"/> 
                Новинки
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {data.map((product) => (
              <div key={product._id} className="group relative p-2 sm:p-4">
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
                    <h3 className="text-sm lg:text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-[#1271CE] transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-lg text-gray-500 mt-1">
                      {product.categoryName}
                    </p>
                    <p className="text-sm sm:text-xl font-bold text-gray-900 mt-1">
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
    </>
  );
}

export const dynamic = "force-dynamic";
