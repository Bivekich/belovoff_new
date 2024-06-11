import Link from "next/link";
import { client } from "../lib/sanity";

async function getData() {
    const query = "*[_type == 'privacy'][0]";
    const data = await client.fetch(query);
    return data;
}

export default async function Privacy() {
    const data = await getData()
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mt-8 mb-4">Политика конфиденциальности</h1>
            <div className="prose">
                <p>{data.content}</p>
            </div>
        </div>
    );
}