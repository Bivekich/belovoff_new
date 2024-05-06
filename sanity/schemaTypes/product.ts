export default {
    name: 'product',
    type: 'document',
    title: 'Товары',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Название товара',
        },
        {
            name: 'images',
            type: 'array',
            title: 'Изображения товаров',
            of: [{type: 'image'}]
        },
        {
            name: 'description',
            type: 'text',
            title: 'Описание товара',
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Ссылка на товар',
            options: {
                source: 'name',
            }
        },
        {
            name: 'price',
            title: 'Цена',
            type: 'number'
        },
        {
            name: 'category',
            title: 'Категория товара',
            type: 'reference',
            to: [
                {
                    type: 'category',
                },
            ],
        },
        {
            name: 'price_id',
            title: 'Айди',
            type: 'slug',
            options: {
                source: 'name',
            }
        },
    ],
}