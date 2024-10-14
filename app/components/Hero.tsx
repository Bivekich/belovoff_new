import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'hero'][0]";
  const data = await client.fetch(query);
  return data;
}
async function getCategories() {
  const query = "*[_type == 'category']";
  const data = await client.fetch(query);
  return data;
}

export default async function Hero() {
  const data = await getData();
  const categories_ = await getCategories();
  console.log(categories_);

  const categories = categories_.map((item) => ({
    href: item.slug.current,
    label: item.name,
  }));
  console.log(categories);

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            {data.bigText}
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            {data.smallText}
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src={urlFor(data.image1).url()}
              alt="Hero Photo"
              className="h-full w-full object-cover object-center"
              priority
              width={500}
              height={500}
            />
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              src={urlFor(data.image2).url()}
              alt="Hero Photo"
              className="h-full w-full object-cover object-center"
              priority
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-gray-900 pb-12">
        Категории
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex mb-5 w-full flex-col gap-8">
          {Array.from(
            { length: Math.ceil(categories.length / 3) },
            (_, index) => (
              <div
                key={index}
                className="flex h-24 divide-x overflow-hidden rounded-lg border"
              >
                {categories.slice(index * 3, index * 3 + 3).map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="flex flex-1 items-center text-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
