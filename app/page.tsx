import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import { client } from "./lib/sanity";

async function getCategories() {
  const query = `*[_type == "category"] | order(_createdAt desc) {
    "slug": slug.current,
    name
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12 mb-[150px]">
      <Hero />
      {categories.map((category: { slug: string }) => (
        <CategorySection key={category.slug} categorySlug={category.slug} />
      ))}
    </div>
  );
}

// Disable caching
export const revalidate = 0;
export const dynamic = "force-dynamic";
