import AddToBag from "@/app/components/AddToBag";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_id
      }`;

  const data = await client.fetch(query);
  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  // If no data is found, throw notFound()
  if (!data) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl min-h-[75vh] mt-10 px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faTag} className="text-[#1271CE] size-5" />
                <span className="text-2xl font-bold text-gray-800">
                  {data.price}₽
                </span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-base text-gray-500 tracking-wide">
                {data.description}
              </p>
            </div>

            <div className="flex gap-2.5">
              <AddToBag
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                id={data._id}
                price_id={data.price_id}
                className="w-[50%] bg-black text-white py-4 rounded-full flex justify-center items-center gap-2 hover:bg-[#1271CE] transition-all duration-100 group/btn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}