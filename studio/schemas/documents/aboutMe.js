export default {
  name: 'aboutMe',
  title: 'About me',
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
      title: 'Foto',
      name: 'foto',
      type: 'figure'
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Some text about me.',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'work',
      title: 'Work',
      description: 'Where did i work.',
      type: 'array',
      of: [{type: 'work'}]
    },
    {
      title: 'My files',
      name: 'myFiles',
      type: 'array',
      of: [{type: 'fileUpload'}]
    },
    {
      title: 'Skills',
      name: 'skills',
      type: 'array',
      of: [{type: 'skill'}]
    },
    {
      title: 'Other skills',
      name: 'otherSkills',
      type: 'array',
      of: [{type: 'string'}]
    }
  ]
}
