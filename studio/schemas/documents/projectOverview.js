export default {
  name: 'projectOverview',
  title: 'Project overview',
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
      name: 'frontDescription',
      title: 'Front description',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'mainDescription',
      title: 'Main description',
      type: 'array',
      of: [{type: 'block'}]
    }
  ]
}
