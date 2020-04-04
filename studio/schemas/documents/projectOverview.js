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
      name: 'featuredTitle',
      title: 'Featured Porjects Title',
      type: 'string'
    },
    {
      name: 'otherProjectsTitle',
      title: 'Other Porjects Title',
      type: 'string'
    },
    {
      name: 'frontDescription',
      title: 'Front description',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'frontImage',
      title: 'Front image',
      type: 'figure'
    },
    {
      name: 'archiveDescription',
      title: 'Archive description',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'archiveImage',
      title: 'Archive image',
      type: 'figure'
    }
  ]
}
