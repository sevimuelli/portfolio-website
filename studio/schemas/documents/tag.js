import {FaHashtag} from 'react-icons/fa/'

export default {
  name: 'tag',
  type: 'document',
  title: 'Tag',
  icon: FaHashtag,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontend will require a slug to be set to be able to show the person',
      options: {
        source: 'title',
        maxLength: 20
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}]
    }
  ]
}
