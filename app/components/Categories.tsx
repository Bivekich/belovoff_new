import Link from 'next/link';
import Image from 'next/image';
import { client } from "../lib/sanity";
import { urlFor } from "../lib/sanity";

interface Category {
  slug: {
    current: string;
  };
  name: string;
  image: any;
}

async function getCategories() {
  const query = `*[_type == 'category'] {
    name,
    "slug": slug.current,
    image
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Categories() {
  const categories = await getCategories();
  const displayedCategories = categories.slice(0, 8);
  const hasMoreCategories = categories.length > 8;

  return (
    <div className="max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 mx-auto mb-5">
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {displayedCategories.map((category, index) => (
          <Link
            key={category.slug + index}
            href={category.slug}
            className="min-w-[120px] h-[100px] flex flex-col items-center justify-center rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-500 text-center transition duration-100 active:bg-gray-400"
          >
            {category.image && (
              <div className="w-14 h-14 relative">
                <Image
                  src={urlFor(category.image).url()}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm font-medium">
              {category.name}
            </span>
          </Link>
        ))}
        
        {hasMoreCategories && (
          <Link
            href="/all"
            className="min-w-[120px] h-[100px] flex items-center justify-center rounded-xl bg-[#1271CE] hover:bg-[#1271CE]/90 text-white text-center transition duration-100 active:bg-[#1271CE]/80"
          >
            Все категории
          </Link>
        )}
      </div>
    </div>
  );
}

export const revalidate = 0;
export const dynamic = "force-dynamic";
