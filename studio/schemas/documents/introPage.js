export default {
  name: 'introPage',
  title: 'Intro page',
  type: 'document',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish'
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'subtitle',
      title: 'Subitle',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Describe your portfolio for search engines and social media.',
      type: 'array',
      of: [{type: 'block'}]
    }
  ]
}
