import Image from "next/image";
import { client, urlFor } from "../lib/sanity";


async function getData() {
  const query = "*[_type == 'hero'][0]";
  const data = await client.fetch(query);
  return data;
}

export default async function Hero() {
  const data = await getData();

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-40">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            {data.bigText}
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            {data.smallText}
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3 relative">
          <div className="relative left-12 top-12 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0 z-[1]">
            <Image
              src={urlFor(data.image1).url()}
              alt="Hero Photo"
              className="h-full w-full object-cover object-center "
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
          <div className="absolute left-[20%] top-[105%] w-[70%] h-16 bg-black opacity-20 rounded-[50%] blur-[15px] transform-gpu z-[0]" />
        </div>
      </div>

    </section>
  );
}
