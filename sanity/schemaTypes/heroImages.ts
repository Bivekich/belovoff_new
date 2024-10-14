export default {
    name: 'hero',
    type: 'document',
    title: 'Баннер',
    fields: [
        {
            name: 'bigText',
            type: 'string',
            title: 'Заголовок'
        },
        {
            name: 'smallText',
            type: 'string',
            title: 'Описание'
        },
        {
            name: 'image1',
            type: 'image',
            title: 'Первое изображение',
        },
        {
            name: 'image2',
            type: 'image',
            title: 'Второе изображение',
        },
    ],
}