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
      title: 'Featured projects title',
      type: 'string'
    },
    {
      name: 'otherProjectsTitle',
      title: 'Other projects title',
      type: 'string'
    },
    {
      name: 'otherProjectsAspectRatio',
      title: 'Oher projects aspect ratio',
      type: 'number'
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
