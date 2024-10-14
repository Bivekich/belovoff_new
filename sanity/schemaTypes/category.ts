export default {
  name: 'category',
  type: 'document',
  title: 'Категории',
  fields: [
    {
      name: 'name',
      title: 'Название категории',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Айди',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
  ],
}
