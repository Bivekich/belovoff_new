import Link from "next/link";
import { client } from "../lib/sanity";
import Breadcrumb from "../components/Breadcrumb";

async function getData() {
    const query = "*[_type == 'privacy'][0]";
    const data = await client.fetch(query);
    return data;
}

export default async function Privacy() {
    const data = await getData()
    return (
        <>
            <Breadcrumb pageName="Политика конфиденциальности" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-6 text-gray-900">
                    Политика конфиденциальности
                </h1>
                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                    <div className="text-gray-600 whitespace-pre-wrap">
                        {data.content}
                    </div>
                </div>
            </div>
        </>
    );
}