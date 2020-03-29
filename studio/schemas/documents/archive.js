export default {
  name: 'archive',
  title: 'Archive',
  type: 'document',
  // __experimental_actions: [
  //   // 'create',
  //   'update',
  //   // 'delete',
  //   'publish'
  // ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    }
  ]
}
