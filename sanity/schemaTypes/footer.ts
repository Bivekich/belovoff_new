export default {
    name: 'footer',
    type: 'document',
    title: 'Подвал сайта',
    fields: [
        {
            name: 'about',
            type: 'string',
            title: 'Текст'
        },
        {
            name: 'adress',
            type: 'string',
            title: 'Адрес'
        },
        {
            name: 'phoneNumber',
            type: 'string',
            title: 'Номер телефона'
        },
        {
            name: 'email',
            type: 'email',
            title: 'Электронная почта'
        },
    ],
}